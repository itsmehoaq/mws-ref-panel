import { Button } from "@/components/ui/button"
import { INGREDIENTS } from "@/data/constants"
import type { Inventory } from "@/types"

function WinBoxes({ score, needed }: { score: number; needed: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: needed }).map((_, i) => (
        <div
          key={i}
          className={`h-3 w-3 rounded-sm border ${i < score ? "border-primary bg-primary" : "border-border bg-transparent"}`}
        />
      ))}
    </div>
  )
}

function IngredientBar({ inv }: { inv: Inventory }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
      {INGREDIENTS.map(({ key, name, hex }) => (
        <div key={key} className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: hex }} />
          <span className="text-xs text-muted-foreground">{name}</span>
          <span className="text-xs font-semibold tabular-nums" style={{ color: hex }}>×{inv[key]}</span>
        </div>
      ))}
    </div>
  )
}

interface Props {
  playerA: string
  playerB: string
  scoreA: number
  scoreB: number
  bestOf: number
  invA: Inventory
  invB: Inventory
  round: string
  refName: string
  streamer?: string
}

export function PlayerColumn({ playerA, playerB, scoreA, scoreB, bestOf, invA, invB, round, refName, streamer }: Props) {
  const winsNeeded = Math.ceil(bestOf / 2)
  return (
    <aside className="flex w-52 flex-shrink-0 flex-col border-r border-border">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Player A */}
        <div className="space-y-2 border-b border-border p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-sm font-semibold">{playerA}</span>
            <span className="font-heading text-3xl leading-none">{scoreA}</span>
          </div>
          <WinBoxes score={scoreA} needed={winsNeeded} />
          <IngredientBar inv={invA} />
        </div>

        <div className="flex items-center justify-center py-2">
          <span className="font-accent text-sm text-muted-foreground">vs</span>
        </div>

        {/* Player B */}
        <div className="space-y-2 border-b border-border p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-sm font-semibold">{playerB}</span>
            <span className="font-heading text-3xl leading-none">{scoreB}</span>
          </div>
          <WinBoxes score={scoreB} needed={winsNeeded} />
          <IngredientBar inv={invB} />
        </div>

        {/* Match meta */}
        <div className="space-y-1.5 p-4 text-xs text-muted-foreground">
          <p><span className="font-medium text-foreground">Format</span> Bo{bestOf}</p>
          <p><span className="font-medium text-foreground">Round</span> {round}</p>
          <p><span className="font-medium text-foreground">Ref</span> {refName}</p>
          {streamer && <p><span className="font-medium text-foreground">Streamer</span> {streamer}</p>}
        </div>

        {/* Pool legend */}
        <div className="border-t border-border p-4">
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Ingredient key</p>
          {INGREDIENTS.map(({ name, pool, hex }) => (
            <div key={name} className="flex items-center gap-2 py-0.5">
              <span className="inline-block h-2 w-2 rounded-sm flex-shrink-0" style={{ backgroundColor: hex }} />
              <span className="text-xs text-muted-foreground">{name} = {pool} win</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lobby manage — pinned to bottom */}
      <div className="flex-shrink-0 border-t border-border p-4 space-y-1.5">
        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Lobby</p>
        <Button size="sm" variant="outline" className="w-full text-xs">Create lobby</Button>
        <Button size="sm" variant="outline" className="w-full text-xs">Join existing lobby</Button>
        <Button size="sm" variant="outline" className="w-full text-xs">Post match result</Button>
        <Button size="sm" variant="destructive" className="w-full text-xs">Close lobby</Button>
      </div>
    </aside>
  )
}
