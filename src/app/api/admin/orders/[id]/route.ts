import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { isAdminLoggedIn } from "@/lib/admin-auth";
import { orderSchema } from "@/lib/validators/order";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const parsed = orderSchema.safeParse({
      name: body.name,
      phone: body.phone,
      address: body.address,
      quantity: body.quantity,
      note: body.note,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "ফর্মে ভুল তথ্য আছে" },
        { status: 400 },
      );
    }

    const totalPrice = Number(body.totalPrice);

    if (Number.isNaN(totalPrice) || totalPrice < 0) {
      return NextResponse.json(
        { success: false, error: "সঠিক মোট মূল্য দিন" },
        { status: 400 },
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        quantity: parsed.data.quantity,
        totalPrice,
        note: parsed.data.note || null,
      },
    });

    return NextResponse.json(
      { success: true, order: updatedOrder },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "অর্ডার update করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "অর্ডার delete করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
