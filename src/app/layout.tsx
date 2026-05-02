import type { Metadata } from "next";
// import "@fontsource/hind-siliguri/400.css";
// import "@fontsource/hind-siliguri/500.css";
// import "@fontsource/hind-siliguri/600.css";
// import "@fontsource/hind-siliguri/700.css";
import "./globals.css";
import { Geist, Hind_Siliguri } from "next/font/google";
import { cn } from "@/lib/utils";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"], // Use 'bengali' or 'latin' depending on your needs
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Intelligent Book | শিশুদের জন্য ইন্টার‌্যাকটিভ শিক্ষামূলক বই",
  description:
    "Intelligent Book শিশুদের অক্ষর, সংখ্যা, প্রাণী, ফল ও সাউন্ডের মাধ্যমে আনন্দের সাথে শেখার একটি আধুনিক, নিরাপদ এবং ইন্টার‌্যাকটিভ উপায়।",
  keywords: [
    "Intelligent Book",
    "শিশুদের শিক্ষামূলক বই",
    "ইন্টার‌্যাকটিভ লার্নিং টয়",
    "বাংলাদেশ শিশুদের শেখার খেলনা",
    "স্ক্রিন-ফ্রি লার্নিং",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={cn(
        "h-full scroll-smooth antialiased",
        "font-sans",
        geist.variable,
        hindSiliguri.className,
      )}
    >
      <body className="min-h-full overflow-x-hidden bg-slate-50">
        {children}
      </body>
    </html>
  );
}
