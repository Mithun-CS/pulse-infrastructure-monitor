import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Vercel builds can fail if we throw during module initialization.
// If env vars are missing, export a harmless stub client.
const missingEnv = !supabaseUrl || !supabaseAnonKey

export const supabase = missingEnv
  ? ({
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
      }),
    } as any)
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })

