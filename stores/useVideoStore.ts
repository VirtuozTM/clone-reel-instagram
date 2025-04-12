import { create } from "zustand";

type VideoStore = {
  visibleVideoIndex: number | null;
  setVisibleVideoIndex: (index: number | null) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  visibleVideoIndex: null,
  setVisibleVideoIndex: (index) => set({ visibleVideoIndex: index }),
  isPaused: false,
  setIsPaused: (paused) => set({ isPaused: paused }),
}));
