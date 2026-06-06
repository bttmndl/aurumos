# AurumOS — Gold Refinery Management System (GRMS)

Internal web-based management system for a gold & silver refinery, built with
**React + Vite** and wrapped with **Capacitor** for Android/iOS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Mobile app (Capacitor)

```bash
# one-time, after the first build:
npx cap add android      # and/or: npx cap add ios

# whenever you want to update the app with the latest web build:
npm run cap:sync
npm run cap:android      # opens Android Studio
npm run cap:ios          # opens Xcode (macOS only)
```

> Routing uses **HashRouter** so navigation works correctly inside the
> Capacitor `file://` build. No server-side route config needed.

## Folder structure

```
gold-refinery-management/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── capacitor.config.json
└── src/
    ├── main.jsx                 # entry — mounts HashRouter
    ├── App.jsx                  # route table (one place to add routes)
    ├── index.css                # Tailwind + fonts + CSS variables (theme)
    ├── layouts/
    │   └── MainLayout.jsx        # sidebar + topbar + <Outlet/>
    ├── components/
    │   ├── sidebar/
    │   │   ├── Sidebar.jsx       # the slide-out sidebar
    │   │   ├── navConfig.js      # SINGLE source of truth for menu + paths
    │   │   └── Ingot.jsx         # brand mark
    │   ├── topbar/
    │   │   └── Topbar.jsx
    │   └── ui/
    │       └── Placeholder.jsx   # temporary page shell
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── department/           # Administration, Minting, Lab, Gold/Silver Refinery, Melting
    │   ├── hr/                   # Employee Details, Leave, Attendance, HR Policy, Salary Slip
    │   ├── accounting/           # Lab, Production
    │   ├── processing/           # Metal Processing
    │   ├── electricity/          # Electricity Consumption
    │   ├── dispatch/             # Metal Dispatch
    │   └── vault/                # Production, Lab
    ├── hooks/                    # custom React hooks (empty for now)
    ├── lib/                      # API clients, helpers (empty for now)
    ├── store/                    # state management (empty for now)
    └── assets/                   # images, icons
```

## Adding a new screen

1. Add the item (with a `path`) to `src/components/sidebar/navConfig.js`.
2. Create the page in `src/pages/...`.
3. Register the route in `src/App.jsx`.

The sidebar reads `navConfig.js`, so the menu updates automatically.
