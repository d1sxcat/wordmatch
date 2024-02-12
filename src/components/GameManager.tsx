import { useState, useEffect } from "react"
import { Reorder } from "framer-motion"
import Item from "./Item"
import { useGameContext } from "../hooks/useGameContext"
import type { TDragData } from "../types/types"

export default function GameManager() {
  const { gameData, postScore, postEnd } = useGameContext()
  const [items, setItems] = useState<TDragData[] | null>(null)
  const [ showCorrect, setShowCorrect ] = useState<boolean>(false)

  useEffect(() => {
    if (!gameData) return
    const newArray = gameData.Draggables.map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    setItems(newArray)
  }, [gameData])

  const submitHandler = () => {
    if (!items) return
    items.forEach((item, index) => {
      if (item.correctPosition - 1 === index) {
        postScore(true)
      } else {
        postScore(false)
      }
    })
    setShowCorrect(true)
    setTimeout(() => postEnd(),1000)
  }

  return (
    <main className="w-full h-full flex flex-col justify-center items-center p-4 font-Poppins">
      {items && gameData ? (
        <>
          <div
            style={{
              width: `${gameData.DraggableArea.width ? gameData.DraggableArea.width + "px" : null}`,
              backgroundColor: gameData.DraggableArea.backgroundColour,
              borderStyle: gameData.DraggableArea.border ? "solid" : "none",
              borderWidth: gameData.DraggableArea.borderWidth ? gameData.DraggableArea.borderWidth : 0,
              borderColor: gameData.DraggableArea.borderColour ? gameData.DraggableArea.borderColour : "transparent",
            }}
            className="w-full flex flex-col justify-center gap-2 items-center px-4 py-1 rounded-lg"
          >
            <Reorder.Group axis="y" onReorder={setItems} values={items} className="w-full h-full relative">
              {items.map((item, index) => (
                <Item key={item.correctPosition} number={index + 1} value={item} showCorrect={showCorrect}/>
              ))}
            </Reorder.Group>
          </div>
          {gameData ? (
            <>
              <button
                onClick={submitHandler}
                style={{
                  fontSize: `${gameData.SubmitButton.fontSize}px`,
                  height: `${gameData.SubmitButton.height}px`,
                  width: gameData.SubmitButton.width ? gameData.SubmitButton.width + "px" : "",
                  alignSelf: `${gameData.SubmitButton.location}`,
                  color: gameData.SubmitButton.fontColour,
                  backgroundColor: gameData.SubmitButton.backgroundColour,
                  borderStyle: gameData.SubmitButton.border ? "solid" : "none",
                  borderWidth: gameData.SubmitButton.borderWidth ? gameData.SubmitButton.borderWidth : 0,
                  borderColor: gameData.SubmitButton.borderColour ? gameData.SubmitButton.borderColour : "transparent",
                }}
                className="w-full mt-2 rounded font-semibold hover:brightness-105 active:brightness-95"
              >
                {gameData.SubmitButton.text}
              </button>
              `
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </main>
  )
}
