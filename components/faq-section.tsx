"use client"

import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-3xl font-semibold tracking-tight text-foreground">
          Need Help? We&apos;ve Got Answers
        </h2>
        <p className="mb-12 text-center text-sm text-muted-foreground sm:text-base">
          Explore our most commonly asked questions and find the information you need.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is-rvgenius">
            <AccordionTrigger className="text-base font-normal">
              What is RVGenius?
            </AccordionTrigger>
            <AccordionContent>
              RVGenius is a marketplace built specifically for RV shoppers and owners, combining rich
              vehicle details with deal insights so you can quickly see which listings are worth a closer look.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-pricing-works">
            <AccordionTrigger className="text-base font-normal">
              How do you determine if a listing is a good deal?
            </AccordionTrigger>
            <AccordionContent>
              We compare each listing against similar RVs, taking into account year, mileage, trim,
              features, and condition. This helps surface listings that are priced competitively for
              the current market so you can quickly spot strong deals.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="selling-on-rvgenius">
            <AccordionTrigger className="text-base font-normal">
              Can I sell my RV on RVGenius?
            </AccordionTrigger>
            <AccordionContent>
              Yes. You can create a listing in just a few minutes by adding photos, basic details,
              and pricing information. We then help connect your RV with buyers who are actively
              searching for similar models.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="buyer-fees">
            <AccordionTrigger className="text-base font-normal">
              Are there any fees for buyers?
            </AccordionTrigger>
            <AccordionContent>
              It&apos;s completely free to browse listings, favorite RVs, and contact sellers with a free
              RVGenius account. You can{" "}
              <Link href="/auth" className="font-medium text-primary underline-offset-4 hover:underline">
                sign up here
              </Link>{" "}
              to start saving and managing your favorite RVs in one place.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact-sellers">
            <AccordionTrigger className="text-base font-normal">
              How do I contact a seller?
            </AccordionTrigger>
            <AccordionContent>
              Each listing includes a simple way to message the seller so you can ask questions,
              request additional photos, or schedule a time to see the RV in person before making
              a decision.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

