import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GrinderId, Bean, Grinder, SensorData } from '@/lib/types'

interface AppState {
  // Grinder selection
  selectedGrinderId: GrinderId
  setSelectedGrinderId: (id: GrinderId) => void

  // Bean selection
  selectedBeanId: string | null
  setSelectedBeanId: (id: string | null) => void

  // Sensor data (latest reading)
  sensorData: SensorData | null
  setSensorData: (data: SensorData | null) => void
  sensorOnline: boolean
  setSensorOnline: (online: boolean) => void

  // Manual sensor override
  manualTemp: number
  manualHumidity: number
  useManual: boolean
  setManualTemp: (v: number) => void
  setManualHumidity: (v: number) => void
  setUseManual: (v: boolean) => void

  // ESP32 config (persisted locally)
  esp32Url: string
  setEsp32Url: (url: string) => void
  pollInterval: number
  setPollInterval: (seconds: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedGrinderId: 'A',
      setSelectedGrinderId: (id) => set({ selectedGrinderId: id }),

      selectedBeanId: null,
      setSelectedBeanId: (id) => set({ selectedBeanId: id }),

      sensorData: null,
      setSensorData: (data) => set({ sensorData: data }),
      sensorOnline: false,
      setSensorOnline: (online) => set({ sensorOnline: online }),

      manualTemp: 25,
      manualHumidity: 70,
      useManual: false,
      setManualTemp: (v) => set({ manualTemp: v }),
      setManualHumidity: (v) => set({ manualHumidity: v }),
      setUseManual: (v) => set({ useManual: v }),

      esp32Url: '',
      setEsp32Url: (url) => set({ esp32Url: url }),
      pollInterval: 30,
      setPollInterval: (seconds) => set({ pollInterval: seconds }),
    }),
    {
      name: 'grindiq-storage',
      // Only persist config — not runtime sensor data
      partialize: (state) => ({
        selectedGrinderId: state.selectedGrinderId,
        selectedBeanId:    state.selectedBeanId,
        manualTemp:        state.manualTemp,
        manualHumidity:    state.manualHumidity,
        useManual:         state.useManual,
        esp32Url:          state.esp32Url,
        pollInterval:      state.pollInterval,
      }),
    }
  )
)
