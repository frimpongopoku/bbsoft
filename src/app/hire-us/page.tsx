"use client";

import React, { useState } from "react";
import {
  Laptop,
  Smartphone,
  Bot,
  Globe,
  MessageSquare,
  ArrowRight,
  Send,
  Phone,
  CheckCircle,
  HelpCircle,
  MapPin,
} from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";
import QuoteBuilder from "@/components/QuoteBuilder";

const SERVICES = [
  {
    icon: Bot,
    tag: "AI-First",
    title: "Artificial Intelligence & ML",
    desc: "Custom LLM integrations, RAG pipelines, automated vector database querying, and production chatbot assistants built to scale.",
    accent: "from-brand-orange to-brand-amber",
  },
  {
    icon: Laptop,
    tag: "Full-Stack",
    title: "Web App Development",
    desc: "Robust, scalable SaaS portals and complex admin systems built with Next.js, TypeScript, and state-of-the-art security layers.",
    accent: "from-brand-amber to-brand-terracotta",
  },
  {
    icon: Smartphone,
    tag: "Cross-Platform",
    title: "Mobile Applications",
    desc: "Beautiful native iOS & Android apps crafted with React Native and Expo, offering high frame-rate performance and intuitive gestures.",
    accent: "from-brand-terracotta to-brand-orange",
  },
  {
    icon: Globe,
    tag: "Marketing",
    title: "Corporate Websites",
    desc: "Stunning marketing sites that load instantly, score perfect PageSpeed scores, and command audience authority with premium animations.",
    accent: "from-brand-orange to-brand-amber",
  },
] as const;

const PORTFOLIO = [
  {
    title: "KuaLingo AI Dialect Translator",
    category: "AI & Dialect Integration",
    desc: "A fine-tuned translation system matching local Ghanaian dialects (Akan, Ewe, Ga, Dagbani) for customer support automation. Built with embeddings and custom vector indexing.",
    tech: ["Next.js", "FastAPI", "OpenAI API", "Pinecone"],
    gradient: "from-brand-orange/8 to-brand-amber/5",
  },
  {
    title: "SikaFlow Mobile Wallet",
    category: "Fintech App",
    desc: "A secure digital ledger and transfer interface for West African transaction flows. Offers instant offline ledgers and biometric login.",
    tech: ["React Native", "Node.js", "Firebase", "WebSockets"],
    gradient: "from-brand-amber/8 to-brand-terracotta/5",
  },
  {
    title: "AgriGrow Crop Intelligence",
    category: "Web Platform & Dashboard",
    desc: "An analytical dashboard for agricultural cooperatives in Accra, mapping soil yields and calculating rainfall probability matrices via ML.",
    tech: ["Next.js", "Tailwind CSS", "Python API", "PostgreSQL"],
    gradient: "from-brand-terracotta/8 to-brand-orange/5",
  },
] as const;

