"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  totalPrice: number;
  note: string | null;
  createdAt: string;
};

export function AdminOrders() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [savingId, setSavingId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");

  async function loadOrders() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/orders", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError("অর্ডার লোড করতে সমস্যা হয়েছে।");
        return;
      }

      setOrders(result.orders);
      setError("");
    } catch {
      setError("অর্ডার লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const load = async () => {
      await loadOrders();
    };
    load();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    return (
      order.name.toLowerCase().includes(searchText) ||
      order.phone.includes(searchText)
    );
  });

  async function handleUpdate(formData: FormData) {
    const id = String(formData.get("id") || "");

    const updatedData = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      quantity: Number(formData.get("quantity") || 1),
      totalPrice: Number(formData.get("totalPrice") || 0),
      note: String(formData.get("note") || ""),
    };

    try {
      setSavingId(id);

      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.error || "Order update করা যায়নি।");
        return;
      }

      await loadOrders();
    } catch {
      alert("Order update করতে সমস্যা হয়েছে।");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("আপনি কি এই order delete করতে চান?");

    if (!confirmDelete) return;

    try {
      setSavingId(id);

      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.error || "Order delete করা যায়নি।");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.filter((order) => order.id !== id),
      );
    } catch {
      alert("Order delete করতে সমস্যা হয়েছে।");
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <Card className="rounded-3xl border-white/70 bg-white/80 shadow-xl shadow-sky-950/5 backdrop-blur-xl">
        <CardContent className="p-8 text-center text-slate-600">
          অর্ডার লোড হচ্ছে...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-3xl border-white/70 bg-white/80 shadow-xl shadow-sky-950/5 backdrop-blur-xl">
        <CardContent className="p-8 text-center text-rose-600">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="rounded-3xl border-white/70 bg-white/85 shadow-xl shadow-sky-950/5 backdrop-blur-xl">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Filter Orders
              </p>
              <p className="mt-1 text-sm text-slate-600">
                নাম অথবা মোবাইল নম্বর দিয়ে order খুঁজুন।
              </p>
            </div>

            <div className="w-full sm:max-w-sm">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="নাম বা মোবাইল নম্বর লিখুন..."
                className="rounded-full bg-white/90"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-sky-50 px-4 py-2 text-sky-700">
              Total Orders: {orders.length}
            </span>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-700">
              Showing: {filteredOrders.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 && (
        <Card className="rounded-3xl border-white/70 bg-white/80 shadow-xl shadow-sky-950/5 backdrop-blur-xl">
          <CardContent className="p-8 text-center text-slate-600">
            কোনো order পাওয়া যায়নি।
          </CardContent>
        </Card>
      )}

      {filteredOrders.map((order) => (
        <Card
          key={order.id}
          className="rounded-3xl border-white/70 bg-white/85 shadow-xl shadow-sky-950/5 backdrop-blur-xl"
        >
          <CardContent className="p-5 sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500">Order ID: {order.id}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleString("en-BD")}
                </p>
              </div>

              <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                মোট: ৳{order.totalPrice.toLocaleString("en-BD")}
              </div>
            </div>

            <form action={handleUpdate} className="space-y-4">
              <input type="hidden" name="id" value={order.id} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    নাম
                  </label>
                  <Input name="name" defaultValue={order.name} required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    মোবাইল নম্বর
                  </label>
                  <Input
                    name="phone"
                    defaultValue={order.phone}
                    required
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    পরিমাণ
                  </label>
                  <Input
                    name="quantity"
                    type="number"
                    min={1}
                    defaultValue={order.quantity}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    মোট মূল্য
                  </label>
                  <Input
                    name="totalPrice"
                    type="number"
                    min={0}
                    defaultValue={order.totalPrice}
                    required
                    className="bg-sky-50 font-semibold text-sky-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  ঠিকানা
                </label>
                <Textarea
                  name="address"
                  defaultValue={order.address}
                  required
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  নোট
                </label>
                <Textarea
                  name="note"
                  defaultValue={order.note || ""}
                  className="min-h-20"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  className="rounded-full bg-sky-600 text-white hover:bg-sky-700"
                  disabled={savingId === order.id}
                >
                  {savingId === order.id ? "Saving..." : "Update Order"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-rose-200 bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  disabled={savingId === order.id}
                  onClick={() => handleDelete(order.id)}
                >
                  Delete Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
