import { Suspense } from "react";
import { BookingSuccessView } from "@/components/booking/BookingSuccessView";
import { redirect } from "next/navigation"; 
import { parseTimeZoneId } from "@/lib/scheduling";

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
  const tz = parseTimeZoneId(params.tz);

  const isValid =
    /^\d{4}-\d{2}-\d{2}$/.test(params.date ?? "") &&
    /^\d{2}:\d{2}$/.test(params.slotId ?? "") &&
    tz !== null;

  if (!isValid || !params.date || !params.slotId || !tz) {
    redirect("/");
  }

  return (
    <BookingSuccessView
      date={params.date}
      slotId={params.slotId}
      tz={tz}
      guestName={params.guestName ?? ""}
      guestEmail={params.guestEmail ?? ""}
      notes={params.notes ?? ""}
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
