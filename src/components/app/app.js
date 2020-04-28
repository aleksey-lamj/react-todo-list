import React, { useState, useContext } from 'react'
import '../../scss/main.scss'
import AddNote from '../add-note/add-note'
import Notes from '../notes/notes'
import Search from '../search/search'
import Menu from '../menu/menu'
import { Context } from '../../context/context'
import InfoNotes from '../infoNotes/infoNotes'


const App = () => {
  const [form, setForm] = useState('info')
  const { add } = useContext(Context)
  const filterForm = () => form === 'search' ? <Search />
                                             : <AddNote fn={add} plch='Добавить задачу' />

  const filterNotes = () => form === 'info' ? <InfoNotes /> : <Notes filter={form} />

  return (
    <div className="container">
      {filterForm()}
      <Menu filterForm={setForm} />

      {filterNotes()}
    </div>
  )
}
export default App