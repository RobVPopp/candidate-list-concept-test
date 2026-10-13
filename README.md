# Candidate list: scoring concept test

One static page, three variants chosen by the address. Fictional data, no network calls, no analytics, desktop only.

| Task link | Variant | What the participant sees |
| --- | --- | --- |
| `?v=a` | A: % fit | Percentage plus band ("Excellent fit"). Hovering (or tabbing to) the fit shows an overlay in the style of Trevor's (intro text with confidence, labelled 0–4 levels with bars, weighted-average arithmetic). Clicking a name opens a plain profile panel. Order: by fit. |
| `?v=b` | B: Band and count | Band plus "4 of 5 requirements met". The label comes only from the requirement states ("All requirements met", "Check N unknown", "N not met"). Clicking the count button opens the drawer with Not met / Unknown / Met, a reason for each not met, and no evidence. Same plain profile panel as A. Order: by requirements. |
| `?v=c` | C: Criteria and evidence | Five criteria chips per row (filled ✓ met, outlined ✕ not met, dashed – unknown). A chip or name opens a drawer with the source for each criterion, keyword highlighted between grey bars of CV text, "Ask candidate to confirm" on unknowns, a stepper and "View full profile". Order: by requirements. |

An address with no or an unrecognised `v` shows variant A.

## Shared across all three

- Header "Accountant, Manchester (hybrid) · View job description". The link opens a side panel beside the table (closed by default) with the job description text from the plan.
- Same ten candidates and table columns (name, score display, location, years, current title, last updated).
- "Shortlist" checkbox per row, capped at three (a fourth shows a message). "Done" shows who was shortlisted and the time taken since the page loaded, so the choice can be read from the recording. The page stays usable afterwards for the follow-up questions.
- "View full profile" is a stub ("Not available in this prototype").

## Notes

- Variant A's percentages come from a per-candidate 0–4 distribution whose probability-weighted average level ÷ 4 equals the percentage in the plan (checked for all ten). The distributions and confidence figures are invented; swap in Trevor's if you want an exact match.
- Bands in B: Excellent = 5 met; Strong = 4 met, none failed; Partial = 4 met, one failed; Weak = 3 or fewer met. A: 90+ Excellent, 80–89 Strong, 70–79 Good, below 70 Partial.
- Styling reuses the design system's table, badge pill, checkbox and drawer patterns and Instrument Sans, in greyscale with one blue accent. No logo, nav or Popp colours. The page carries `noindex`.
- Instrument Sans loads from Google Fonts; the page falls back to the system font offline.

Hosted from `docs/` via GitHub Pages.

## Exploration page

`explore.html` stress-tests the three displays at 5, 8 and 10 requirements and sketches configurable requirements (on/off, rename, Must/Nice (explore page only)). Not linked from the test pages.

Each variant shows different invented people (names, towns, employers), so participants can't compare the same candidate across tasks. Ranks, criteria states, fits and the three traps are identical.
