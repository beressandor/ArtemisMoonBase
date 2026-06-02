import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";

export type Language = "en" | "hu";

interface LanguageState {
  language: Language;
  hasHydrated: boolean;
  hydrateLanguage: () => Promise<void>;
  setLanguage: (language: Language) => void;
}

const STORAGE_KEY = "artemis-moon-base-language";

const isLanguage = (value: string | null): value is Language => value === "en" || value === "hu";

const readStoredLanguage = async (): Promise<Language | null> => {
  try {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return isLanguage(value) ? value : null;
    }

    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return isLanguage(value) ? value : null;
  } catch {
    return null;
  }
};

const writeStoredLanguage = async (language: Language): Promise<void> => {
  try {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Persistence is a convenience; the app should still render if storage is unavailable.
  }
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "en",
  hasHydrated: false,
  hydrateLanguage: async () => {
    if (get().hasHydrated) {
      return;
    }

    const storedLanguage = await readStoredLanguage();
    set((state) => ({
      hasHydrated: true,
      language: storedLanguage ?? state.language
    }));
  },
  setLanguage: (language) => {
    set({ language });
    void writeStoredLanguage(language);
  }
}));

void useLanguageStore.getState().hydrateLanguage();
