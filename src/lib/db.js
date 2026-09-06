import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const globalForPrisma = globalThis;

/**
 * Creates a Prisma client backed by the PostgreSQL adapter.
 *
 * @throws {Error} When DATABASE_URL is not set.
 */
function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({
    connectionString: url,
  });

  return new PrismaClient({
    adapter,
  });
}

/**
 * Singleton Prisma client.
 * Reused in development to avoid creating multiple
 * database connections during hot reload.
 */
export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
