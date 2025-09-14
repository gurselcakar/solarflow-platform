import { PrismaClient, Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create landlord
  const landlord = await prisma.user.create({
    data: {
      email: 'landlord@solarflow.demo',
      name: 'Landlord',
      role: Role.LANDLORD,
    },
  });

  console.log('Created landlord:', landlord.name);

  // Create building
  const building = await prisma.building.create({
    data: {
      name: 'Musterstraße Building',
      address: 'Musterstraße 1, 12345 Musterstadt',
      landlordId: landlord.id,
    },
  });

  console.log('Created building:', building.name);

  // Create tenants
  const tenant1 = await prisma.user.create({
    data: {
      email: 'tenant1@solarflow.demo',
      name: 'Tenant 1',
      role: Role.TENANT,
    },
  });

  const tenant2 = await prisma.user.create({
    data: {
      email: 'tenant2@solarflow.demo',
      name: 'Tenant 2',
      role: Role.TENANT,
    },
  });

  console.log('Created tenants:', tenant1.name, 'and', tenant2.name);

  // Create apartments
  const apartment1 = await prisma.apartment.create({
    data: {
      apartmentNumber: 'EG rechts',
      buildingId: building.id,
      tenantId: tenant1.id,
      meterColumn: 'we1_consumption_kWh', // Links to CSV data column
    },
  });

  const apartment2 = await prisma.apartment.create({
    data: {
      apartmentNumber: 'EG links',
      buildingId: building.id,
      tenantId: tenant2.id,
      meterColumn: 'we2_consumption_kWh', // Links to CSV data column
    },
  });

  console.log('Created apartments:', apartment1.apartmentNumber, 'and', apartment2.apartmentNumber);

  console.log('Seeding completed successfully!');
  console.log('\nDemo Accounts:');
  console.log('Landlord: landlord@solarflow.demo');
  console.log('Tenant 1: tenant1@solarflow.demo (EG rechts)');
  console.log('Tenant 2: tenant2@solarflow.demo (EG links)');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });