// Utility functions for date and time formatting

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatTime(time: string): string {
  // Convert "09:00" to "9:00 AM"
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BK-${year}-${random}`;
}

export function isDateBlocked(date: Date, blockedDates: Date[]): boolean {
  return blockedDates.some(
    (blocked) =>
      blocked.getFullYear() === date.getFullYear() &&
      blocked.getMonth() === date.getMonth() &&
      blocked.getDate() === date.getDate()
  );
}

export function getAvailableTimeSlots(duration: number): string[] {
  // Generate time slots from 9 AM to 5 PM
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 17;
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (duration <= 30) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  
  return slots;
}
