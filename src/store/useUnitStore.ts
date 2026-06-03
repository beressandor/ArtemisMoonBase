import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import type { UnitSystem } from "@/lib/types";

interface UnitState {
  unitSystem: UnitSystem;
  hasHydrated: boolean;
  hydrateUnitSystem: () => Promise<void>;
  setUnitSystem: (unitSystem: UnitSystem) => void;
}

const STORAGE_KEY = "artemis-moon-base-unit-system";

const isUnitSystem = (value: string | null): value is UnitSystem => value === "metric" || value === "imperial";

const readStoredUnitSystem = async (): Promise<UnitSystem | null> => {
  try {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return isUnitSystem(value) ? value : null;
    }

    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return isUnitSystem(value) ? value : null;
  } catch {
    return null;
  }
};

const writeStoredUnitSystem = async (unitSystem: UnitSystem): Promise<void> => {
  try {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, unitSystem);
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, unitSystem);
  } catch {
    // Persistence is a convenience; the app should still render if storage is unavailable.
  }
};

export const useUnitStore = create<UnitState>((set, get) => ({
  unitSystem: "metric",
  hasHydrated: false,
  hydrateUnitSystem: async () => {
    if (get().hasHydrated) {
      return;
    }

    const storedUnitSystem = await readStoredUnitSystem();
    set((state) => ({
      hasHydrated: true,
      unitSystem: storedUnitSystem ?? state.unitSystem
    }));
  },
  setUnitSystem: (unitSystem) => {
    set({ unitSystem });
    void writeStoredUnitSystem(unitSystem);
  }
}));

void useUnitStore.getState().hydrateUnitSystem();
