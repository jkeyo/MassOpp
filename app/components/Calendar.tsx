"use client";

import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";


type HHEvent = {
  id: string;
  title: string;
  start: string; // ISO string
  end?: string;
  location: string;
  orgName: string;
  description?: string;
};

export default function Calendar() {
  const events = useMemo<HHEvent[]>(
  () => [
    {
      id: "1",
      title: "Food Pantry Sort & Pack",
      start: "2026-01-18T14:00:00",
      end: "2026-01-18T16:00:00",
      location: "Worcester, MA",
      orgName: "Community Pantry Network",
      description: "Help sort donations and pack bags for distribution.",
    },
    {
      id: "2",
      title: "Park Cleanup",
      start: "2026-01-24T10:00:00",
      end: "2026-01-24T12:00:00",
      location: "Shrewsbury, MA",
      orgName: "Green Streets",
      description: "Gloves + bags provided. Dress warm.",
    },
  ],
  []
);

  const [selected, setSelected] = useState<HHEvent | null>(null);

  useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setSelected(null);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

  function onEventClick(arg: EventClickArg) {
    const found = events.find((e: HHEvent) => e.id === arg.event.id) ?? null;
    setSelected(found);
}

  return (
    <div className="rounded-xl border p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate="2026-01-01"
        height="auto"
        events={events}
        eventClick={onEventClick}
        headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
        }}
        dayMaxEvents={true}
        fixedWeekCount={false}
        displayEventEnd={false}
        eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
        }}
        />

        {/* Details Modal */}
        {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* backdrop */}
                <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSelected(null)}
                />

                {/* modal card */}
                <div
                className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="flex items-start justify-between gap-4">
                    <div>
                    <h2 className="text-lg font-semibold">{selected.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{selected.orgName}</p>
                    </div>

                    <button
                    className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                    onClick={() => setSelected(null)}
                    >
                    Close
                    </button>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                    <div>
                    <div className="font-medium">When</div>
                    <div className="text-gray-700">
                        {formatWhen(selected.start, selected.end)}
                    </div>
                    </div>

                    <div>
                    <div className="font-medium">Where</div>
                    <div className="text-gray-700">{selected.location}</div>
                    </div>

                    {selected.description && (
                    <div>
                        <div className="font-medium">Details</div>
                        <div className="text-gray-700">{selected.description}</div>
                    </div>
                    )}
                </div>

                <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-90">
                    Sign up (coming soon)
                    </button>
                    <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
                    Share
                    </button>
                </div>
                </div>
            </div>
            )}
    </div>
  );
}

function formatWhen(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : null;

  const date = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startTime = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!end) return `${date} • ${startTime}`;

  const endTime = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${date} • ${startTime} – ${endTime}`;
}
