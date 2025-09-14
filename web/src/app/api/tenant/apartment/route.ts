import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'TENANT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apartment = await prisma.apartment.findFirst({
      where: {
        tenantId: (session.user as { id: string }).id,
      },
      include: {
        building: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });

    if (!apartment) {
      return NextResponse.json({ error: 'No apartment found' }, { status: 404 });
    }

    return NextResponse.json({ apartment });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}