"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Clear session first to be safe
    await supabase.auth.signOut();
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
    setError(error.message);
    setLoading(false);
    } else {
    // SUCCESS: Hard refresh to the dashboard
    window.location.href = "/";
    }
    };

return (
<div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
<div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
<h1 className="text-2xl font-bold mb-6 text-center text-blue-400">Admin Login</h1>
<form onSubmit={handleLogin} className="space-y-4">
<input
type="email"
placeholder="Email"
className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none"
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none"
onChange={(e) => setPassword(e.target.value)}
required
/>
{error && <p className="text-red-500 text-sm">⚠️ {error}</p>}
<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold disabled:opacity-50"
>
{loading ? "Signing In..." : "Enter Dashboard"}
</button>
</form>
</div>
</div>
);
}