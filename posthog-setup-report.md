<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router application. Here's a summary of all changes made:

- **`instrumentation-client.js`** *(new)* — Client-side PostHog initialization using Next.js 15.3+ `instrumentation-client` convention. Initializes PostHog with the EU host, a reverse proxy (`/ingest`), exception capture for error tracking, and debug mode in development.
- **`next.config.mjs`** *(updated)* — Added PostHog reverse proxy rewrites (`/ingest/*` → `https://eu.i.posthog.com/*` and `/ingest/static/*` → `https://eu-assets.i.posthog.com/*`) and `skipTrailingSlashRedirect: true` to support PostHog trailing slash API requests.
- **`src/components/ExploreBtn.js`** *(updated)* — Added `posthog.capture('explore_events_clicked')` in the button's `onClick` handler — tracks top-of-funnel engagement.
- **`src/components/EventCard.js`** *(updated)* — Added `'use client'` directive and `posthog.capture('event_card_clicked')` on link click, with properties: `event_title`, `event_slug`, `event_location`, `event_date`.
- **`src/components/NavBar.js`** *(updated)* — Added `'use client'` directive and PostHog capture calls on the Events and Create Event nav links.
- **`.env.local`** *(updated)* — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables set securely (never hardcoded in source files).

## Tracked Events

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' button on the homepage hero section — top of the engagement funnel | `src/components/ExploreBtn.js` |
| `event_card_clicked` | User clicks on an event card to view more details — measures event discovery engagement | `src/components/EventCard.js` |
| `nav_events_clicked` | User clicks the 'Events' navigation link — general browsing intent | `src/components/NavBar.js` |
| `nav_create_event_clicked` | User clicks the 'Create Event' navigation link — high-intent action indicating event organizers | `src/components/NavBar.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard: Analytics basics** — https://eu.posthog.com/project/133727/dashboard/546301
- 📈 **Exploration & Discovery Trends** — https://eu.posthog.com/project/133727/insights/IY0AgLLP
- 🔻 **Explore → Event Click Funnel** — https://eu.posthog.com/project/133727/insights/kCt17pap
- 🧭 **Nav Link Engagement** — https://eu.posthog.com/project/133727/insights/8Z6UW2qm
- 🎯 **Create Event Intent (Organizer Signal)** — https://eu.posthog.com/project/133727/insights/un97YwU3
- 🏆 **Top Clicked Events Breakdown** — https://eu.posthog.com/project/133727/insights/ilS6xXVz

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
