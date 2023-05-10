import { create } from 'zustand'

const useMapStore = create((set) => ({
  map: {},
  setMap: (obj: Object) => set((state: any) => ({map: obj })),
}))

export default useMapStore;