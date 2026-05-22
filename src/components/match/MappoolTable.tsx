import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { poolConfig, rowStyle } from "@/lib/mappool"
import type { PoolMap } from "@/types"

function statusBadge(map: PoolMap): React.ReactNode {
  if (map.status === "banned")      return <span className="text-xs text-muted-foreground line-through">Banned · {map.bannedBy}</span>
  if (map.status === "in-progress") return <span className="text-xs font-semibold text-primary">In Progress</span>
  if (map.status === "completed")   return <span className="text-xs text-muted-foreground">Won by {map.winner}</span>
  if (map.status === "picked")    return <span className="text-xs text-muted-foreground">Picked · {map.pickedBy}</span>
  if (map.status === "protected") return <span className="text-xs text-[#6f8ea5]">Protected</span>
  return null
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <tr key={i} className="border-b border-border/40">
          <td className="px-3 py-2.5"><Skeleton className="h-3 w-8" /></td>
          <td className="px-3 py-2.5"><Skeleton className="h-3" style={{ width: `${45 + (i % 5) * 10}%` }} /></td>
          <td className="px-3 py-2.5"><Skeleton className="h-3 w-16" /></td>
        </tr>
      ))}
    </>
  )
}

interface Props {
  mappool?: PoolMap[]
  onRowClick?: (map: PoolMap) => void
}

export function MappoolTable({ mappool, onRowClick }: Props) {
  const loading = mappool === undefined
  const played  = mappool?.filter((m) => m.status === "completed").length ?? 0
  const banned  = mappool?.filter((m) => m.status === "banned").length ?? 0

  return (
    <main className="flex h-full flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-border bg-card/40 px-4 py-2">
        <span className="font-heading text-xs uppercase tracking-[0.16em] text-muted-foreground">Mappool</span>
        <Badge variant="outline" className="text-xs">Picks / Bans</Badge>
        <span className="ml-auto text-xs text-muted-foreground">
          {loading ? "Loading…" : `${played} played · ${banned} banned`}
        </span>
      </div>

      {/* Map rows */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-card/90 backdrop-blur-sm">
            <tr className="border-b border-border">
              <th className="w-14 px-3 py-2 text-left font-heading text-xs uppercase tracking-[0.16em] text-muted-foreground">Slot</th>
              <th className="px-3 py-2 text-left font-heading text-xs uppercase tracking-[0.16em] text-muted-foreground">Map</th>
              <th className="w-48 px-3 py-2 text-left font-heading text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <SkeletonRows /> : mappool.map((map) => (
              <tr
                key={map.slot}
                style={rowStyle(map)}
                tabIndex={0}
                className="cursor-pointer border-b border-border/40 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
                onClick={() => onRowClick?.(map)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onRowClick?.(map) }}
              >
                <td className="px-3 py-2.5">
                  <span className="font-heading text-sm font-bold" style={{ color: (poolConfig(map.pool) ?? poolConfig("NM"))?.hex ?? "#957259" }}>
                    {map.slot}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className={map.status === "banned" ? "line-through" : ""}>{map.map}</span>
                </td>
                <td className="px-3 py-2.5">{statusBadge(map)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
