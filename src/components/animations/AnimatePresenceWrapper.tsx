import { AnimatePresence } from 'framer-motion'
import React from 'react'

interface IAnimatePresenceWrapperProps {
  isActive: boolean
  children: React.ReactNode
}

function AnimatePresenceWrapper({ isActive, children }: IAnimatePresenceWrapperProps) {
  return (
    <AnimatePresence>
        {isActive && children}
    </AnimatePresence>
  )
}

export default AnimatePresenceWrapper