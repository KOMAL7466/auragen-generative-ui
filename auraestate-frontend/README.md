# AuraEstate — React + Vite Frontend

A responsive frontend prototype based on the supplied AuraEstate UI blueprint and logo.

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## Routes

- `/` — landing / home
- `/login` — user/admin sign-in
- `/register` — registration
- `/properties` — property listing + filters
- `/properties/1` — property detail
- `/dashboard` — user dashboard
- `/saved`, `/shortlisted`, `/recently-viewed`, `/enquiries`, `/compare`, `/ai-assistant`, `/profile`
- `/admin-login` — admin login
- `/admin-dashboard`, `/admin-properties`, `/admin-users`, `/admin-cognitive-load`, `/admin-ai-analytics`

## Notes

- Frontend only: no backend or database is required.
- Property data is mocked in `src/services/api.js`.
- The supplied AuraEstate logo is included at `public/aura-logo.jpeg`.
- The AI, cognitive-load, enquiry and admin analytics interactions are simulated for the prototype.
