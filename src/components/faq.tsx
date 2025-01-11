'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

const faqs = [
  {
    question: "How do I create a digital menu?",
    answer: "Creating a digital menu is simple! Just contact us and we will consult with you to generate a QR code or provide a link to be shared on your social media. Your customers can then scan the QR code to view your menu."
  },
  {
    question: "Do customers need to download an app?",
    answer: "No, customers don't need to download any app. They can simply scan the QR code with their smartphone's camera to view your menu in their web browser."
  },
  {
    question: "Can I update my menu in real-time?",
    answer: "Yes! You can update your menu items, prices, and availability in real-time. Changes are reflected immediately when customers view your menu."
  },
  {
    question: "Is the platform secure?",
    answer: "Yes, we take security seriously. All data is encrypted and stored securely. We regularly update our security measures to protect your information."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Through UPI, Wise, PayPal, and bank transfers for business accounts. All payments are processed securely through our payment partners."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our digital menu platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

