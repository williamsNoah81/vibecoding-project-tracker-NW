# Vibecoding Project Tracker — Design

**Status:** Hackathon starter design doc · fill in the **`<TODO>`** sections before you tag `design-done`.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B, during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

One sentence that captures the feeling the tracker should leave you with.

`Structured and simple`

Two or three references that capture the vibe (links to dribbble shots, screenshots of apps you admire, Pinterest boards — anything visual):

- `<TODO>`
- `<TODO>`
- `<TODO>`

Anti-references — what we are explicitly **not** trying to look like:

- `<TODO>`

## 2. Color palette

These are the colors the build milestones will reference. Once chosen, paste the hex values into `tailwind.config.js` so the rest of the team can use Tailwind utility classes (e.g. `bg-brand-primary`, `border-due-warning`).

### Brand

| Token | Hex | Where it shows up |
|---|---|---|
| `brand-primary` | `#6366F1` | Header, "+" button, focus rings |
| `brand-accent` | `#0D9488` | Highlights, hover states, links |
| `surface-page` | `#090D16` | Page background |
| `surface-card` | `#1E293B` | Card background |
| `text-primary` | `#DAE2FD` | Body text |
| `text-muted` | `#A3ABC4` | Captions, dates, counts |

### Task type (M6 `tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `<TODO>` | Cards tagged `feature` (accent stripe + icon) |
| `type-bug` | `<TODO>` | Cards tagged `bug` (accent stripe + icon) |

### Due-date states (M8 `due-tint`)

| Token | Hex | When used |
|---|---|---|

**Universal Construction:** Composed of an SVG icon, monospace text label (e.g., `CRIT <24H`, `DUE 2D`, `SAFE 5D`), and an outer outline shape.

| `due-safe` | `**Safe Chip:** Border `1px solid #0D9488`, background `rgba(13, 148, 136, 0.12)`, text `#6EE7B7`. Prefix: `[✓]` or `CheckDotIcon`` | More than 2 days out |
| `due-warning` | `**Warning Chip:** Border `1px solid #D97706`, background `rgba(217, 119, 6, 0.12)`, text `#FCD34D`. Prefix: `[~]` or `CalendarIcon`` | Less than 24 hours |
| `due-overdue` | `**Critical Chip:** Border `1px solid #E11D48`, background `rgba(225, 29, 72, 0.12)`, text `#FDA4AF`. Prefix: `[!]` or `FlameIcon`. Shape: chamfered/angled icon frame.` | Past due |
| `due-neutral` | `Same as safe` | Done (overrides date) |

## 3. Typography

| Role | Font | Why |
|---|---|---|
| Heading | `Inter` | `Simple, readable font that keeps the structured theme` |
| Body | `Inter` | `Same font as headings so that we keep continuity, just a smaller size to distunguish main text from the headings` |
| Monospace (tags, badges, code) | `Jetbrains Mono` | `A slightly more stylised font that shows difference between body text while also keeping a simple and readable design` |

Suggested sizes (override only if the design demands it):

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** `Lighter than background, simple bar on left side corresponding to the deadline`
- **Buttons:** `solid fill with primary colour, visual distinction when hovering` (e.g. "Solid fill, no gradient, generous padding, rounded-md.")
- **Modal:** `<TODO>` (e.g. "Centered, max-width-md, slate-900 backdrop at 50% opacity.")
- **Empty states:** `<TODO>` (e.g. "Dashed border, muted text, never sad.")
- **Drag affordance (if used):** `<TODO>` (e.g. "None — we use a status dropdown.")

## 5. Voice / microcopy

Three lines of microcopy that capture the tone of the product. Keep it short — these are the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
| "+" button label | `New Task` (e.g. "+ Task" or "Add task" or "New") |
| Empty column placeholder | `Nothing here right now` (e.g. "Nothing here yet — keep going.") |
| Toast after "Copy as Prompt Context" | `Context copied` (e.g. "Copied. Now paste it into the AI.") |
| Confirm-delete message | `This cannot be undone, delete?` (e.g. "Delete this task? You can't undo.") |
| Handoff toast (M7 `task-owner`) | `Handed off to {name}` (e.g. "Handed off to {name}. They've got it.") |

## 6. Logo / wordmark

The tracker probably doesn't need a logo, but it does need a name and a wordmark style.

- **Product name:** `VibeBoard` (match PRD §11 team identity)
- **Wordmark style:** `Name in Heading font, large in the primary colour without an icon` (e.g. "Just the name in the heading font, brand-primary color, no icon.")

## 7. Out of scope (this hackathon)

To keep design tight, the following are explicitly not part of `design-done`:

- A dark mode toggle. Pick one mode and ship it.
- Multiple themes. One brand, applied consistently.
- Animations beyond a 200 ms fade on toast notifications.
- A custom icon set. Use [Lucide icons](https://lucide.dev) via Tailwind classes if you need any.

---

*DESIGN.md version: hackathon-starter v1*
