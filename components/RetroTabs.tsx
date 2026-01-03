"use client"

import { useState, ReactNode } from "react"

export interface Tab {
  id: string
  label: string
  content: ReactNode
  badge?: number | string
}

interface RetroTabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function RetroTabs({ tabs, defaultTab }: RetroTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wide
                transition-all relative
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-black"
                    : "bg-muted text-muted-foreground border-muted-foreground/30 hover:border-primary/50"
                }
              `}
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                boxShadow: isActive ? "3px 3px 0 0 rgba(0,0,0,1)" : "2px 2px 0 0 rgba(0,0,0,0.3)",
              }}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-black text-primary" : "bg-primary text-black"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTabContent}
      </div>
    </div>
  )
}
