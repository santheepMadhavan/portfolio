import { createContext, useContext } from 'react'

export const DevContext = createContext({ dev: false, toggle: () => {} })

export const useDev = () => useContext(DevContext)
