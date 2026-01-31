"use client";

import { useState } from "react";

interface ClientDetailsFormProps {
  onNext: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientNotes?: string;
  }) => void;
  onBack: () => void;
}

export default function ClientDetailsForm({
  onNext,
  onBack,
}: ClientDetailsFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Name is required";
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Email is invalid";
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-gray-300 text-center mb-8">
        Tell us about yourself so we can confirm your booking
      </p>

      <div className="space-y-6 mb-8">
        {/* Name */}
        <div>
          <label htmlFor="clientName" className="block text-lg font-bold mb-2">
            Full Name <span className="text-proimages-orange">*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={`w-full bg-proimages-gray border-2 rounded-lg p-4 text-white focus:outline-none ${
              errors.clientName
                ? "border-red-500"
                : "border-gray-600 focus:border-proimages-orange"
            }`}
            placeholder="John Doe"
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="clientEmail" className="block text-lg font-bold mb-2">
            Email Address <span className="text-proimages-orange">*</span>
          </label>
          <input
            type="email"
            id="clientEmail"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className={`w-full bg-proimages-gray border-2 rounded-lg p-4 text-white focus:outline-none ${
              errors.clientEmail
                ? "border-red-500"
                : "border-gray-600 focus:border-proimages-orange"
            }`}
            placeholder="john@example.com"
          />
          {errors.clientEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="clientPhone" className="block text-lg font-bold mb-2">
            Phone Number <span className="text-proimages-orange">*</span>
          </label>
          <input
            type="tel"
            id="clientPhone"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className={`w-full bg-proimages-gray border-2 rounded-lg p-4 text-white focus:outline-none ${
              errors.clientPhone
                ? "border-red-500"
                : "border-gray-600 focus:border-proimages-orange"
            }`}
            placeholder="+27 XX XXX XXXX"
          />
          {errors.clientPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="clientNotes" className="block text-lg font-bold mb-2">
            Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="clientNotes"
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-proimages-gray border-2 border-gray-600 rounded-lg p-4 text-white focus:border-proimages-orange focus:outline-none"
            placeholder="Any special requirements or questions..."
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="submit" className="btn-primary">
          Review Booking
        </button>
      </div>
    </form>
  );
}
