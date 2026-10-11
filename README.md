# Kreativ Founder Klub

Kreativ Founder Klub er et konceptuelt medlemsunivers designet og udviklet som portfolio-projekt. Appen demonstrerer et komplet brugerflow med kontooprettelse, Zod-validering, Supabase Auth, e-mailbekræftelse, et beskyttet dashboard og en offentlig realtime-chat.

Projektet er en teknisk demo — ikke et aktivt medlemskab eller et færdigt community-produkt.

## Det demonstrerer projektet

- Oprettelse af bruger med e-mail og adgangskode
- Feltvalidering og konkrete fejlbeskeder med Zod
- Profiloplysninger gemt som Supabase Auth-metadata
- E-mailbekræftelse og redirect tilbage til appen
- Login, logout og session-håndtering med cookies
- Beskyttet dashboard med servervalideret bruger
- Offentlig chatdemo med PostgreSQL og Supabase Realtime
- Row Level Security på chat-tabellen
- Responsivt interface udviklet med Tailwind CSS

## Min rolle

**End-to-end produktdesign og frontendudvikling** — fra koncept, UX/UI og visuel identitet til implementering, integration og færdigt brugerflow.

Projektet er udviklet AI-assisteret og agentisk. Jeg har omsat behov til konkrete opgaver og kvalitetssikret resultatet gennem kodegennemgang, test og debugging.

## Teknologier

- [Next.js 16](https://nextjs.org/) med App Router
- [React 19](https://react.dev/)
- TypeScript
- [Supabase](https://supabase.com/) Auth, PostgreSQL og Realtime
- [Zod](https://zod.dev/) til validering
- [Tailwind CSS 4](https://tailwindcss.com/)

## Lokal opsætning

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

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` er beregnet til browseren. Sikkerheden håndhæves med Auth og Row Level Security. Tilføj aldrig en `service_role`-nøgle eller en `sb_secret_...`-nøgle til klientkode eller en variabel, der begynder med `NEXT_PUBLIC_`.

`.env.local` er ignoreret af Git og må ikke committes.

### 4. Opret chat-tabellen

Kør SQL-filen [`supabase/migrations/20261011160000_create_demo_messages.sql`](supabase/migrations/20261011160000_create_demo_messages.sql) i Supabase SQL Editor.

Migrationen:

- opretter tabellen `demo_messages`
- aktiverer Row Level Security
- tillader offentlig læsning og indsættelse af korte demobeskeder
- begrænser navn og beskedlængde i databasen
- tilføjer tabellen til Supabase Realtime

Chatten er bevidst offentlig, så besøgende kan afprøve funktionen uden en konto. Den bør have rate limiting og strengere adgangskontrol, før samme mønster bruges i et produktionscommunity.

### 5. Konfigurer Supabase Auth

I Supabase-dashboardet:

1. Gå til **Authentication → Sign In / Providers**.
2. Kontrollér, at **Email** og **Allow new users to sign up** er aktiveret.
3. Aktivér **Confirm email**, hvis brugerne skal bekræfte deres adresse.
4. Tilføj appens URL og `/auth/confirm` under **Authentication → URL Configuration**.

Supabases indbyggede mailtjeneste er beregnet til udvikling og test. Opsæt egen SMTP, før appen bruges i produktion.

### 6. Start udviklingsserveren

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000). Hvis port 3000 allerede bruges, vælger Next.js automatisk en anden port.

## Ruter

| Rute | Beskrivelse |
| --- | --- |
| `/` | Forside og offentlig chatdemo |
| `/signup` | Opret konto og profiloplysninger |
| `/login` | Log ind |
| `/auth/confirm` | Håndterer bekræftelseslink fra Supabase |
| `/dashboard` | Beskyttet medlemsområde |

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
│   ├── auth/confirm/       # E-mailbekræftelse
│   ├── components/         # Formularer, chat og fælles UI
│   ├── dashboard/          # Beskyttet medlemsområde
│   ├── login/              # Login-side
│   └── signup/             # Kontooprettelse
├── lib/
│   ├── supabase/           # Browser-, server- og session-klienter
│   └── validation.ts       # Zod-schemaer
└── proxy.ts                # Opdaterer Supabase-sessionen

supabase/
└── migrations/             # Databaseændringer og RLS-politikker
```

## Test brugerflowet

1. Opret en bruger på `/signup`.
2. Kontrollér, at ugyldige felter giver Zod-fejl.
3. Bekræft adressen via e-mailen fra Supabase.
4. Kontrollér brugeren under **Authentication → Users**.
5. Log ind og kontrollér, at `/dashboard` åbner.
6. Log ud og kontrollér, at dashboardet igen kræver login.
7. Åbn forsiden i to faner og kontrollér, at nye chatbeskeder vises realtime.

## Deployment

Ved deployment på eksempelvis Netlify skal de samme to miljøvariabler tilføjes til hostingmiljøet. Produktionsdomænet og den fulde callback-URL skal samtidig tilføjes til Supabase Auth:

```text
https://dit-domæne.dk
https://dit-domæne.dk/auth/confirm
```

Kør `npm run build` før deployment for at kontrollere TypeScript og produktions-buildet.

## Licens

Projektet er en offentlig portfolio-case og har endnu ikke en open source-licens. Kode og visuelt materiale må derfor ikke genbruges uden tilladelse.
