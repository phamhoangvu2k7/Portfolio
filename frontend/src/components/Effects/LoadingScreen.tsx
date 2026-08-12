import { useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [lottieDone, setLottieDone] = useState(false)

  useEffect(() => {
    // Smooth progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = Math.floor(Math.random() * 8) + 4
        return Math.min(prev + increment, 100)
      })
    }, 45)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100 && lottieDone) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          onComplete()
        }, 800)
      }, 400)
      return () => clearTimeout(exitTimer)
    }
  }, [progress, lottieDone, onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="loading-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Ambient Loader Glow */}
          <div className="loader-glow-orb" />

          {/* Lottie Container with Neon Pulsing Border */}
          <div className="loader-lottie-box">
            <Player
              src={`${import.meta.env.BASE_URL}Hello.json`}
              background="transparent"
              speed={1.5}
              style={{ width: '320px', height: '320px' }}
              autoplay
              keepLastFrame
              onEvent={(event) => {
                if (event === 'complete') {
                  setLottieDone(true)
                }
              }}
            />
          </div>

          {/* Counter Progress Number */}
          <div className="loader-status-container">
            <div className="loader-percentage">
              <span className="number">{progress}</span>
              <span className="percent-sign">%</span>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div className="loader-bar-outer">
              <motion.div
                className="loader-bar-inner"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Status Text */}
            <div className="loader-status-text">
              {progress < 40 && 'INITIALIZING CORE ENGINE...'}
              {progress >= 40 && progress < 80 && 'LOADING VISUAL ASSETS...'}
              {progress >= 80 && progress < 100 && 'ESTABLISHING QUANTUM LINK...'}
              {progress === 100 && 'SYSTEM ONLINE'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
