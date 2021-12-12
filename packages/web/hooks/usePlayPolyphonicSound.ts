import { useCallback, useMemo, useRef } from 'react'

const usePlayPolyphonicSound = (sampleUrl: string, voiceCount: number) => {
  if (typeof Audio === 'undefined') return () => {}

  const sampleIndex = useRef(0)

  const voices = useMemo(() => {
    return new Array(voiceCount).fill(null).map(() => new Audio(sampleUrl))
  }, [sampleUrl, voiceCount])

  const playSound = useCallback(() => {
    const voice = voices[sampleIndex.current++ % voiceCount]
    // Always rewind audio to beginning before playing
    // This enables rapid replays even if the file was still playing
    voice.currentTime = 0
    voice.play()
  }, [voices])

  return playSound
}

export default usePlayPolyphonicSound
