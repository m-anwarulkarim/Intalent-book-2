import Link from "next/link";
import { CheckCircle2, Home, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* Background */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-sky-50 via-white to-amber-50" />
      <div className="fixed -left-24 top-20 -z-20 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
      <div className="fixed -right-24 bottom-20 -z-20 h-72 w-72 rounded-full bg-amber-100 blur-3xl" />

      <Card className="w-full max-w-2xl rounded-[2rem] border-white/70 bg-white/85 shadow-2xl shadow-sky-950/10 backdrop-blur-xl">
        <CardContent className="px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
            <CheckCircle2 className="h-11 w-11 text-emerald-600" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
            অর্ডার সফল হয়েছে
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl">
            ধন্যবাদ!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার
            সাথে যোগাযোগ করে অর্ডার এবং ডেলিভারি নিশ্চিত করবে।
          </p>

          <div className="mt-8 rounded-3xl border border-sky-100 bg-sky-50/80 p-5 text-left">
            <p className="text-base font-semibold text-slate-900">
              এরপর কী হবে?
            </p>

            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>১. আমাদের টিম আপনার অর্ডার তথ্য যাচাই করবে।</p>
              <p>২. মোবাইল নম্বরে যোগাযোগ করে অর্ডার কনফার্ম করবে।</p>
              <p>৩. আপনার ঠিকানায় ডেলিভারি প্রসেস শুরু হবে।</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                হোমে ফিরে যান
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-sky-200 bg-white/80 text-sky-700 shadow-sm hover:bg-sky-50 hover:text-sky-800"
            >
              <Link href="/#order">
                <MessageCircle className="mr-2 h-4 w-4" />
                আরেকটি অর্ডার করুন
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Intelligent Book — শিশুদের আনন্দময় শেখার সঙ্গী
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
