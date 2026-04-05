import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SensorChart from '@/components/SensorChart'
import Simulator from '@/components/Simulator'

export default async function Dashboard() {
const cookieStore = await cookies()

// --- AUTH BOUNCER (Security) ---
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

// --- LOGOUT ACTION ---
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

{/* THE SILENT ENGINE: Running the data simulator in the background */}
<Simulator />

{/* --- LEFT SIDEBAR --- */}
<aside className="w-64 border-r border-white/5 bg-[#080808] hidden lg:flex flex-col p-6 sticky top-0 h-screen">
<div className="flex items-center gap-3 mb-10 px-2">
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
<span className="font-black text-white text-xl">M</span>
</div>
<span className="font-bold tracking-tighter text-lg text-white uppercase">Elite-Admin</span>
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
<p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">System Status</p>
<p className="text-xs text-slate-400">Encrypted & Operational</p>
</div>
</div>
</aside>

{/* --- MAIN CONTENT AREA --- */}
<main className="flex-1 min-w-0 overflow-auto relative">

{/* VISUAL OVERLAYS: Adds that high-end glow */}
<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

<div className="p-6 lg:p-10 relative z-10">

{/* HEADER SECTION */}
<header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
<div>
<h2 className="text-3xl font-bold tracking-tighter text-white">System Overview</h2>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time cluster health</p>
</div>

<div className="flex items-center gap-4 w-full md:w-auto">
<div className="flex items-center gap-2 bg-[#0f0f0f] border border-white/5 p-1.5 rounded-2xl pr-4">
<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg flex items-center justify-center font-bold text-xs">
{user.email?.[0].toUpperCase()}
</div>
<div className="hidden sm:block">
<p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">Developer</p>
<p className="text-xs font-bold text-white leading-none truncate max-w-[120px]">{user.email?.split('@')[0]}</p>
</div>
<form action={handleLogout} className="ml-2">
<button className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors">
<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
</button>
</form>
</div>
</div>
</header>

{/* STATS GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

{/* CPU CARD */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-blue-500/20 transition-all group relative overflow-hidden">
<div className="flex justify-between items-start mb-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
<svg width="24" height="24" className="text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2"/></svg>
</div>
<span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded tracking-tighter animate-pulse">LIVE PULSE</span>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">CPU Efficiency</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">85.0 <span className="text-xl text-slate-700">%</span></h3>
<div className="mt-8">
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-blue-500 w-[85%] shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
</div>
</div>
</div>

{/* MEMORY CARD */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-emerald-500/20 transition-all">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 mb-6">
<svg width="24" height="24" className="text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="M4 7h16M4 12h16M4 17h16"/></svg>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Memory Allocation</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">42.0 <span className="text-xl text-slate-700">GB</span></h3>
<div className="mt-8">
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-emerald-500 w-full" />
</div>
</div>
</div>

{/* STORAGE CARD */}
<div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] p-8 hover:border-purple-500/20 transition-all">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 mb-6">
<svg width="24" height="24" className="text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M21 12h-5a2 2 0 0 0 0 4h5"/></svg>
</div>
<p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Cloud Storage</p>
<h3 className="text-5xl font-black text-white mt-2 tracking-tighter">482 <span className="text-xl text-slate-700">GB</span></h3>
<div className="mt-8">
<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
<div className="h-full bg-purple-600 w-[48%]" />
</div>
</div>
</div>
</div>

{/* REAL-TIME PERFORMANCE SECTION */}
<section>
<h2 className="text-xl font-bold mb-6 tracking-tighter text-blue-400 uppercase tracking-widest">Network Throughput</h2>
<div className="p-1 bg-gradient-to-b from-slate-800 to-transparent rounded-[2.5rem]">
<div className="bg-[#080808] rounded-[calc(2.5rem-4px)] p-6 border border-white/5">
<SensorChart />
</div>
</div>
</section>

</div>
</main>
</div>
)
}