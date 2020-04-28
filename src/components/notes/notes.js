import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/context'
import { star, successSvg, dotsSvg } from '../../assets/svg/svg'
import SettingNote from '../settingsNote/settingsNote'


const Notes = ({ filter }) => {
  const { list, searchNote, importantOrDone } = useContext(Context)
  const [settings, setSettings] = useState({
    active: 1529912272074,
    visible: true
  })
  useEffect(() => {
    setSettings((state) => {
      return {
        ...state,
        visible: true
      }
    })
  }, [settings.active])
  const createList = () => {
    let arr = list.slice()
    const handlerImpOrDone = (prop) => arr.filter(el => el[prop])
    switch (filter) {
      case 'search':
        searchNote ? arr = arr.filter(el => el.value.toLowerCase().indexOf(searchNote.toLowerCase()) > -1)
          : arr = list.slice()
        break;
      case 'important':
        arr = handlerImpOrDone(filter)
        if (!arr.length) return <span className="alert">У вас нету важных дел</span>
        break;
      case 'done':
        arr = handlerImpOrDone(filter)
        if (!arr.length) return <span className="alert">У вас нету выполненных задач</span>
        break;
      default:
        arr = list.slice()
        break;
    }
    localStorage.setItem('list', JSON.stringify(list))
    if (!arr.length) return <span className="alert">По вашему запросу ничего не найдено</span>


    return (
      arr.map(el => (
        <li key={el.id} className={settings.active === el.id && settings.visible ? 'settings' : ''}>

          <InputHandler id={el.id} prop='done'
            element={successSvg} fn={importantOrDone}
            startValue={el.done} />

          {settings.active === el.id && settings.visible
            ?
            <SettingNote id={el.id} value={el.value} settings={setSettings} />
            :
            <div className='note-value'>
              <span className={el.done ? 'note-done' : null}> {el.value} </span>
            </div>}

          <InputHandler id={el.id} prop='important'
            element={star} fn={importantOrDone}
            startValue={el.important} />

          <Clock id={el.id} />

          <div className={`dots-menu ${settings.visible && settings.active === el.id ? 'active' : ''}`}
            onClick={() => setSettings({ active: el.id, visible: !settings.visible })}>
            {dotsSvg}
          </div>

        </li>
      ))
    )
  }

  return (
    <div className="list-wrapper">
      <ul>
        {createList()}
      </ul>
    </div>
  )
}
const Clock = ({ id }) => {
  const time = new Date(id)
  const validateClock = (num) => num < 10 ? '0' + num : num

  const year = time.getFullYear().toString().slice(-2)
  const month = validateClock(time.getMonth() + 1)
  const day = validateClock(time.getDate())
  const hour = validateClock(time.getHours())
  const minutes = validateClock(time.getMinutes())

  return (
    <div className="clock">
      <span className="date">{`${day}.${month}.${year}`}</span>
      <span className='time'>{`${hour}:${minutes}`}</span>
    </div>
  )
}

const InputHandler = ({ id, prop, fn, element, startValue }) => {
  const [value, setValue] = useState(startValue)
  const handler = e => {
    setValue(e.target.type === 'checkbox' ? e.target.checked : e.target.value)
    fn(id, prop)
  }

  return (
    <>
      <label htmlFor={prop + id} className={`${prop} ${value ? 'active' : ''}`} >
        {element ? element : null}
        <input type="checkbox" id={prop + id} onChange={handler} checked={value} hidden />
      </label>
    </>
  )
}

export default Notes