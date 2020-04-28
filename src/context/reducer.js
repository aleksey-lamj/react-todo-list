const localHandler = (state, { id, prop }) => {
  const idx = state.list.findIndex(el => el.id === id)
  state.list[idx][prop] = !state.list[idx][prop]
  return {
    ...state
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case 'del':
      return {
        ...state,
        list: state.list.filter(el => el.id !== action.payload)
      }

    case 'important':
      return localHandler(state, action.payload)

    case 'done':
      return localHandler(state, action.payload)

    case 'search':
      return {
        ...state,
        search: action.payload
      }

    case 'move':
      const { id, num } = action.payload
      return {
        ...state,
        list: moveNote(state.list, { id, num })
      }
    case 'change':
      const idx = state.list.findIndex(el => el.id === action.payload.id)
      state.list[idx].value = action.payload.value
      return {
        ...state
      }
    default:
      return state
  }
}
function moveNote(state, { id, num }) {
  const arr = JSON.parse(JSON.stringify(state))
  const idx = arr.findIndex(el => el.id === id)

  if (idx + num < 0) {
    return state
  } else {
      arr.splice(idx, 1)
      arr.splice(idx + num, 0, state[idx])
      return arr
  }
}