"use client";

import { useEffect, useState } from "react";
import { getAvailableTimeSlots, formatTime } from "@/lib/utils";

interface DateTimeSelectorProps {
  serviceId: string;
  duration: number;
  onNext: (data: { bookingDate: string; startTime: string; endTime: string }) => void;
  onBack: () => void;
}

export default function DateTimeSelector({
  serviceId,
  duration,
  onNext,
  onBack,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    // Fetch blocked dates
    fetch("/api/availability/blocked-dates")
      .then((res) => res.json())
      .then((data) => setBlockedDates(data.map((d: { date: string }) => d.date)))
      .catch((error) => console.error("Error fetching blocked dates:", error));

    // Generate available time slots based on duration
    setAvailableSlots(getAvailableTimeSlots(duration));
  }, [duration]);

  const isDateDisabled = (date: string) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past dates
    if (selected < today) return true;

    // Disable blocked dates
    if (blockedDates.includes(date)) return true;

    return false;
  };

  const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      const endTime = calculateEndTime(selectedTime);
      onNext({ bookingDate: selectedDate, startTime: selectedTime, endTime });
    }
  };

  return (
    <div>
      <p className="text-gray-300 text-center mb-8">
        Choose your preferred date and time
      </p>

      {/* Date Picker */}
      <div className="mb-8">
        <label className="block text-lg font-bold mb-4">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-proimages-gray border-2 border-gray-600 rounded-lg p-4 text-white focus:border-proimages-orange focus:outline-none"
        />
      </div>

      {/* Time Slot Picker */}
      {selectedDate && !isDateDisabled(selectedDate) && (
        <div className="mb-8">
          <label className="block text-lg font-bold mb-4">Select Time</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTime === slot
                    ? "border-proimages-orange bg-proimages-orange text-white"
                    : "border-proimages-gray hover:border-gray-500"
                }`}
              >
                {formatTime(slot)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="bg-proimages-gray p-4 rounded-lg mb-8">
          <p className="text-gray-400">
            <strong className="text-white">Duration:</strong> {duration} minutes
          </p>
          <p className="text-gray-400">
            <strong className="text-white">Ends at:</strong>{" "}
            {formatTime(calculateEndTime(selectedTime))}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Details
        </button>
      </div>
    </div>
  );
}
