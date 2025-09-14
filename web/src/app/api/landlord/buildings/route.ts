import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || (session.user as { role: string }).role !== 'LANDLORD') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const buildings = await prisma.building.findMany({
      where: {
        landlordId: (session.user as { id: string }).id,
      },
      include: {
        apartments: {
          include: {
            tenant: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(buildings);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}