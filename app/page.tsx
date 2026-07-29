import Calendar from "./components/Calendar";
import AuthStatus from "./components/AuthStatus";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="font-semibold tracking-tight">Helping Hands</div>

          <nav className="flex items-center gap-3">
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">
              Browse Events
            </button>
            <button className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:opacity-90">
              Post an Event
            </button>
            <AuthStatus />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Volunteer Calendar</h1>
        <p className="mt-2 text-sm text-gray-600">
          Central Massachusetts • Find an event and sign up fast.
        </p>

        <div className="mt-6">
          <Calendar />
        </div>
      </main>
    </div>
  );
}