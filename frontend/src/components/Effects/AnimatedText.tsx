import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  el?: keyof React.JSX.IntrinsicElements
  className?: string
  once?: boolean
  delay?: number
  staggerDuration?: number
  gradient?: boolean
  style?: React.CSSProperties
}

export default function AnimatedText({
  text,
  el: Wrapper = 'h1',
  className = '',
  once = true,
  delay = 0,
  staggerDuration = 0.05,
  gradient = false,
  style = {},
}: AnimatedTextProps) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <Wrapper
      className={`animated-text-wrapper ${gradient ? 'gradient-text' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '0.28em',
        width: 'auto',
        maxWidth: '100%',
        ...style,
      }}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        variants={containerVariants}
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '0.28em',
          width: 'auto',
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  )
}
