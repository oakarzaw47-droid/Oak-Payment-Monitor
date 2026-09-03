# Oak Payment Monitor

Payment submission + admin approval MVP for KBZ Pay, Wave Money and AYA Pay.

## Run
`npm install`
`npm run dev`

## Production data layer
The first version works immediately with browser localStorage. `lib/supabase.ts` is included as the integration point for Supabase. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` when moving to shared cloud storage.

### Important
A customer receipt or Transaction ID is **not proof of a completed bank-wallet transfer** by itself. For automatic verification, connect the official merchant/API/webhook provided by each payment provider.

Admin should be protected with real authentication before production use.
