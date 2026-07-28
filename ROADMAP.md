# Helping Hands — Roadmap

A living checklist, not a fixed plan. Update it as things get done or priorities shift — the point is to make it easy to pick back up after a break, not to lock in a schedule.

## MVP Build

- [x] Decide tech stack: Next.js (App Router) + TypeScript + Tailwind + Supabase + FullCalendar
- [x] Design Supabase schema: `profiles`, `organizations`, `opportunities`, `org_follows`, with Row Level Security policies
- [x] Wire `Calendar.tsx` to live Supabase data (replaced the hardcoded mock array)
- [x] Join organization name into each opportunity's display
- [x] Wire the Sign Up button with a fallback chain: opportunity's own `signup_url` → org `website_url` → org `contact_email` (mailto) → disabled "coming soon" state
- [ ] Test all four Sign Up button states end-to-end with real data
- [ ] Deploy to Vercel to get a real public URL
- [ ] Build a basic "Post an Event" flow (a simple form is enough for now — full org self-serve accounts come later)
- [ ] Add a "Browse Events" list view (the nav button currently does nothing)

## Go-to-Market

- [ ] Manually onboard 5–10 real Central Mass nonprofits and enter their events yourself
- [ ] Reach out to local high school principals (especially schools you attended) about directing students to the site
- [ ] Post about it on social media

## Future / Not Yet — Don't Build These Until the MVP Has Real Traction

- [ ] Org self-serve accounts (auth) so orgs can log in and post their own listings
- [ ] User accounts with category/org preferences
- [ ] Notifications when a followed org posts a new opportunity
- [ ] Expand beyond Central Mass to all of Massachusetts
- [ ] Monetization: Google Ads first; subscriptions/paid placement only once there's real volunteer + org traffic