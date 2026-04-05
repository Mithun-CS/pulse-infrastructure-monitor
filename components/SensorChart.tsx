"use client";

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SensorChart() {
const [data, setData] = useState<any[]>([]);
const [status, setStatus] = useState("Initializing...");
const [mounted, setMounted] = useState(false);

const supabase = createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

useEffect(() => {
setMounted(true);
const fetchData = async () => {
const { data: dbData, error } = await supabase.from('sensors').select('*').order('created_at', { ascending: true });
if (error) setStatus("Error: " + error.message);
else {
setData(dbData || []);
setStatus(dbData && dbData.length > 0 ? "Connected" : "No Data (Check Table Name)");
}
};
fetchData();

const channel = supabase.channel('schema-db-changes')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sensors' },
(payload) => { setData((prev) => [...prev, payload.new].slice(-20)); })
.subscribe();

return () => { supabase.removeChannel(channel); };
}, []);

if (!mounted) return null;

return (
<div className="w-full h-[400px] bg-[#080808] p-4 rounded-2xl border border-white/5 relative">
<div className="absolute top-2 left-4 z-10 text-[10px] text-blue-400 font-mono uppercase tracking-widest opacity-50">
System Status: {status}
</div>
<ResponsiveContainer width="99%" height="100%">
<AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
<defs>
<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
<stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
</linearGradient>
</defs>
<CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
<XAxis dataKey="created_at" hide />
<YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
<Tooltip contentStyle={{ backgroundColor: '#111', border: 'none' }} />
<Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorValue)" animationDuration={1500} />
</AreaChart>
</ResponsiveContainer>
</div>
);
}