export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { isAdminLoggedIn } from "@/lib/admin-auth";

export async function GET() {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Admin orders GET error:", error);

    return NextResponse.json(
      { success: false, error: "অর্ডার লোড করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
