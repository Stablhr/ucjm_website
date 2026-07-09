import { Ripples } from 'ldrs/react'

export default function Loader({ size = 45, speed = 2, color = '#0066cc' }) {
  return <Ripples size={Number(size)} speed={Number(speed)} color={color} />
}
