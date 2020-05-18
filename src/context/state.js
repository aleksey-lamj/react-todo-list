import React, { useReducer } from 'react'

import { Context } from "./context"
import { reducer } from './reducer'

const TodoState = ({ children }) => {
  const initialState = {
    search: '',
    list: [
      {
        id: 1517812272074,
        value: 'Создать собственный список дел',
        important: false,
        done: true
      },
      {
        id: 1529912272074,
        value: 'Погладить кота',
        important: false,
        done: false
      },
      {
        id: 1587912272073,
        value: 'Сходить в магазин',
        important: true,
        done: false
      }
    ]
  }
  const localState = JSON.parse(localStorage.getItem('list'))
  if (localState) {
    initialState.list = localState
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const add = (value) => {
    const note = {
      id: Date.now(),
      value,
      important: false,
      done: false
    }
    dispatch({ type: 'add', payload: note })
  }
  const del = id => dispatch({ type: 'del', payload: id })
  const search = value => dispatch({ type: 'search', payload: value })
  const importantOrDone = (id, prop) => dispatch({ type: prop, payload: { id, prop } })
  const movePosition = (id, num) => dispatch({ type: 'move', payload: { id, num } })

  const changeValue = (id, value) => dispatch({ type: 'change', payload: { id, value } })

  return (
    <Context.Provider value={{
      add,
      del,
      search,
      importantOrDone,
      movePosition,
      changeValue,
      list: state.list,
      searchNote: state.search
    }}>
      {children}
    </Context.Provider>
  )
}
export default TodoState