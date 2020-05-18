import React, { useRef, useEffect, useState, useContext } from 'react'
import { Context } from '../../context/context'


const InfoNotes = () => {

  const [svg, setSvg] = useState()
  const [options, setOptions] = useState()
  const [anim, setAnim] = useState(0)
  const { list } = useContext(Context)
  useEffect(() => {
    if (svg) {
      const listLength = list.length
      const doneLength = list.filter(el => el.done).length
      setOptions({
        totalLength: svg.getTotalLength(),
        all: listLength,
        done: doneLength,
        important: list.filter(el => el.important).length
      })
      for (let i = 1; i <= Math.floor(100 / listLength * doneLength); i++) {
        setTimeout(() => {
          setAnim(Math.floor(i))
        }, 500 * i / 35);
      }
    }
  }, [svg, list])

  return (
    <div className='info-wrapper'>
      <div className='info'>
        <span>Всего задач {options && options.all}</span>
        <span>Выполненных {options && options.done}</span>
        <span>Важных      {options && options.important}</span>
      </div>
      <div className="progress-wrap">
      <span className="progress">{options ? anim + '%' : '0%'}</span>
      <Circle fn={el => setSvg(el.current)} opt={options} />
      </div>
    </div>
  )
}
const Circle = ({ fn, opt }) => {
  const ctx = useRef()
  const [style, setStyle] = useState()

  useEffect(() => {
    fn(ctx)
  }, [])
  useEffect(() => {
    if (opt) {
      const max = opt.totalLength
      const success = max / opt.all * opt.done

      for (let i = 1; i <= success; i++) {
        setTimeout(() => {
          setStyle({
            line: i,
            rest: Math.floor(max) - i
          })
        }, 100 * i / 30);
      }
    }
  }, [opt])


  return (
    <svg width='160' height='160' viewBox='0 0 160 160' className='svg-wrap' >
      <circle cx='80' cy='80' r='70' strokeWidth='5' stroke='#bdc3c7' fill="transparent" strokeOpacity='0.3'  />

      <circle className='progress-circle' ref={ctx} cx='80' cy='80' r='70' strokeWidth='5' stroke='#26de81' fill="transparent"
      strokeLinecap={'round'} 
      strokeDasharray={style ? `${String(style.line)} ${String(style.rest)}` : '0 420'} />
    </svg>
  )
}
export default InfoNotes