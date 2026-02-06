"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { buttonAnimation } from "@/lib/motion";

const contactInfo = [
  { icon: MapPin, title: "Address", value: "123 Security Ave, Sandton\nJohannesburg, South Africa" },
  { icon: Mail, title: "Email", value: "info@suburbansecurity.co.za" },
  { icon: Phone, title: "Phone", value: "+27 11 123 4567" },
  { icon: Clock, title: "Office Hours", value: "Mon – Fri, 8:00 AM – 5:00 PM" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 bg-slate-light-bg px-6 py-24 text-center lg:px-20">
        <Badge text="GET IN TOUCH" />
        <h1 className="max-w-3xl text-4xl font-bold text-dark lg:text-5xl lg:leading-tight">
          Let&apos;s Secure Your Operations Together
        </h1>
        <p className="max-w-xl text-lg text-slate-muted">
          Ready for a demo or have questions? Our team is here to help you transform your security operations.
        </p>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-24 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="mb-8 text-2xl font-bold text-dark">Send Us a Message</h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-dark">Message Sent!</h3>
                <p className="text-slate-muted">We&apos;ll get back to you within 24 hours.</p>
                <motion.button
                  onClick={() => setSubmitted(false)}
                  whileHover={buttonAnimation.whileHover}
                  whileTap={buttonAnimation.whileTap}
                  transition={buttonAnimation.transition}
                  className="mt-4 text-sm font-semibold text-teal hover:underline"
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark">Full Name <span className="text-red-600">*</span></label>
                    <input id="name" type="text" required aria-required="true" placeholder="John Doe" className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark">Email <span className="text-red-600">*</span></label>
                    <input id="email" type="email" required aria-required="true" placeholder="john@company.co.za" className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-semibold text-dark">Company Name</label>
                    <input id="company" type="text" placeholder="Acme Security" className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark">Phone Number</label>
                    <input id="phone" type="tel" placeholder="+27 11 123 4567" className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-dark">Subject</label>
                  <select id="subject" className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm text-slate-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Request a Demo</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-dark">Message <span className="text-red-600">*</span></label>
                  <textarea id="message" required aria-required="true" rows={5} placeholder="Tell us about your security operations..." className="w-full rounded-lg border border-slate-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? buttonAnimation.whileHover : undefined}
                  whileTap={!isSubmitting ? buttonAnimation.whileTap : undefined}
                  transition={buttonAnimation.transition}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-4 font-semibold text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-dark">Contact Information</h2>
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                  <item.icon className="h-5 w-5 text-teal" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{item.title}</p>
                  <p className="whitespace-pre-line text-sm text-slate-muted">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
