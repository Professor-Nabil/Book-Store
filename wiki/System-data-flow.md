# How It Actually Works Under the Hood

Look at how clean your system data flow is now.
Both your HTML frontend
and your JSON endpoints
share the exact same core business logic:

```text
                  ┌─────────────────────────┐
                  │   services.ts           │
                  │   (Core Business Logic) │
                  └────────────┬────────────┘
                               │
         ┌─────────────────────┴─────────────────────┐
         ▼                                           ▼
┌──────────────────┐                       ┌────────────────────┐
│  controller.ts   │                       │   view.route.ts    │
│  (JSON API Layer)│                       │   (HTMX/EJS Layer) │
└────────┬─────────┘                       └────────┬───────────┘
         │                                          │
         ▼                                          ▼
  Returns Clean JSON                         Returns Clean HTML
 (For Tests, Mobile, React)                (For Swift Browser UI)
```
