import { useEffect } from 'react'

export function useAsyncEffect(effect: () => Promise<any>) {
  useEffect(() => {
    effect().catch(e => console.warn('useAsyncEffect error', e))
  }, [])
}
