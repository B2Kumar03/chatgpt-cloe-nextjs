"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function onBoard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("User email is missing");
  }

  const profile = {
    clerkId: clerkUser.id,
    email,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    imageUrl: clerkUser.imageUrl,
  };

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ clerkId: clerkUser.id }, { email }],
    },
  });

  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: profile,
    });
  }

  return prisma.user.create({
    data: profile,
  });
}