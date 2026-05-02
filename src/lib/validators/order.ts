import * as z from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "নাম দিতে হবে"),

  phone: z
    .string()
    .min(1, "মোবাইল নম্বর দিতে হবে")
    .regex(
      /^01[3-9]\d{8}$/,
      "সঠিক বাংলাদেশি মোবাইল নম্বর দিন, যেমন: 017XXXXXXXX",
    ),

  address: z.string().min(1, "ঠিকানা দিতে হবে"),

  quantity: z.number().min(1, "কমপক্ষে ১টি অর্ডার করুন"),

  note: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
