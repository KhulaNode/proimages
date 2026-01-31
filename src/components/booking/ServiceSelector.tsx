"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  duration: number;
  image: string | null;
}

interface ServiceSelectorProps {
  onNext: (data: {
    serviceId: string;
    serviceName: string;
    servicePrice: number;
    duration: number;
  }) => void;
}

export default function ServiceSelector({ onNext }: ServiceSelectorProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    // Fetch services from API
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service.id);
  };

  const handleNext = () => {
    const service = services.find((s) => s.id === selectedService);
    if (service) {
      onNext({
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.basePrice,
        duration: service.duration,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-proimages-orange mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-300 text-center mb-8">
        Select the service you'd like to book
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            className={`text-left p-6 rounded-lg border-2 transition-all ${
              selectedService === service.id
                ? "border-proimages-orange bg-proimages-gray"
                : "border-proimages-gray hover:border-gray-500"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-proimages-orange font-bold">
                {formatCurrency(service.basePrice)}
              </span>
              <span className="text-gray-400 text-sm">{service.duration} min</span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Date & Time
        </button>
      </div>
    </div>
  );
}
