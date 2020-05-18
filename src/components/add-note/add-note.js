import React, { useState } from 'react'
import { sendSvg } from '../../assets/svg/svg'

const AddNote = ({ fn, val = '', plch = '', clear = false, autoFcs = false }) => {
  const [value, setValue] = useState(val)

  const sumbitHandler = e => {
    e.preventDefault()
    if (!!value.trim()) {
      console.log('va', value)
      if (!clear) {
        setValue('')
      }
      fn(value)
    }
  }
  return (
    <>
      <form onSubmit={sumbitHandler}>
        <input type="text"
          onChange={e => setValue(e.target.value)} value={value}
          placeholder={plch} autoFocus={autoFcs}/>
        <button type="submit" className="send">{sendSvg}</button>
      </form>
    </>
  )
}

export default AddNote