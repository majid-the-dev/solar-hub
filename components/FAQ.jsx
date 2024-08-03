import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BsDashLg } from "react-icons/bs";

const FAQ = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto w-full max-w-7xl py-28 px-5">
        <div className="flex items-center justify-center gap-1 text-darkGreen mx-auto">
          <BsDashLg className="text-lg" />
          <p className="text-xs md:text-sm font-light">What customers ask</p>
        </div>
        <h1 className="text-2xl md:text-4xl text-center font-bold mt-3">
          Frequently asked questions
        </h1>
        <div className="mx-auto w-full max-w-3xl mt-14">
          <Accordion type="single" collapsible className="w-full space-y-7">
            <AccordionItem
              value="item-1"
              className="bg-none border-gray-200 no-underline"
            >
              <AccordionTrigger className="text-sm text-left">
                What are the benefits of using solar energy?
              </AccordionTrigger>
              <AccordionContent className="text-xs font-light leading-6 my-4">
                Solar energy is renewable, reduces electricity bills, decreases
                carbon footprint, requires low maintenance, and provides energy
                independence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-none border-gray-200 no-underline"
            >
              <AccordionTrigger className="text-sm text-left">
                How much does it cost to install solar system?
              </AccordionTrigger>
              <AccordionContent className="text-xs font-light leading-6 my-4">
                The cost varies based on system size, location, and specific
                needs. Contact us for a customized quote to understand the
                potential investment and savings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="bg-none border-gray-200 no-underline"
            >
              <AccordionTrigger className="text-sm text-left">
                Do solar panels work during cloudy days or at night?
              </AccordionTrigger>
              <AccordionContent className="text-xs font-light leading-6 my-4">
                Solar panels generate electricity during daylight hours, even on
                cloudy days, though their efficiency may be reduced. At night,
                systems with battery storage can provide power using stored
                energy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
