export type TDragData = {
    text?:string
    width:number
    height:number
    img?:string
    correctPosition:number
    fontSize: number
    backgroundColour: string
    fontColour: string
    border:boolean
    borderColour?:string
    borderWidth?:number
}

export type TDragArea = {
    width?:number
    backgroundColour: string
    border:boolean
    borderColour?:string
    borderWidth?:number
}

enum location {
    'start',
    'center',
    'end'
}

export type TSubmitButton = {
    text:string
    width?:number
    height:number
    location: location
    fontSize: number
    backgroundColour: string
    fontColour: string
    border:boolean
    borderColour?:string
    borderWidth?:number
}

export type TGameData = {
    Draggables:TDragData[]
    SubmitButton: TSubmitButton
    DraggableArea: TDragArea
}

export type TGameEvent = {
    type: string
    message: TGameData
}