import React from 'react'
import './Preloader.css'

const Preloader = ({ isOn }) => {
  return (
    <div className={`preloader ${isOn && 'preloader_acitve'}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
