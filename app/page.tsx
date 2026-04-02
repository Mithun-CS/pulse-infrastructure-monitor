import type { ReactNode } from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Activity,
  BarChart3,
  Bell,
  ChevronDown,
  Cpu,
  HardDrive,
  LayoutDashboard,
  MemoryStick,
  Search,
  Server,
  Settings,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react"

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

type KPIColor = "cyan" | "green" | "amber"
type Trend = "up" | "down" | "neutral"

function KPICard({
  title,
  value,
  unit,
  percentage,
  trend,
  icon,
  color,
}: {
  title: string
  value: string
  unit: string
  percentage: number
  trend: Trend
  icon: ReactNode
  color: KPIColor
}) {
  const colorStyles: Record<KPIColor, { bar: string; glow: string; ring: string }> = {
    cyan: {
      bar: "from-cyan-400 to-cyan-600",
      glow: "shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)]",
      ring: "ring-cyan-500/20",
    },
    green: {
      bar: "from-emerald-400 to-emerald-600",
      glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.45)]",
      ring: "ring-emerald-500/20",
    },
    amber: {
      bar: "from-amber-400 to-amber-600",
      glow: "shadow-[0_0_24px_-4px_rgba(251,191,36,0.4)]",
      ring: "ring-amber-500/20",
    },
  }
  const c = colorStyles[color]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-sm",
        "ring-1",
        c.ring
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-zinc-50">{value}</span>
            <span className="text-sm text-zinc-500">{unit}</span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300"
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Utilization</span>
          <span className="font-medium tabular-nums text-zinc-300">{percentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              c.bar,
              c.glow
            )}
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs">
        {trend === "up" && (
          <>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
            <span className="text-emerald-400/90">Up from last hour</span>
          </>
        )}
        {trend === "down" && (
          <>
            <TrendingDown className="h-3.5 w-3.5 text-amber-400" aria-hidden />
            <span className="text-amber-400/90">Down from last hour</span>
          </>
        )}
        {trend === "neutral" && (
          <>
            <Activity className="h-3.5 w-3.5 text-zinc-500" aria-hidden />
            <span className="text-zinc-500">Stable vs last hour</span>
          </>
        )}
      </div>
    </div>
  )
}

function DashboardSidebar() {
  const nav = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Servers", icon: Server, active: false },
    { label: "Analytics", icon: BarChart3, active: false },
    { label: "Settings", icon: Settings, active: false },
  ]

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
          <Activity className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-zinc-50">Elite Ops</p>
          <p className="text-[11px] text-zinc-500">Infrastructure</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
              item.active
                ? "bg-zinc-800/80 text-white shadow-sm ring-1 ring-zinc-700/80"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800">
            <User className="h-4 w-4 text-zinc-300" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-200">Admin</p>
            <p className="truncate text-xs text-zinc-500">admin@elite.local</p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />
        </div>
      </div>
    </aside>
  )
}

function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/95 px-6 backdrop-blur-md">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-50">Dashboard</h1>
        <p className="text-xs text-zinc-500">Real-time cluster health &amp; utilization</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search metrics, hosts, alerts…"
            className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-zinc-950" />
        </button>
        <button
          type="button"
          className="hidden h-10 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-300 sm:flex"
        >
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600" />
          <span className="max-w-[100px] truncate">Account</span>
          <ChevronDown className="h-4 w-4 text-zinc-500" />
        </button>
      </div>
    </header>
  )
}

/** Simple area chart — no extra chart library */
function UsageChart() {
  const points = [28, 42, 35, 52, 48, 61, 55, 68, 72, 65, 58, 70, 75, 82, 78, 85, 80, 88, 92, 87]
  const w = 800
  const h = 220
  const pad = { top: 16, right: 16, bottom: 32, left: 44 }
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom
  const max = 100
  const min = 0

  const coords = points.map((v, i) => {
    const x = pad.left + (i / (points.length - 1)) * innerW
    const y = pad.top + innerH - ((v - min) / (max - min)) * innerH
    return { x, y, v }
  })

  const lineD = coords.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")
  const areaD = `${lineD} L ${coords[coords.length - 1]!.x.toFixed(1)} ${(pad.top + innerH).toFixed(1)} L ${coords[0]!.x.toFixed(1)} ${(pad.top + innerH).toFixed(1)} Z`

  const gridYs = [0, 25, 50, 75, 100]

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-sm ring-1 ring-zinc-800/80">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-50">Usage over time</h2>
          <p className="mt-1 text-sm text-zinc-500">Aggregate CPU load — last 24 hours</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-2 text-zinc-400">
            <span className="h-2 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" />
            CPU load
          </span>
          <span className="flex items-center gap-2 text-zinc-500">
            <span className="h-2 w-8 rounded-full bg-zinc-700" />
            Baseline
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-auto min-w-full text-zinc-500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="CPU usage over time chart"
        >
          <defs>
            <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="usageStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(6 182 212)" />
              <stop offset="100%" stopColor="rgb(59 130 246)" />
            </linearGradient>
          </defs>

          {gridYs.map((g) => {
            const y = pad.top + innerH - ((g - min) / (max - min)) * innerH
            return (
              <g key={g}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={w - pad.right}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.12}
                  strokeDasharray="4 6"
                />
                <text x={pad.left - 8} y={y + 4} textAnchor="end" className="fill-zinc-500 text-[11px]">
                  {g}%
                </text>
              </g>
            )
          })}

          <path d={areaD} fill="url(#usageFill)" />
          <path
            d={lineD}
            fill="none"
            stroke="url(#usageStroke)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x={pad.left + innerW / 2}
            y={h - 8}
            textAnchor="middle"
            className="fill-zinc-600 text-[11px]"
          >
            Time →
          </text>
        </svg>
      </div>
    </section>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto bg-gradient-to-b from-zinc-950 to-zinc-900/80 p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <KPICard
                title="CPU Usage"
                value="67.2"
                unit="%"
                percentage={67}
                trend="up"
                icon={<Cpu className="h-5 w-5" aria-hidden />}
                color="cyan"
              />
              <KPICard
                title="Memory"
                value="12.4"
                unit="GB / 16 GB"
                percentage={78}
                trend="neutral"
                icon={<MemoryStick className="h-5 w-5" aria-hidden />}
                color="green"
              />
              <KPICard
                title="Storage"
                value="482"
                unit="GB / 1 TB"
                percentage={48}
                trend="down"
                icon={<HardDrive className="h-5 w-5" aria-hidden />}
                color="amber"
              />
            </div>

            <UsageChart />
          </div>
        </main>
      </div>
    </div>
  )
}
