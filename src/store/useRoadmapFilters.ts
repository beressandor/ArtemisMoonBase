import { create } from "zustand";
import { defaultRoadmapFilters } from "@/lib/timeline";
import type { RoadmapFilters } from "@/lib/types";

interface RoadmapFilterState {
  filters: RoadmapFilters;
  setFilter: <Key extends keyof RoadmapFilters>(key: Key, value: RoadmapFilters[Key]) => void;
  reset: () => void;
}

export const useRoadmapFilters = create<RoadmapFilterState>((set) => ({
  filters: defaultRoadmapFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    })),
  reset: () => set({ filters: defaultRoadmapFilters })
}));