export default function HireUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSelectEstimate = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: "Custom Project Quote Estimate",
      message: text,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 8000);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <BackgroundGrid />

      <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
            Hire Biibisoft
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text-title leading-tight">
            Delivery-Focused Engineering Services
          </h1>
          <p className="mt-4 text-brand-text-body leading-relaxed">
            This page covers the practical details for working with us: service
            scope, cost estimation, sample delivery profiles, and direct contact
            for your project.
          </p>
        </div>
      </section>

      <section
        id="services"
        className="py-20 md:py-28 border-t border-brand-border-theme/60 bg-brand-card-bg-theme/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Our Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-title mb-4">
              End-to-End Development Tailored for Performance &amp; Scale
            </h2>
            <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
              From AI-powered systems to cross-platform mobile apps — we design
              and build digital infrastructure that empowers businesses to move
              faster and smarter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="glass-card rounded-2xl p-8 relative overflow-hidden group"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${service.accent} opacity-0 group-hover:opacity-100`}
                    style={{ transition: "opacity 0.2s ease" }}
                  />

                  <div className="flex items-start gap-5">
                    <div
                      className="p-3 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0 group-hover:scale-105"
                      style={{ transition: "transform 0.2s ease" }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-orange border border-brand-orange/30 px-1.5 py-0.5 rounded-full">
                          {service.tag}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-extrabold text-brand-text-title mb-2 group-hover:text-brand-orange"
                        style={{ transition: "color 0.15s ease" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-brand-text-body text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-5 flex items-center gap-1 text-xs font-semibold text-brand-orange opacity-0 group-hover:opacity-100"
                    style={{ transition: "opacity 0.2s ease" }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="estimator"
        className="py-20 md:py-28 border-t border-brand-border-theme/60 bg-brand-card-bg-theme/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Interactive Tool
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-title mb-4">
              Configure Your Custom Project Estimate
            </h2>
            <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
              Use our interactive quote calculator to customise your project.
              Choose your platform, add modules, pick design fidelity, and see
              an instant estimate in USD and GHS.
            </p>
          </div>
          <QuoteBuilder onSelectEstimate={handleSelectEstimate} />
        </div>
      </section>

      <section id="tech-stack" className="py-20 md:py-28 border-t border-brand-border-theme/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              Portfolio Overview
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text-title mb-4">
              Featured Concepts &amp; Client Systems
            </h2>
            <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
              Simulated architectures representative of projects delivered by
              our engineering team across Ghana and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PORTFOLIO.map((work) => (
              <div key={work.title} className="glass-card rounded-2xl p-6 flex flex-col justify-between gap-5">
                <div>
                  <span className="text-[9px] font-mono text-brand-orange uppercase tracking-widest font-bold border border-brand-orange/25 px-2 py-0.5 rounded-full">
                    {work.category}
                  </span>
                  <h3 className="text-lg font-bold text-brand-text-title mt-3 mb-2 leading-snug">
                    {work.title}
                  </h3>
                  <p className="text-xs text-brand-text-body leading-relaxed">
                    {work.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {work.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[9px] font-bold font-mono text-brand-orange bg-brand-orange/8 border border-brand-orange/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 md:py-28 border-t border-brand-border-theme/60 bg-brand-card-bg-theme/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
                  Connect With Us
                </p>
                <h2 className="text-3xl font-extrabold text-brand-text-title mb-4 leading-tight">
                  Let&apos;s Build Something Incredible Together
                </h2>
                <p className="text-brand-text-body text-sm leading-relaxed">
                  Submit an inquiry or use the Estimator above to auto-populate
                  your project specs. A consultant will contact you within 24
                  hours.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Accra, Greater Accra, Ghana" },
                  { icon: Phone, text: "+233 (0) 24 000 0000" },
                  { icon: MessageSquare, text: "message@biibisoft.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-brand-orange/10 text-brand-orange shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-brand-text-body">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="glass-panel rounded-2xl p-8">
                {submitSuccess ? (
                  <div className="py-8 text-center space-y-4 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brand-emerald/12 border border-brand-emerald/25 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-brand-emerald" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-text-title">
                      Inquiry Sent Successfully
                    </h4>
                    <p className="text-sm text-brand-text-body max-w-md leading-relaxed">
                      Thank you for reaching out. We&apos;ve received your project
                      details and our engineering lead will respond within 24
                      hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {(["name", "email"] as const).map((field) => (
                        <div key={field} className="flex flex-col gap-1.5">
                          <label
                            htmlFor={field}
                            className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest"
                          >
                            {field === "name" ? "Your Name" : "Email Address"}
                          </label>
                          <input
                            id={field}
                            name={field}
                            type={field === "email" ? "email" : "text"}
                            required
                            value={formData[field]}
                            onChange={handleInputChange}
                            className="w-full bg-brand-input-bg-theme border border-brand-border-theme rounded-xl px-4 py-3 text-sm text-brand-text-title focus:outline-none placeholder:text-brand-text-muted/50"
                            style={{
                              transition:
                                "border-color 0.15s ease, box-shadow 0.15s ease",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = "var(--accent-orange)";
                              e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(249,115,22,0.08)";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "";
                              e.currentTarget.style.boxShadow = "";
                            }}
                            placeholder={field === "name" ? "e.g. Kofi Mensah" : "e.g. kofi@example.com"}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="subject"
                        className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-brand-input-bg-theme border border-brand-border-theme rounded-xl px-4 py-3 text-sm text-brand-text-title focus:outline-none placeholder:text-brand-text-muted/50"
                        style={{
                          transition:
                            "border-color 0.15s ease, box-shadow 0.15s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-orange)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(249,115,22,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.boxShadow = "";
                        }}
                        placeholder="e.g. Web Development Inquiry"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="message"
                        className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest"
                      >
                        Message / Project Specs
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-brand-input-bg-theme border border-brand-border-theme rounded-xl px-4 py-3 text-sm text-brand-text-title focus:outline-none placeholder:text-brand-text-muted/50 leading-relaxed resize-none"
                        style={{
                          transition:
                            "border-color 0.15s ease, box-shadow 0.15s ease",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent-orange)";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(249,115,22,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.boxShadow = "";
                        }}
                        placeholder="Detail your app objectives, or use the Quote Builder above to auto-fill..."
                      />
                      <span className="text-[10px] text-brand-text-muted flex items-center gap-1.5">
                        <HelpCircle className="w-3 h-3" />
                        Clicking &apos;Apply Config&apos; in the Quote Builder
                        auto-fills this field.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-brand-orange w-full focus:outline-none focus:ring-2 focus:ring-brand-orange disabled:opacity-50"
                      style={{ transition: "background-color 0.15s ease, opacity 0.15s ease" }}
                      onMouseEnter={(e) =>
                        !isSubmitting &&
                        (e.currentTarget.style.backgroundColor =
                          "var(--accent-orange-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "")
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
