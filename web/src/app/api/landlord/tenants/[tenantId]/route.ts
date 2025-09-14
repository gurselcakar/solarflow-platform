import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const updateTenantSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Valid email is required').optional(),
  apartmentId: z.string().min(1, 'Apartment ID is required').optional(),
});

// PUT /api/landlord/tenants/[tenantId] - Update a tenant
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = updateTenantSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const landlordId = (session.user as { id: string }).id;

    // Verify the tenant exists and is in one of the landlord's buildings
    const existingTenant = await prisma.user.findFirst({
      where: {
        id: tenantId,
        role: 'TENANT',
        tenantApartment: {
          building: {
            landlordId: landlordId,
          },
        },
      },
      include: {
        tenantApartment: true,
      },
    });

    if (!existingTenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const updateData: { name?: string; email?: string } = {};
    const { name, email, apartmentId } = validationResult.data;

    // Update basic info
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;

    // Handle apartment change
    if (apartmentId !== undefined) {
      // Verify the new apartment exists and belongs to the landlord
      const newApartment = await prisma.apartment.findFirst({
        where: {
          id: apartmentId,
          building: {
            landlordId: landlordId,
          },
        },
      });

      if (!newApartment) {
        return NextResponse.json({ error: 'New apartment not found' }, { status: 404 });
      }

      // Check if the new apartment is vacant (or is the same apartment)
      if (newApartment.tenantId && newApartment.tenantId !== tenantId) {
        return NextResponse.json({
          error: 'The target apartment is already occupied'
        }, { status: 400 });
      }

      // If moving to a different apartment
      if (apartmentId !== existingTenant.tenantApartment?.id) {
        // First, make the old apartment vacant
        if (existingTenant.tenantApartment) {
          await prisma.apartment.update({
            where: { id: existingTenant.tenantApartment.id },
            data: { tenantId: null },
          });
        }

        // Then assign to the new apartment
        await prisma.apartment.update({
          where: { id: apartmentId },
          data: { tenantId: tenantId },
        });
      }
    }

    // Update tenant basic info
    const updatedTenant = await prisma.user.update({
      where: { id: tenantId },
      data: updateData,
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

    return NextResponse.json(updatedTenant);
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/landlord/tenants/[tenantId] - Remove a tenant
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const landlordId = (session.user as { id: string }).id;

    // Verify the tenant exists and is in one of the landlord's buildings
    const tenant = await prisma.user.findFirst({
      where: {
        id: tenantId,
        role: 'TENANT',
        tenantApartment: {
          building: {
            landlordId: landlordId,
          },
        },
      },
      include: {
        tenantApartment: true,
      },
    });

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Remove tenant from apartment (make apartment vacant)
    if (tenant.tenantApartment) {
      await prisma.apartment.update({
        where: { id: tenant.tenantApartment.id },
        data: { tenantId: null },
      });
    }

    // Option 1: Delete the user entirely (if they have no other relationships)
    // Option 2: Keep the user but remove tenant role (safer for data integrity)
    // We'll go with Option 2 - just remove the tenant assignment but keep the user
    await prisma.user.update({
      where: { id: tenantId },
      data: {
        role: 'TENANT', // Keep as tenant but they're not assigned to any apartment
      },
    });

    return NextResponse.json({ message: 'Tenant removed successfully' });
  } catch (error) {
    console.error('Error removing tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/landlord/tenants/[tenantId] - Get individual tenant info
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const landlordId = (session.user as { id: string }).id;

    const tenant = await prisma.user.findFirst({
      where: {
        id: tenantId,
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
    });

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json(tenant);
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}