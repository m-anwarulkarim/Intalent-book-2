import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderForm } from "@/components/order-form";

const benefits = [
  "মোবাইল ছাড়াই শেখার ভালো অভ্যাস",
  "অক্ষর, সংখ্যা, প্রাণী ও ফল শেখার সুবিধা",
  "রঙিন ছবি ও সাউন্ডের মাধ্যমে শেখা",
  "ছোট বাচ্চাদের জন্য সহজ ব্যবহার",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-30">
        <Image
          src="/background.png"
          alt="শিশুরা Intelligent Book পড়ছে"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Soft readable overlay */}
      <div className="fixed inset-0 -z-20 bg-white/55" />

      {/* Scroll fill / gradient mood layer */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/35 via-sky-50/75 to-white/95 backdrop-blur-[1px]" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="min-w-0">
            <p className="truncate text-base font-bold text-slate-950 sm:text-lg">
              Intelligent Book
            </p>
            <p className="hidden text-xs text-slate-600 sm:block">
              শিশুদের আনন্দময় শেখার সঙ্গী
            </p>
          </Link>

          <Button
            asChild
            size="sm"
            className="shrink-0 rounded-full bg-sky-600 px-5 text-white shadow-md shadow-sky-600/20 hover:bg-sky-700"
          >
            <Link href="#order">অর্ডার করুন</Link>
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="grid min-h-[calc(100vh-96px)] items-center gap-8 rounded-[2rem] border border-white/50 bg-white/45 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-md sm:p-8 md:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:rounded-[2.5rem] lg:p-12">
          <div className="flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-sm">
                শিশুর শেখার নতুন সঙ্গী
              </p>

              <h1 className="max-w-3xl text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
                আপনার শিশুর শেখাকে করুন আরও মজার ও সহজ
              </h1>

              <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
                Intelligent Book হলো শিশুদের জন্য একটি ইন্টার‌্যাকটিভ শিক্ষামূলক
                বই, যেখানে অক্ষর, সংখ্যা, প্রাণী, ফল ও সাউন্ডের মাধ্যমে শেখা আরও
                আনন্দময় হয়।
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge className="rounded-full px-3 py-1">৩+ বয়সের জন্য</Badge>
              <Badge
                variant="outline"
                className="rounded-full bg-white/70 px-3 py-1"
              >
                স্ক্রিন ছাড়া শেখা
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                ইন্টার‌্যাকটিভ সাউন্ড
              </Badge>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row p-1">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
              >
                <Link href="#order">এখনই অর্ডার করুন</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-sky-200 bg-white/80 text-sky-700 shadow-sm hover:bg-sky-50 hover:text-sky-800"
              >
                <Link href="#benefits">আরও জানুন</Link>
              </Button>
            </div>
          </div>

          <div className="relative isolate flex items-center justify-center overflow-hidden rounded-[1.75rem] bg-white/35 p-4 shadow-inner shadow-white/70 backdrop-blur-sm sm:p-8">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-100/80 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-amber-100/80 blur-3xl" />

            <Image
              src="/intelligent-book.png"
              alt="Intelligent Book"
              width={640}
              height={640}
              className="relative z-10 mx-auto max-h-[280px] w-full object-contain sm:max-h-[420px] md:max-h-[520px]"
              priority
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="mt-16 space-y-8 scroll-mt-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/50 bg-white/65 p-6 text-center shadow-lg shadow-slate-900/5 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-sm">
              কেন Intelligent Book পছন্দ করবেন?
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-slate-950 sm:text-4xl">
              শিশুকে শেখাবে সহজ, মজার এবং আত্মবিশ্বাসীভাবে
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-700">
              খেলতে খেলতে শেখার জন্য এটি হতে পারে শিশুর প্রথম স্মার্ট লার্নিং
              বুক।
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit}
                className="rounded-3xl border-white/60 bg-white/75 shadow-lg shadow-slate-900/5 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sm font-bold text-sky-700">
                    {index + 1}
                  </div>

                  <p className="text-base font-semibold leading-7 text-slate-950">
                    {benefit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Order Section */}
        <section id="order" className="mt-16 space-y-8 scroll-mt-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/50 bg-white/70 p-6 text-center shadow-lg shadow-slate-900/5 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 sm:text-sm">
              অর্ডার ফর্ম
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-slate-950 sm:text-4xl">
              সহজে অর্ডার করুন
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-700">
              আপনার তথ্য নিরাপদভাবে সংরক্ষণ করা হবে এবং অর্ডার নিশ্চিত করতে
              আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <OrderForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 rounded-t-3xl border-t border-white/60 bg-white/70 py-8 text-center text-slate-700 backdrop-blur-md">
          <p className="text-lg font-bold text-slate-950">Intelligent Book</p>
          <p className="mt-1">শিশুদের আনন্দময় শেখার সঙ্গী</p>
          <p className="mt-4 text-sm">
            © {new Date().getFullYear()} Intelligent Book
          </p>
        </footer>
      </main>
    </div>
  );
}
