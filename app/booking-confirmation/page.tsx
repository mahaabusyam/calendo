import { Suspense } from "react";
import { redirect } from "next/navigation";
import { BookingConfirmationView } from "@/components/booking/BookingConfirmationView";
import { parseTimeZoneId } from "@/lib/scheduling";

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
  const tz = parseTimeZoneId(params.tz);

  const isValid =
    /^\d{4}-\d{2}-\d{2}$/.test(params.date ?? "") &&
    /^\d{2}:\d{2}$/.test(params.slotId ?? "") &&
    tz !== null;

  if (!isValid || !params.date || !params.slotId || !tz) {
    redirect("/");
  }

  return (
    <BookingConfirmationView
      date={params.date}
      slotId={params.slotId}
      time={params.time ?? params.slotId}
      tz={tz}
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