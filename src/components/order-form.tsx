"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";

import { orderSchema } from "@/lib/validators/order";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const BOOK_PRICE = 1000;

export function OrderForm() {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      quantity: 1,
      note: "",
    },

    onSubmit: async ({ value }) => {
      try {
        orderSchema.parse(value);
      } catch {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          form.reset();
          router.push("/thank-you");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
  });

  return (
    <Card className="rounded-3xl border-white/60 bg-white/85 shadow-xl shadow-sky-950/5 backdrop-blur-md">
      <CardHeader>
        <CardTitle>অর্ডারের তথ্য দিন</CardTitle>
        <CardDescription className="text-slate-600">
          আপনার নাম, মোবাইল নম্বর, ঠিকানা এবং বইয়ের পরিমাণ লিখে অর্ডারটি কনফার্ম
          করুন।
        </CardDescription>
      </CardHeader>

      <CardContent>
        {status === "success" && (
          <Alert className="mb-6 border-emerald-200 bg-emerald-50 text-emerald-800">
            <AlertDescription>
              আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে! আমাদের টিম শীঘ্রই যোগাযোগ
              করবে।
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mb-6 border-rose-200 bg-rose-50 text-rose-800">
            <AlertDescription>
              দুঃখিত, অর্ডারটি সম্পন্ন হয়নি। সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।
            </AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>নাম</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="আপনার নাম"
                        className="border-sky-100 bg-white/90 text-slate-700 placeholder:text-slate-400 focus-visible:ring-sky-200"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="phone">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>মোবাইল নম্বর</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, "");
                          field.handleChange(onlyNumbers);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="017XXXXXXXX"
                        className="border-sky-100 bg-white/90 text-slate-700 placeholder:text-slate-400 focus-visible:ring-sky-200"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      সম্পূর্ণ ঠিকানা
                    </FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="ডেলিভারির ঠিকানা"
                      className="min-h-28 border-sky-100 bg-white/90 text-slate-700 placeholder:text-slate-400 focus-visible:ring-sky-200"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="quantity">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const quantity = Number(field.state.value) || 1;
                const totalPrice = quantity * BOOK_PRICE;

                return (
                  <div className="space-y-4">
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>পরিমাণ</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={1}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const value = Number(e.target.value);

                          if (!value || value < 1) {
                            field.handleChange(1);
                            return;
                          }

                          field.handleChange(value);
                        }}
                        aria-invalid={isInvalid}
                        className="border-sky-100 bg-white/90 text-slate-700 focus-visible:ring-sky-200"
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>

                    <div className="rounded-2xl border border-sky-100 bg-sky-50/90 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-medium text-slate-600">
                          প্রতি বইয়ের মূল্য
                        </p>

                        <p className="text-sm font-semibold text-sky-900">
                          ৳{BOOK_PRICE.toLocaleString("en-BD")}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-4 border-t border-sky-100 pt-3">
                        <p className="text-base font-semibold text-sky-900">
                          মোট মূল্য
                        </p>

                        <p className="text-xl font-bold text-sky-700">
                          ৳{totalPrice.toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="note">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} className="text-sky-900">
                    নোট / বার্তা{" "}
                    <span className="text-slate-500">(ঐচ্ছিক)</span>
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="যদি কোন অতিরিক্ত অনুরোধ থাকে লিখুন"
                    className="min-h-24 border-sky-100 bg-white/90 text-slate-700 placeholder:text-slate-400 focus-visible:ring-sky-200"
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                className="mt-6 w-full rounded-full bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
                disabled={!canSubmit}
              >
                {isSubmitting ? "অপেক্ষা করুন..." : "অর্ডার কনফার্ম করুন"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
