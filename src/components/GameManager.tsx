import { useState } from "react"
import { Reorder } from "framer-motion"
import Item from "./Item"

const initialItems = ["Item One", "Item Two", "Item Three", "Item Four"]

export default function GameManager() {
  const [items, setItems] = useState(initialItems)

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items} className="flex flex-col gap-2">
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  )
}
