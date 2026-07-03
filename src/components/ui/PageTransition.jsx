import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('animate-fade-up')
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setTransitionStage('opacity-0')
      prevPath.current = location.pathname

      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setTransitionStage('animate-fade-up')
      }, 200)

      return () => clearTimeout(timeout)
    } else {
      setDisplayChildren(children)
    }
  }, [location.pathname, children])

  return <div className={transitionStage}>{displayChildren}</div>
}
