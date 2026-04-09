import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status}: ${text}`)
  }
  return res.json()
}

export function useApi<T = any>(path: string, refreshInterval = 30000) {
  return useSWR<T>(`/api${path}`, fetcher, {
    refreshInterval,
    revalidateOnFocus: false,
    dedupingInterval: 5000,
    errorRetryCount: 3,
    errorRetryInterval: 2000,
    onError: (err) => {
      console.warn(`[HUD] ${path}: ${err.message}`)
    },
  })
}
