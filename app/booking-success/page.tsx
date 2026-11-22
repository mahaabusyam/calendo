import { Suspense } from "react";
import { BookingSuccessView } from "@/components/booking/BookingSuccessView";

interface BookingSuccessPageProps {
  searchParams: Promise<{
    date?: string;
    slotId?: string;
    tz?: string;
    guestName?: string;
    guestEmail?: string;
    notes?: string;
  }>;
}

async function SuccessContent({ searchParams }: BookingSuccessPageProps) {
  const params = await searchParams;

  return (
    <BookingSuccessView
      date={params.date}
      slotId={params.slotId}
      tz={params.tz}
      guestName={params.guestName}
      guestEmail={params.guestEmail}
      notes={params.notes}
    />
  );
}

export default function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 text-[14px] text-[var(--color-on-surface-variant)]">
          Loading confirmation...
        </div>
      }
    >
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
