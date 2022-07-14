import React from 'react'
import "./style.css";

const Button = ({title, icon, onClick}) => {
  return (
    <div>
      <button 
        onClick={onClick}
      >
        {title}
        {icon}
      </button>
    </div>
  )
}

export default Button
