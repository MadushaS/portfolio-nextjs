"use client"

import { LoaderCircle, MailCheck, MailX } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import Button from "../ui/button";

async function sendEmail(data: any) {
    //sample email sending function fake

    const response = await fetch("https://api.example.com/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();

}

export default function ContactForm(props: React.HTMLProps<HTMLDivElement>) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const contactStatuses = {
        loading: 'loading',
        submitted: 'submitted',
        error: 'error'
    };
    const [status, setStatus] = useState('');

    const abortLongFetch = new AbortController();
    const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 1000);

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    });

    const onSubmit = async (data: any) => {
        setStatus(contactStatuses.loading);
        fetch("/api/contact", {
            body: JSON.stringify(data),
            method: "POST",
        }).then((res) => {
            if (res.ok) {
                clearTimeout(abortTimeoutId);
                return res.json();
            }
            throw new Error('Whoops! Error sending email.');
        }).then((res) => {
            setStatus(contactStatuses.submitted);
            reset();
        }).catch((err) => {
            setStatus(contactStatuses.error);
        });
    };

    return (
        <section className=" py-12" {...props}>
            <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-slate-200 dark:bg-slate-700 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                    <div className="max-w-lg mx-auto">
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">Get in touch</h2>
                        <p className="mt-3 text-lg leading-6 text-slate-500 dark:text-slate-300">
                            Feel free to reach out to me using the contact information below. I would love to hear from you!
                        </p>
                    </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                    <div className="max-w-lg mx-auto lg:max-w-none">
                        <form method="POST" className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full name
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500 border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                    placeholder="Your name"
                                />
                                {
                                    errors["name"] && <p className="text-red-500">Full name is required</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    {...register('email', {
                                        required: true,
                                        pattern: {
                                            value: emailRegex,
                                            message:
                                                'A valid email address id required. Example: name@domain.com.'
                                        }
                                    })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500 border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                    placeholder="Email"
                                />
                                {
                                    errors["email"] && <p className="text-red-500">Email is required</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone
                                </label>
                                <input
                                    {...register("phone", { required: true })}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="tel"
                                    className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500 border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                    placeholder="Phone"
                                />
                                {
                                    errors["phone"] && <p className="text-red-500">Phone is required</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    {...register("message", { required: true })}
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                    placeholder="Message"
                                    defaultValue={''}
                                />
                                {
                                    errors["message"] && <p className="text-red-500">Message is required</p>
                                }
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    disabled={status === contactStatuses.loading}
                                >
                                    {status === contactStatuses.loading ? (
                                        <>
                                            <LoaderCircle size={24} className="animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>Send Message</>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <AlertDialog open={status == 'submitted' || status == 'error'} onOpenChange={() => {
                setStatus('');

            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {status === 'submitted' ? 'Email Sent Successfully' : 'Email Failed'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="flex items-center space-x-2">
                                {status === 'submitted' ? <MailCheck size={32} /> : <MailX size={32} />}
                                <span>
                                    {status === 'submitted' ? 'Your email has been sent successfully.' : 'There was an error sending your email. Please try again later.'}
                                </span>
                            </div>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setStatus('')}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}