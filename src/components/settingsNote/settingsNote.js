import React, { useContext, useState, Fragment } from 'react'
import { Context } from '../../context/context'
import { deleteSvg, upSvg, downSvg, pencilSvg } from '../../assets/svg/svg'
import AddNote from '../add-note/add-note'

const SettingNote = ({ id, value, settings }) => {
  const { del, movePosition, changeValue } = useContext(Context)
  const [visible, setVisible] = useState(false)

  const changeNote = (idx) => {
    const idItem = idx
    return (value) => {
      setVisible(false)
      settings({
        active: id,
        visible: false
      })
      changeValue(idItem, value)
    }
  }
  const buttonsControl = () => {
    return (
      <Fragment>
        <button className='settings-btn'
          onClick={() => movePosition(id, -1)}>
          {upSvg}
        </button>

        <button className='settings-btn'
          onClick={() => movePosition(id, 1)}>
          {downSvg}
        </button>

        <button className="settings-btn"
          onClick={() => setVisible(!visible)}>
          {pencilSvg}
        </button>

        <button className="settings-btn"
          onClick={() => del(id)}>
          {deleteSvg}
        </button>
      </Fragment>
    )
  }
  return (
    <div className="settings">

      {visible ? <AddNote  fn={changeNote(id)} 
                  val={value} plch='Изменить задачу' clear autoFcs />  
                : buttonsControl()}
    </div>
  )
}

export default SettingNote