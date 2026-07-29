# Helping Hands — Roadmap

A living checklist, not a fixed plan. Update it as things get done or priorities shift — the point is to make it easy to pick back up after a break, not to lock in a schedule.

## MVP Build

## MVP Build

- [x] Decide tech stack: Next.js (App Router) + TypeScript + Tailwind + Supabase + FullCalendar
- [x] Design Supabase schema: `profiles`, `organizations`, `opportunities`, `org_follows`, with Row Level Security policies
- [x] Wire `Calendar.tsx` to live Supabase data (replaced the hardcoded mock array)
- [x] Join organization name into each opportunity's display
- [x] Wire the Sign Up button with a fallback chain: opportunity's own `signup_url` → org `website_url` → org `contact_email` (mailto) → disabled "coming soon" state
- [x] Test all four Sign Up button states end-to-end with real data
- [x] Deploy to Vercel to get a real public URL
- [x] Build a shared sign up / log in flow (Supabase Auth) for both volunteers and org admins, differing only by role selected at signup
- [X] Add an `is_verified` boolean to the `organizations` table (default false)
- [x] Update RLS so only verified org owners (`is_verified = true`) can insert/edit opportunities
- [x] Add an RLS policy allowing an org_admin to create their own organization row
- [ ] Build the "Post an Event" form for verified orgs
- [ ] Verify orgs yourself by flipping `is_verified` to true in the Supabase Table Editor — no admin dashboard needed for now
- [ ] Build a "Browse Events" filterable list view: sort by date (default) or by organization, with favorited orgs (via `org_follows`) bubbling to the top
- [ ] Style/polish pass on the whole site once core functionality is in place

## Before Real Launch

- [ ] Re-enable "Confirm email" in Supabase (Authentication → Sign In / Providers → User Signups)

## Go-to-Market

- [ ] Manually onboard 5–10 real Central Mass nonprofits and enter their events yourself
- [ ] Reach out to local high school principals (especially schools you attended) about directing students to the site
- [ ] (Manual, no code) When an org signs up, attach them by pasting their profile id into their org's owner_id and flipping is_verified in the Table Editor
- [ ] Post about it on social media

## Future / Not Yet — Don't Build These Until the MVP Has Real Traction

- [ ] User accounts with category/org preferences
- [ ] Notifications when a followed org posts a new opportunity
- [ ] Expand beyond Central Mass to all of Massachusetts
- [ ] Monetization: Google Ads first; subscriptions/paid placement only once there's real volunteer + org traffic
- [ ] V2: self-serve "claim your organization" flow, once you're not personally onboarding every org