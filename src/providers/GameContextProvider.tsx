import { createContext, useState, PropsWithChildren, useRef } from 'react'
import { TGameData } from '../types/types'

type GameProvider = {
    gameData:TGameData | null
    setGameData: React.Dispatch<React.SetStateAction<TGameData | null>>
    messagePort: React.MutableRefObject<MessagePort | null>
}

export const GameDataContext = createContext<GameProvider | null>(null)

export const GameDataProvider:React.FC<PropsWithChildren> = ({
    children
  }) => {

    const [gameData, setGameData] = useState<TGameData | null>(null)
    const messagePort = useRef<MessagePort | null>(null)
    
    return (
      <GameDataContext.Provider value={{gameData, setGameData, messagePort}}>
        {children}
      </GameDataContext.Provider>
    )
  }