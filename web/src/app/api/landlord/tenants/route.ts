import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema for creating/updating tenant
const createTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  apartmentId: z.string().min(1, 'Apartment ID is required'),
});


// GET /api/landlord/tenants - Get all tenants for the landlord's buildings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const landlordId = (session.user as { id: string }).id;

    // Get all tenants from all buildings owned by the landlord
    const tenants = await prisma.user.findMany({
      where: {
        role: 'TENANT',
        tenantApartment: {
          building: {
            landlordId: landlordId,
          },
        },
      },
      include: {
        tenantApartment: {
          include: {
            building: {
              select: {
                id: true,
                name: true,
                address: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Also get vacant apartments for adding new tenants
    const vacantApartments = await prisma.apartment.findMany({
      where: {
        tenantId: null,
        building: {
          landlordId: landlordId,
        },
      },
      include: {
        building: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json({
      tenants,
      vacantApartments
    });
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/landlord/tenants - Add a new tenant
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = createTenantSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { name, email, apartmentId } = validationResult.data;
    const landlordId = (session.user as { id: string }).id;

    // Verify the apartment exists and belongs to the landlord
    const apartment = await prisma.apartment.findFirst({
      where: {
        id: apartmentId,
        tenantId: null, // Must be vacant
        building: {
          landlordId: landlordId,
        },
      },
    });

    if (!apartment) {
      return NextResponse.json({
        error: 'Apartment not found or already occupied'
      }, { status: 404 });
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        tenantApartment: true,
      },
    });

    let tenant;

    if (existingUser) {
      // If user exists, update their role to tenant and assign to apartment
      if (existingUser.tenantApartment) {
        return NextResponse.json({
          error: 'This user is already assigned to another apartment'
        }, { status: 400 });
      }

      tenant = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          role: 'TENANT',
        },
      });
    } else {
      // Create new tenant user
      tenant = await prisma.user.create({
        data: {
          name,
          email,
          role: 'TENANT',
        },
      });
    }

    // Assign tenant to apartment
    await prisma.apartment.update({
      where: { id: apartmentId },
      data: { tenantId: tenant.id },
    });

    // Return the tenant with apartment info
    const tenantWithApartment = await prisma.user.findUnique({
      where: { id: tenant.id },
      include: {
        tenantApartment: {
          include: {
            building: {
              select: {
                id: true,
                name: true,
                address: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(tenantWithApartment, { status: 201 });
  } catch (error) {
    console.error('Error creating tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}