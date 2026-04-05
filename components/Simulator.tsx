"use client";
import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function Simulator() {
const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

useEffect(() => {
// This runs every 5 seconds
const interval = setInterval(async () => {
const randomValue = Math.floor(Math.random() * (90 - 40 + 1)) + 40;

console.log("🚀 Simulator sending data:", randomValue);

await supabase
.from('sensors')
.insert([{ name: 'CPU', value: randomValue }]);
}, 5000);

return () => clearInterval(interval);
}, [supabase]);

return null; // This stays invisible on your screen
}