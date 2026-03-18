import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";

dotenv.config(); 

const prisma = new PrismaService();

async function main() {
  console.log('\n Starting Foodio database seed...\n');

  //users

  console.log('👤 Seeding users...');

  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
  const hashedCustomerPassword = await bcrypt.hash('Customer@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@foodio.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@foodio.com',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@foodio.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'customer@foodio.com',
      password: hashedCustomerPassword,
      role: 'CUSTOMER',
      address: 'House:23, Road:23, Jamaica, USA',
    },
  });

  console.log('  ✓ Admin:', admin.email);
  console.log('  ✓ Customer:', customer.email);

  //Categories

  console.log('\n Seeding categories...');

  const starters = await prisma.category.upsert({
    where: { name: 'Starters' },
    update: {},
    create: { name: 'Starters' },
  });

  const mainCourses = await prisma.category.upsert({
    where: { name: 'Main Courses' },
    update: {},
    create: { name: 'Main Courses' },
  });

  const desserts = await prisma.category.upsert({
    where: { name: 'Desserts' },
    update: {},
    create: { name: 'Desserts' },
  });

  console.log('  ✓ Starters');
  console.log('  ✓ Main Courses');
  console.log('  ✓ Desserts');

  //  Menu Items
  console.log('\n  Seeding menu items...');

  const menuItemsData = [
    // Starters
    {
      name: 'Golden Crunch Bites',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 15.99,
      available: true,
      categoryId: starters.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773534561/Foodio/images/mnuhqsdu82g-1773534559134-image-7.png',
    },
    {
      name: 'Mediterranean Olive Medley',
      description: 'Fresh olives marinated with herbs and citrus zest.',
      price: 12.99,
      available: true,
      categoryId: starters.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773764899/Foodio/images/pp6778m7ms4-1773764896382-image-10.png',
    },
    {
      name: 'Citrus Swirl Delights',
      description: 'Light citrus bites with a tangy cream dipping sauce.',
      price: 10.99,
      available: true,
      categoryId: starters.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773764943/Foodio/images/5mi6iquv2kc-1773764940651-image-10-1.png',
    },
    {
      name: 'Crispy Fire Bites',
      description: 'Spicy fried bites with a smoky chipotle sauce.',
      price: 11.99,
      available: true,
      categoryId: starters.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773765163/Foodio/images/78pv153mnks-1773765160500-image-14.png',
    },
    // Main Courses
    {
      name: 'Grilled Salmon Fillet',
      description:
        'Fresh Atlantic salmon with lemon butter and seasonal greens.',
      price: 28.99,
      available: true,
      categoryId: mainCourses.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773764899/Foodio/images/pp6778m7ms4-1773764896382-image-10.png',
    },
    {
      name: 'Creamy Garlic Shrimp Pasta',
      description:
        'Al dente pasta with juicy shrimp in a rich garlic cream sauce.',
      price: 22.99,
      available: true,
      categoryId: mainCourses.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773764990/Foodio/images/k81jl0umkdk-1773764987416-image-11.png',
    },
    {
      name: 'Herb-Roasted Chicken Bowl',
      description:
        'Tender roasted chicken with seasonal vegetables and quinoa.',
      price: 19.99,
      available: true,
      categoryId: mainCourses.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773765130/Foodio/images/q85qpeqpe58-1773765128031-image-8.png',
    },
    {
      name: 'Pan-Seared Scallops',
      description: 'Seared scallops with cauliflower purée and truffle oil.',
      price: 32.99,
      available: true,
      categoryId: mainCourses.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773812405/Foodio/images/bmp0h0t1a3o-1773812405175-image-10-1.png',
    },
    // Desserts
    {
      name: 'Signature Crunch Squares',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 9.99,
      available: true,
      categoryId: desserts.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773812370/Foodio/images/sgep2kpqa38-1773812369945-image-5.png',
    },
    {
      name: 'Pan-Seared Scallops',
      description: 'Jumbo scallops with cauliflower purée and truffle oil.',
      price: 11.99,
      available: true,
      categoryId: desserts.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773812460/Foodio/images/duu3nt2oplg-1773812460682-image-11.png',
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone and espresso.',
      price: 10.99,
      available: true,
      categoryId: desserts.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773812321/Foodio/images/v1vjv9msjag-1773812321414-image-13.png',
    },
    {
      name: 'Mango Panna Cotta',
      description: 'Silky Italian dessert with fresh mango coulis.',
      price: 8.99,
      available: true,
      categoryId: desserts.id,
      imageUrl:
        'https://res.cloudinary.com/dlqjxjdkh/image/upload/v1773812370/Foodio/images/sgep2kpqa38-1773812369945-image-5.png',
    },
  ];

  const menuItems = await Promise.all(
    menuItemsData.map((item) =>
      prisma.menuItem.upsert({
        where: {
          name_categoryId: {
            name: item.name,
            categoryId: item.categoryId,
          },
        },
        update: {},
        create: item,
      }),
    ),
  );

  menuItems.forEach((item) => console.log('  ✓', item.name));

  //Sample Orders
  console.log('\n Seeding sample orders...');

  const order1 = await prisma.order.create({
    data: {
      userId: customer.id,
      status: 'COMPLETED',
      total: 44.98,
      paymentMethod: 'CASH',
      address: 'House:23, Road:23, Jamaica, USA',
      items: {
        create: [
          {
            menuItemId: menuItems[0].id,
            quantity: 2,
            price: menuItems[0].price,
          },
          {
            menuItemId: menuItems[4].id,
            quantity: 1,
            price: menuItems[4].price,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: customer.id,
      status: 'PENDING',
      total: menuItems[7].price,
      paymentMethod: 'CASH',
      address: 'House:23, Road:23, Jamaica, USA',
      items: {
        create: [
          {
            menuItemId: menuItems[7].id,
            quantity: 1,
            price: menuItems[7].price,
          },
        ],
      },
    },
  });

  console.log('  ✓ Order 1:', order1.id, `(${order1.status})`);
  console.log('  ✓ Order 2:', order2.id, `(${order2.status})`);

  console.log('\n Database seeded successfully!');
  console.log('\n Login Credentials:');
  console.log('  Admin - Email: admin@foodio.com, Password: Admin@123');
  console.log(
    '  Customer - Email: customer@foodio.com, Password: Customer@123',
  );
}

main()
  .catch((error) => {
    console.error('\n Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
