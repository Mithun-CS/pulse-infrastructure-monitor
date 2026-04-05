import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SensorChart from '@/components/SensorChart'

export default async function Dashboard() {
const cookieStore = await cookies()

// --- AUTH BOUNCER (The Brain) ---
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() { return cookieStore.getAll() },
setAll(cookiesToSet) {
cookiesToSet.forEach(({ name, value, options }) =>
cookieStore.set(name, value, options)
)
},
},
}
)

const { data: { user } } = await supabase.auth.getUser()
if (!user) redirect('/login')

async function handleLogout() {
'use server'
const cookieStore = await cookies()
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() { return cookieStore.getAll() },
setAll(cookiesToSet) {
cookiesToSet.forEach(({ name, value, options }) =>
cookieStore.set(name, value, options)
)
},
},
}
)
await supabase.auth.signOut()
redirect('/login')
}

return (
<div className="flex min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">

{/* --- LEFT SIDEBAR (The Elite Navigator) --- */}
<aside className="w-64 border-r border-white/5 bg-[#080808] hidden lg:flex flex-col p-6 sticky top-0 h-screen">
<div className="flex items-center gap-3 mb-10 px-2">
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
<span className="font-black text-white text-xl">M</span>
</div>
<span className="font-bold tracking-tighter text-lg text-white">MY-ELITE-APP</span>
</div>

<nav className="flex-1 space-y-1">
{['Dashboard', 'Sensors', 'Analytics', 'Nodes', 'Settings'].map((item) => (
<button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${item === 'Dashboard' ? 'bg-white/5 text-white border border-white/10 shadow-xl' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>
{item}
</button>
))}
</nav>

<div className="mt-auto pt-6 border-t border-white/5">
<div className="bg-gradient-to-br from-blue-600/10 to-transparent p-4 rounded-2xl border border-blue-500/10">
<p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Status</p>
<p className="text-xs text-slate-400">All systems operational and secured.</p>
</div>
</div>
</aside>

{/* --- MAIN CONTENT AREA --- */}
<main className="flex-1 min-w-0 overflow-auto relative">

{/* GLOW OVERLAYS */}
<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

<div className="p-6 lg:p-10 relative z-10">

{/* HEADER SECTON */}
<header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
<div>
<h2 className="text-3xl font-bold tracking-tighter text-white">Dashboard</h2>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Cluster health & utilization</p>
</div>

<div className="flex items-center gap-4 w-full md:w-auto">
<div className="relative flex-1 md:w-64">
<svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
<input type="text" placeholder="Search insights..." className="w-full bg-[#0f0f0f] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-blue-500/50 outline-none transition-all" />
</div>

<div className="flex items-center gap-2 bg-[#0f0f0f] border border-white/5 p-1.5 rounded-2xl pr-4">
<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg flex items-center justify-center font-bold text-xs">CS</div>
<div className="hidden sm:block">
<p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">Admin</p>
<p className="text-xs font-bold text-white leading-none truncate max-w-[100px]">{user.email?.split('@')[0]}</p>
</div>
<form action={handleLogout} className="ml-2">
<button className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors">
<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
</button>
</form>
</div>
</div>
</header>

{/* THE COMPLEX GRID (The Stats You Loved) */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

{/* CPU USAGE */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-blue-500/20 transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
<svg width="24" height="24" className="text-slate-400 group-hover:text-blue-400 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2"/></svg>
</div>
<span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded tracking-tighter">LIVE</span>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">CPU Usage</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">85.0 <span className="text-xl text-slate-700">%</span></h3>
<div className="mt-8">
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-blue-500 w-[85%] shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
</div>
<div className="flex justify-between mt-3">
<span className="text-[10px] text-emerald-400 font-bold">↑ 12% from last hour</span>
<span className="text-[10px] text-slate-600 font-bold italic">LOAD: HEAVY</span>
</div>
</div>
</div>

{/* MEMORY (Exactly like the photo) */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/20 transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-emerald-600/10 transition-all">
<svg width="24" height="24" className="text-slate-400 group-hover:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="M4 7h16M4 12h16M4 17h16"/></svg>
</div>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Memory</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">42.0 <span className="text-xl text-slate-700">GB / 16 GB</span></h3>
<div className="mt-8">
<div className="flex justify-between text-[10px] font-black mb-2 text-slate-500 uppercase tracking-widest">
<span>Utilization</span>
<span className="text-white">100%</span>
</div>
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 w-full shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
</div>
<p className="text-[10px] text-slate-500 mt-4 font-bold flex items-center gap-2">
<svg className="animate-pulse text-emerald-500" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
STABLE VS LAST HOUR
</p>
</div>
</div>

{/* STORAGE */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-purple-500/20 transition-all group">
<div className="flex justify-between items-start mb-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-purple-600/10 transition-all">
<svg width="24" height="24" className="text-slate-400 group-hover:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 12h-5a2 2 0 0 0 0 4h5"/></svg>
</div>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Storage</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">482 <span className="text-xl text-slate-700">GB / 1 TB</span></h3>
<div className="mt-8">
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-purple-600 w-[48%]" />
</div>
<div className="flex justify-between mt-3 text-[10px] font-bold uppercase text-slate-600">
<span>NVME 01</span>
<span>48.2% FULL</span>
</div>
</div>
</div>

</div>

<div className="mt-10">
<h2 className="text-xl font-bold mb-6 tracking-tighter text-blue-400">Real-time Performance</h2>
<div className="p-1 bg-gradient-to-b from-slate-800 to-transparent rounded-[2.5rem]">
<div className="bg-[#080808] rounded-[calc(2.5rem-4px)] p-6 border border-white/5">
<SensorChart />
</div>
</div>
</div>

</div>
</main>
</div>
)
}
