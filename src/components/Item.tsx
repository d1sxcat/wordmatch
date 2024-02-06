import { useState } from "react"
import { useMotionValue, Reorder, useMotionValueEvent } from "framer-motion"

export default function Item({ item }: { item: string }) {
  const y = useMotionValue<number>(0)
  const [animating, setAnimating] = useState<boolean>(false)

  useMotionValueEvent(y, "change", () => setAnimating(true))
  useMotionValueEvent(y, "animationComplete", () => setAnimating(false))

  return (
    <Reorder.Item
      value={item}
      id={item}
      style={{ y }}
      whileDrag={{ rotate: 2 }}
      className={`relative flex bg-slate-800 text-slate-100 h-10 cursor-pointer ${animating ? "shadow-lg" : ""}`}
    >
      <span>{item}</span>
    </Reorder.Item>
  )
}
