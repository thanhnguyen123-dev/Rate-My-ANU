"use client"

import React from "react"
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion"

const FAQSection = () => {
  const faqItems = [
    {
      question: "What is RateMyANU?",
      answer: "RateMyANU is a social platform where Australian National University students can browse courses, read reviews, and share their own experiences through ratings and comments."
    },
    {
      question: "How do I rate a course?",
      answer: "You need to sign in with your Google account first. Once authenticated, you can rate courses on a scale of 1-5 stars across three dimensions: difficulty, workload, and teaching experience."
    },
    {
      question: "Can I edit or delete my reviews?",
      answer: "Yes, you can edit or delete your own reviews at any time after posting them. Simply navigate to the course page where you left the review."
    },
    {
      question: "How are the overall ratings calculated?",
      answer: "The overall rating for each course is calculated as an average of the three rating categories: difficulty, workload, and teaching experience."
    },
    {
      question: "Can I see who wrote a specific review?",
      answer: "Yes, each review displays the username and profile picture of the reviewer, unless they've chosen to remain anonymous."
    }
  ]

  return (
    <section id="faq" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about using RateMyANU
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { FAQSection }
