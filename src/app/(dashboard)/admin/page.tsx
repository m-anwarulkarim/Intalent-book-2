import { redirect } from "next/navigation";

import { isAdminLoggedIn } from "@/lib/admin-auth";

import { Button } from "@/components/ui/button";
import { AdminOrders } from "./orders-list";

export default async function AdminPage() {
  const loggedIn = await isAdminLoggedIn();

  if (!loggedIn) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-sky-950/5 backdrop-blur-xl sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Intelligent Book
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              সব অর্ডার দেখুন, আপডেট করুন বা ডিলিট করুন।
            </p>
          </div>

          {/* <form action={logoutAdmin}>
            <Button
              type="submit"
              variant="outline"
              className="rounded-full border-sky-200 bg-white/80 text-sky-700 hover:bg-sky-50"
            >
              Logout
            </Button>
          </form> */}
        </div>

        <AdminOrders />
      </div>
    </main>
  );
}
