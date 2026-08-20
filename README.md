# Kreativ Founder Klub

En Next.js-app, der demonstrerer et komplet login-flow med Supabase Auth. Brugere kan oprette en konto, bekræfte deres e-mail, logge ind, besøge et beskyttet dashboard og logge ud igen.

## Funktioner

- Oprettelse af bruger med e-mail og adgangskode
- E-mailbekræftelse via Supabase Auth
- Login og logout
- Beskyttet dashboard
- Session-håndtering med cookies
- Responsiv header, footer og auth-sider

## Teknologier

- [Next.js 16](https://nextjs.org/) med App Router
- [React 19](https://react.dev/)
- [Supabase](https://supabase.com/) til authentication
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript

## Kom godt i gang

### 1. Klon projektet

```bash
git clone https://github.com/Katrinerosa/kreativ_founder-klub.git
cd kreativ_founder-klub
```

### 2. Installer dependencies

```bash
npm install
```

### 3. Tilføj miljøvariabler

Opret en `.env.local` i projektets rod:

```env
NEXT_PUBLIC_SUPABASE_URL=din_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=din_supabase_publishable_key
```

Værdierne findes i Supabase under **Connect → API Keys**.

> `.env.local` er ignoreret af Git og må ikke committes. Tilføj aldrig en `service_role`-nøgle til klientkode.

### 4. Konfigurer Supabase Auth

I Supabase-dashboardet:

1. Gå til **Authentication → Sign In / Providers**.
2. Kontrollér, at **Email** og **Allow new users to sign up** er aktiveret.
3. Aktivér **Confirm email**, hvis brugerne skal bekræfte deres adresse.
4. Tilføj appens URL under **Authentication → URL Configuration**.

Supabases indbyggede mailtjeneste er kun beregnet til udvikling. Opsæt egen SMTP under **Authentication → Emails → SMTP Settings**, før appen bruges i produktion.

### 5. Start udviklingsserveren

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000). Hvis port 3000 allerede bruges, vælger Next.js automatisk en anden port, eksempelvis 3001.

## Ruter

| Rute | Beskrivelse |
| --- | --- |
| `/` | Forside |
| `/signup` | Opret en konto |
| `/login` | Log ind |
| `/dashboard` | Beskyttet side for brugere med en aktiv session |

## Scripts

```bash
npm run dev     # Start udviklingsserveren
npm run build   # Opret et produktions-build
npm run start   # Start produktionsserveren
npm run lint    # Kør ESLint
```

## Projektstruktur

```text
src/
├── app/
│   ├── components/       # Formularer og fælles layout
│   ├── dashboard/        # Beskyttet dashboard
│   ├── login/            # Login-side
│   └── signup/           # Signup-side
├── lib/supabase/         # Browser-, server- og session-klienter
└── proxy.ts              # Opdaterer Supabase-sessionen
```

## Test af login-flowet

1. Åbn `/signup` og opret en bruger.
2. Bekræft adressen via e-mailen fra Supabase.
3. Kontrollér brugeren under **Authentication → Users**.
4. Log ind på `/login`.
5. Kontrollér, at `/dashboard` åbner.
6. Log ud og kontrollér, at dashboardet igen kræver login.

## Licens

Projektet er privat og har endnu ikke en offentlig licens.
