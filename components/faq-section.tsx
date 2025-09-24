"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900" id="faq">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4 text-[#003366] dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-[700px] mx-auto">
            Find answers to common questions about our financial management platform.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="text-left font-medium text-[#003366] dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    question: "How does the travel insurance processing work?",
    answer:
      "Our platform streamlines the entire travel insurance process from policy issuance to claims processing. We integrate with major insurance providers, automate documentation, and provide real-time tracking of claims status. This reduces processing time by up to 70% and improves accuracy.",
  },
  {
    question: "What payment methods are supported for refunds?",
    answer:
      "We support multiple payment methods including credit/debit cards, bank transfers, mobile money (MTN, Airtel), and digital wallets. Refunds are processed back to the original payment method by default, but can be redirected to alternative methods if needed.",
  },
  {
    question: "How are commissions calculated and distributed?",
    answer:
      "Commissions are calculated based on customizable rules that you define in the system. You can set different rates based on product type, sales volume, or agent tier. Distributions can be automated on schedules (weekly, bi-weekly, monthly) or triggered manually. All transactions are fully transparent with detailed reporting.",
  },
  {
    question: "Is the platform secure for financial transactions?",
    answer:
      "Yes, our platform employs bank-grade security measures including end-to-end encryption, two-factor authentication, and regular security audits. We are PCI-DSS compliant for handling payment information and implement strict data protection protocols to safeguard all financial transactions.",
  },
  {
    question: "Can I integrate the system with my existing software?",
    answer:
      "Absolutely. Our platform offers robust API integration capabilities that connect with your existing CRM, accounting software, or booking systems. We provide detailed documentation and technical support to ensure smooth integration with minimal disruption to your operations.",
  },
  {
    question: "How long does implementation and onboarding take?",
    answer:
      "The typical implementation timeline is 2-4 weeks, depending on your specific requirements and the complexity of integrations. Our dedicated onboarding team provides comprehensive training and support throughout the process, including data migration, system configuration, and user training.",
  },
]
