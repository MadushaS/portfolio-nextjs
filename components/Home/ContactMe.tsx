"use client";

import { LoaderCircle, MailCheck, MailX } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { WEB3FORM_ACCESS_KEY } from "@/lib/env";

export default function ContactMe(
  props: Readonly<React.HTMLProps<HTMLDivElement>>,
) {
  return (
    <section className="container my-8 px-4" {...props}>
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl shadow-lg lg:grid lg:grid-cols-5">
        <div className="bg-card px-4 py-16 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-card-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
              Get in touch
            </h2>
            <p className="text-card-foreground/60 mt-3 text-lg leading-6">
              Feel free to reach out to me using the contact information below.
              I would love to hear from you!
            </p>
          </div>
        </div>
        <div className="bg-accent px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8 lg:py-24 xl:pl-12">
          <FormComponent />
        </div>
      </div>
    </section>
  );
}

function FormComponent() {
  const [status, setStatus] = useState("");

  const FormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    phone: z.string().min(1),
    message: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const contactStatuses = {
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };

  const onSubmit = async () => {
    setStatus(contactStatuses.loading);
    try {
      const formData = new FormData();
      formData.append("name", form.getValues("name"));
      formData.append("email", form.getValues("email"));
      formData.append("phone", form.getValues("phone"));
      formData.append("message", form.getValues("message"));
      formData.append("access_key", WEB3FORM_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setStatus(contactStatuses.submitted);
        form.reset();
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus(contactStatuses.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourname@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === contactStatuses.loading}>
          {status === contactStatuses.loading ? (
            <span className="flex gap-2">
              <LoaderCircle size={24} className="animate-spin" /> Sending...
            </span>
          ) : (
            <span>Send Message</span>
          )}
        </Button>
      </form>
      <FormSumbitAlertDialog status={status} setStatus={setStatus} />
    </Form>
  );
}

function FormSumbitAlertDialog({
  status,
  setStatus,
}: Readonly<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}>) {
  return (
    <AlertDialog
      open={status == "submitted" || status == "error"}
      onOpenChange={() => {
        setStatus("");
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === "submitted"
              ? "Email Sent Successfully"
              : "Email Failed"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex items-center gap-2">
              {status === "submitted" ? <MailCheck /> : <MailX />}
              {status === "submitted"
                ? "Your email has been sent successfully."
                : "There was an error sending your email."}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setStatus("")}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
