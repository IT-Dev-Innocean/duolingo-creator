import { motion } from 'motion/react'
import type { PropsWithChildren } from 'react'

type BlurFadeProps = PropsWithChildren<{
  delay?: number
  className?: string
}>

export function BlurFade({ children, delay = 0, className }: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 16 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
