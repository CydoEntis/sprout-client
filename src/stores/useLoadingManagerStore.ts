import { create } from "zustand";

export type LoadingState = {
  skeletonCounts: Record<string, number>;
  setNumOfSkeletons: (categoryName: string, numOfSkeletons: number) => void;
  resetSkeletons: () => void;
};

const useLoadingManagerStore = create<LoadingState>((set) => ({
  skeletonCounts: {},
  setNumOfSkeletons: (categoryName: string, numOfSkeletons: number) => {
    set((state) => ({
      skeletonCounts: {
        ...state.skeletonCounts,
        [categoryName]: numOfSkeletons,
      },
    }));
  },
  resetSkeletons: () => set({ skeletonCounts: {} }),
}));

export default useLoadingManagerStore;
