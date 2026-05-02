import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validators/order";

const BOOK_PRICE = 1000;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "ফর্মে ভুল তথ্য আছে" },
        { status: 400 },
      );
    }

    await prisma.order.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        quantity: parsed.data.quantity,
        totalPrice: parsed.data.quantity * BOOK_PRICE,
        note: parsed.data.note || null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "অর্ডার সংরক্ষণ করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}
