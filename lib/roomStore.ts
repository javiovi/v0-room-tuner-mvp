// app/lib/roomStore.ts
"use client"

import { create } from "zustand"
import type { RoomProject, RoomGoal } from "@/types/room"

export interface RecommendationBlock {
  title: string
  items: string[]
}

export interface AnalyzeRoomResponse {
  summary: string
  roomCharacter: "viva" | "equilibrada" | "seca"
  freeChanges: RecommendationBlock
  lowBudgetChanges: RecommendationBlock
  advancedChanges: RecommendationBlock
}

interface RoomState {
  project: RoomProject
  analysis: AnalyzeRoomResponse | null

  setGoal: (goal: RoomGoal) => void
  updateProject: (partial: Partial<RoomProject>) => void
  setAnalysis: (analysis: AnalyzeRoomResponse) => void
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
