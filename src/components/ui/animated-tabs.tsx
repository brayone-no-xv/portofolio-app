import * as React from "react"

import { cn } from "@/lib/utils"

export type AnimatedTab = {
  value: string
  label: string
}

type AnimatedTabsProps = {
  tabs: AnimatedTab[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function AnimatedTabs({
  tabs,
  value,
  onValueChange,
  className,
}: AnimatedTabsProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  const updateIndicator = React.useCallback(() => {
    const container = containerRef.current
    const active = tabRefs.current[value]
    if (!container || !active) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()

    setIndicator({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    })
  }, [value])

  React.useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator, tabs])

  React.useEffect(() => {
    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateIndicator])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1",
        className
      )}
      role="tablist"
      aria-label="Tabs"
    >
      <div
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-white/10 transition-[transform,width] duration-300"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
      />

      {tabs.map((tab) => {
        const active = tab.value === value

        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[tab.value] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange(tab.value)}
            className={cn(
              "relative z-10 inline-flex h-8 items-center justify-center rounded-full px-4 text-xs font-semibold transition-colors",
              active ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
