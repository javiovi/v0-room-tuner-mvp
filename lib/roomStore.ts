// app/lib/roomStore.ts
"use client"

import { create } from "zustand"
import type { RoomProject, RoomGoal, EnhancedAnalysisResponse } from "@/app/types/room"

interface RoomState {
  project: RoomProject
  analysis: EnhancedAnalysisResponse | null

  setGoal: (goal: RoomGoal) => void
  updateProject: (partial: Partial<RoomProject>) => void
  setAnalysis: (analysis: EnhancedAnalysisResponse) => void
  reset: () => void
}

export const useRoomStore = create<RoomState>((set) => ({
  project: {
    goal: null,
  },
  analysis: null,

  setGoal: (goal) =>
    set((state) => ({
      project: { ...state.project, goal },
    })),

  updateProject: (partial) =>
    set((state) => ({
      project: { ...state.project, ...partial },
    })),

  setAnalysis: (analysis) => set({ analysis }),

  reset: () =>
    set({
      project: { goal: null },
      analysis: null,
    }),
}))
