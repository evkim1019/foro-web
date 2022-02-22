import React, { useEffect, useState } from 'react'

import './Confetti.css'

import confettiOne from '../../img/confetti.png'
import confettiTwo from '../../img/confetti2.png'
import confettiThree from '../../img/confetti3.png'
import confettiFour from '../../img/confetti4.png'

function Confetti() {

  // List of the images
  const confettiList = [confettiOne, confettiTwo, confettiThree, confettiFour]
  // Picked number of confetti
  const [confettiRotate, setConfettiRotate] = useState(3);

  useEffect(() => {
    // Rotate between confetties
    const interval = setInterval(() => {
      setConfettiRotate(Math.round(Math.random() * 3));
    }, 100);
    return () => clearInterval(interval);
  })




  return (
    <div className="confetti">
      <img src={confettiList[confettiRotate]} alt="" />
    </div>
  )
}

export default Confetti