import bcrypt from "bcrypt";
import { UserRole } from "generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";
import * as dotenv from "dotenv";

dotenv.config(); 

const seedAdmin = async () => {
  const prisma = new PrismaService();

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Admin";

    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: hashedPassword,
          role: UserRole.ADMIN,
        },
      });
      console.log("✓ Admin already exists — role and password updated.");
      return;
    }

    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    console.log("✓ Admin user seeded successfully.");
  } catch (error) {
    console.error("✗ Failed to seed admin:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


seedAdmin()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));