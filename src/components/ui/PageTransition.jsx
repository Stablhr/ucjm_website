import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [stage, setStage] = useState('enter')
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setStage('exit')
      prevPath.current = location.pathname

      const t1 = setTimeout(() => {
        setDisplayChildren(children)
        setStage('enter')
      }, 250)

      return () => clearTimeout(t1)
    } else {
      setDisplayChildren(children)
      setStage('enter')
    }
  }, [location.pathname, children])

  return (
    <div
      className={`transition-all duration-500 ease-apple will-change-transform ${
        stage === 'exit' ? 'opacity-0 blur-sm scale-[0.98]' : 'opacity-1 blur-0 scale-100'
      }`}
    >
      {displayChildren}
    </div>
  )
}
