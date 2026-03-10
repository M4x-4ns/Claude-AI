'use client'

import useSWR from 'swr'
import { useAppStore } from '@/store'
import type { SensorData } from '@/lib/types'

const fetcher = async (url: string): Promise<SensorData> => {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) throw new Error('Sensor fetch failed')
  return res.json()
}

export function useSensor() {
  const {
    esp32Url,
    pollInterval,
    useManual,
    manualTemp,
    manualHumidity,
    setSensorData,
    setSensorOnline,
    sensorData,
    sensorOnline,
  } = useAppStore()

  // If manual mode, skip SWR entirely
  const swrKey = !useManual && esp32Url ? `${esp32Url}/sensor` : null

  const { error } = useSWR(swrKey, fetcher, {
    refreshInterval: pollInterval * 1000,
    revalidateOnFocus: true,
    onSuccess: (data) => {
      setSensorData(data)
      setSensorOnline(true)
    },
    onError: () => {
      setSensorOnline(false)
    },
  })

  // Return manual values if in manual mode
  if (useManual) {
    return {
      temperature: manualTemp,
      humidity: manualHumidity,
      online: false,
      isManual: true,
    }
  }

  return {
    temperature: sensorData?.temperature ?? null,
    humidity:    sensorData?.humidity    ?? null,
    online:      sensorOnline && !error,
    isManual:    false,
  }
}
