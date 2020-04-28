import React from 'react'
import {searchSvg, listSvg, star, doneSvg, infoSvg } from '../../assets/svg/svg'
const Menu = ({ filterForm }) => {
  const menu = [
    {
      img: listSvg,
      filter: 'add'
    },
    {
      img: doneSvg,
      filter: 'done'
    },
    {
      img: star,
      filter: 'important'
    },
    {
      img: infoSvg,
      filter: 'info'
    },
    {
      img: searchSvg,
      filter: 'search'
    }
  ]

  return (
    <nav className="todo-menu">
      {menu.map((el, i) => (
        <button key={1 + i}
          onClick={() => {
            filterForm(el.filter)
          }}>
          {el.img}
        </button>
      ))}
    </nav>
  )
}
export default Menu