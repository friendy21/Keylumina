"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <div
      className="relative rounded-md overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video ref={videoRef} src={src} poster={poster} className="w-full h-auto" onClick={togglePlay} />

      {/* Play button overlay (visible when paused or on hover) */}
      {(!isPlaying || showControls) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={togglePlay}
            className="rounded-full bg-white/30 backdrop-blur-sm p-4 transition-transform duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 text-white" />
            ) : (
              <Play className="h-10 w-10 text-white" fill="white" />
            )}
          </button>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black/50 p-2 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="text-white">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" fill="white" />}
          </button>

          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>

          <button onClick={toggleMute} className="text-white">
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

