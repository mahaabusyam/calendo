import { Suspense } from "react";
import { BookingConfirmationView } from "@/components/booking/BookingConfirmationView";

interface BookingConfirmationPageProps {
  searchParams: Promise<{
    date?: string;
    slotId?: string;
    time?: string;
    tz?: string;
  }>;
}

async function ConfirmationContent({
  searchParams,
}: BookingConfirmationPageProps) {
  const params = await searchParams;

  return (
    <BookingConfirmationView
      date={params.date}
      slotId={params.slotId}
      time={params.time}
      tz={params.tz}
    />
  );
}

export default function BookingConfirmationPage({
  searchParams,
}: BookingConfirmationPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 text-[14px] text-[var(--color-on-surface-variant)]">
          Loading booking details...
        </div>
      }
    >
      <ConfirmationContent searchParams={searchParams} />
    </Suspense>
  );
}
