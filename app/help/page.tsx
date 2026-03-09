"use client"
import React, { useState } from 'react'
import Navbar from "../componetsMain/navbar"
import Footer from '../componetsMain/footer'
import { Mail, Phone, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How to verify my lawyer profile?',
      answer: "Lawyers can verify their profile by uploading their practicing certificate and ID in the 'Profile' section of their dashboard. Our admin team will review and approve the documents within 24 or 72 hours."
    },
    {
      question: 'Password reset instructions',
      answer: "Navigate to the 'Login' page and click on 'Forgot Password'. Enter your registered email address, and we will send you a secure link to reset your password immediately."
    },
    {
      question: 'Service fee explanation',
      answer: "LawLink connecting services are completely free for clients looking for legal help. Lawyers pay a professional subscription fee to maintain their verified status and access our network of clients."
    },
    {
      question: 'Direct messaging guide',
      answer: "Once a connection is established between a client and a lawyer, a secure, encrypted chat channel is opened. You can access all your active conversations via the 'Messages' tab in your dashboard."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950">
        <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center text-white">
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-400 uppercase bg-white/10 rounded-full mb-6 inline-block">
            Support Center
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            How can we <span className="text-blue-400">help you today?</span>
          </h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Whether you&apos;re a lawyer or a client, we&apos;re here to ensure your LawLink experience is smooth and successful.
          </p>
        </div>
      </section>

      <div className="container relative z-10 mx-auto px-4 md:px-8 -mt-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact Methods */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-blue-900/10 border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Direct Support</h2>
              <p className="text-gray-600 text-lg mb-10">
                Skip the ticket system. Connect directly with our team through the channels below. We typically respond within 1-2 business hours.
              </p>

              <div className="space-y-6">
                <a href="mailto:lawlink200@gmail.com" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email Us</h3>
                    <p className="text-blue-600 font-medium">lawlink200@gmail.com</p>
                  </div>
                </a>

                <a href="tel:0969591009" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Call Support</h3>
                    <p className="text-blue-600 font-medium">0969591009</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-50 flex items-center gap-4 text-gray-500">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">Your data and privacy are always protected.</span>
            </div>
          </div>

          {/* Quick FAQ/Guide Preview */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl shadow-blue-900/20 flex flex-col overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/15 border-white/30' : 'hover:bg-white/10'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    >
                      <span className="font-bold pr-4">{faq.question}</span>
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-300 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/50 shrink-0" />
                      )}
                    </button>

                    <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-5 pb-5 text-blue-50/80 prose-invert prose-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-blue-100/60 text-sm mt-12 relative z-10">
              Click a question above to see the solution. For more details, browse our internal knowledge base.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HelpPage
