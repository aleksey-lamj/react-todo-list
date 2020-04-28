import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../context/context'
import { searchSvg } from '../../assets/svg/svg'

const Search = () => {
  const [value, setValue] = useState('')
  const {search} = useContext(Context)

  useEffect(() => () => search(''), [])

  const handler = (e) => {
    setValue(e.target.value.trim())
    search(e.target.value.trim())
  }
  return (
    <>
    <form onSubmit={(e) => e.preventDefault()}> 
       <input type="text" onChange={handler} value={value} placeholder="Начните поиск" autoFocus / >
       <button type='button' className="send">{searchSvg}</button>
    </form>
    </>
  )
}

export default Search