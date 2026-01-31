"use client";

import { useState } from "react";
import ServiceSelector from "@/components/booking/ServiceSelector";
import DateTimeSelector from "@/components/booking/DateTimeSelector";
import ClientDetailsForm from "@/components/booking/ClientDetailsForm";
import BookingSummary from "@/components/booking/BookingSummary";

export type BookingStep = "service" | "datetime" | "details" | "summary";

export interface BookingData {
  serviceId?: string;
  serviceName?: string;
  servicePrice?: number;
  duration?: number;
  bookingDate?: string;
  startTime?: string;
  endTime?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientNotes?: string;
  addOns?: Array<{ id: string; name: string; price: number; quantity: number }>;
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep === "service") setCurrentStep("datetime");
    else if (currentStep === "datetime") setCurrentStep("details");
    else if (currentStep === "details") setCurrentStep("summary");
  };

  const prevStep = () => {
    if (currentStep === "summary") setCurrentStep("details");
    else if (currentStep === "details") setCurrentStep("datetime");
    else if (currentStep === "datetime") setCurrentStep("service");
  };

  return (
    <main className="min-h-screen bg-proimages-dark">
      <div className="section-container">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep === step.id
                      ? "bg-proimages-orange text-white"
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-green-500 text-white"
                      : "bg-proimages-gray text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-20 h-1 bg-proimages-gray mx-2"></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <h2 className="text-2xl font-bold text-proimages-orange">
              {steps.find((s) => s.id === currentStep)?.title}
            </h2>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === "service" && (
            <ServiceSelector
              onNext={(data) => {
                updateBookingData(data);
                nextStep();
              }}
            />
          )}

          {currentStep === "datetime" && (
            <DateTimeSelector
              serviceId={bookingData.serviceId!}
              duration={bookingData.duration!}
              onNext={(data) => {
                updateBookingData(data);
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === "details" && (
            <ClientDetailsForm
              onNext={(data) => {
                updateBookingData(data);
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === "summary" && (
            <BookingSummary bookingData={bookingData} onBack={prevStep} />
          )}
        </div>
      </div>
    </main>
  );
}

const steps = [
  { id: "service", title: "Choose Service" },
  { id: "datetime", title: "Pick Date & Time" },
  { id: "details", title: "Your Details" },
  { id: "summary", title: "Confirm Booking" },
];
