import { useState } from "react"
import { useMotionValue, Reorder, useMotionValueEvent } from "framer-motion"
import { DragHandleSVG } from "./svgs"
import type { TDragData } from "../types/types"

export default function Item({ number, value, showCorrect }: { number: number; value: TDragData, showCorrect:boolean }) {
  const y = useMotionValue<number>(0)
  const [animating, setAnimating] = useState<boolean>(false)

  useMotionValueEvent(y, "change", () => setAnimating(true))
  useMotionValueEvent(y, "animationComplete", () => setAnimating(false))

  return (
    <Reorder.Item
      value={value}
      style={{ y }}
      whileDrag={{ rotate: 1.5 }}
      className="relative mb-3 first:mt-3 cursor-grab active:cursor-grabbing select-none w-full"
    >
      <div style={{ height: value.height, borderStyle: showCorrect ? 'solid' : 'none', borderWidth:'3px', borderColor: number===value.correctPosition ? 'green' : 'red' }} className={`w-full rounded-xl`}>
        <div
          style={{
            backgroundImage: value.img ? `url(${value.img})` : "none",
            backgroundColor: value.backgroundColour,
            borderStyle: value.border ? "solid" : "none",
            borderWidth: value.borderWidth ? value.borderWidth : 0,
            borderColor: value.borderColour ? value.borderColour : "transparent",
          }}
          className={`rounded-lg flex items-center justify-between h-full gap-8 px-6 py-2 bg-center bg-cover ${
            animating ? "shadow-xl" : "shadow"
          }`}
        >
          <span style={{ color: value.fontColour }} className="shrink-0 text-2xl font-semibold w-8 text-center drop-shadow-md">
            {number}
          </span>
          {value.text ? (
            <div className="flex justify-center items-center h-full">
              <p style={{ fontSize: value.fontSize, color: value.fontColour }} className="line-clamp-2 drop-shadow-md">
                {value.text}
              </p>
            </div>
          ) : (
            <></>
          )}
          <DragHandleSVG style={{ fill: value.fontColour }} className="shrink-0 h-auto w-8 py-4 drop-shadow-md" />
        </div>
      </div>
    </Reorder.Item>
  )
}
