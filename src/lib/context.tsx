import React, { ReactNode, useContext } from 'react'

import { BaraTouchableContext, touchableContext } from './exports/Touchable'
import { BaraViewContext, viewContext } from './exports/View'
import { BaraTextContext, textContext } from './exports/Text'

export interface BaraComponentsState {
  touchable: BaraTouchableContext
  view: BaraViewContext
  text: BaraTextContext
}

export interface BaraState {
  components: BaraComponentsState
}

const baraState: BaraState = {
  components: {
    touchable: touchableContext,
    view: viewContext,
    text: textContext
  },
}

export const BaraProvider = (props: { children: ReactNode }) => {
  return (
    <BaraContext.Provider value={baraState}>
      {props.children}
    </BaraContext.Provider>
  )
}

const dummy = (...args: any[]) => undefined

export const BaraContext = React.createContext<BaraState>(baraState)

export const BaraConsumer = BaraContext.Consumer

export const useBaraContext = (): BaraState => {
  return useContext(BaraContext)
}