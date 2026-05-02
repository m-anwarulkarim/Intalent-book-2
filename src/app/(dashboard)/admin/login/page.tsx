import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginAdmin } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4">
      <Card className="w-full max-w-md rounded-3xl border-white/70 bg-white/85 shadow-2xl shadow-sky-950/10 backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            অর্ডার ম্যানেজ করতে admin password দিন।
          </CardDescription>
        </CardHeader>

        <CardContent>
          {params.error && (
            <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              ভুল password দেওয়া হয়েছে।
            </p>
          )}

          <form action={loginAdmin} className="space-y-4">
            <Input
              name="password"
              type="password"
              placeholder="Admin password"
              required
            />

            <Button
              type="submit"
              className="w-full rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
