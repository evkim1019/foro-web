import React, { useEffect, useState } from 'react'
import './Splash.css'

import logoRotateOne from '../img/logo_rotate1.png'
import logoRotateTwo from '../img/logo_rotate2.png'
import logoRotateThree from '../img/logo_rotate3.png'
import logoRotateFour from '../img/logo_rotate4.png'
import logoRotateFive from '../img/logo_rotate5.png'

function Splash() {
  
  // List of the images
  const logoList = [logoRotateOne, logoRotateTwo, logoRotateThree, logoRotateFour, logoRotateFive]
  // Picked number of logo
  const [logoRotate, setLogoRotate] = useState(4);

  useEffect(() => {
    // Rotate between logos
    const interval = setInterval(() => {
      setLogoRotate(Math.round(Math.random() * 4));
    }, 200);
    return () => clearInterval(interval);
    // 
  })

  return (
    <div className="splash">
      <div className="splash__logo">
        <img src={logoList[logoRotate]} alt="foro-logo" />
      </div>
    </div>
  )
}

export default Splash