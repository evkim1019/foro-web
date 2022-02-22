import React, { useState } from 'react'

import './InPlayHeader.css'

function InPlayHeader(props) {

  return (
    <div className="inPlayHeader">
      { props.count <= 10 ? (
        <div className="inPlayHeader__slideCount">
          {props.count} / 10
        </div>
      ) : (
        <div className="inPlayHeader__slideCount">
          10 / 10
        </div>
      )}
      

      { props.count <= 10 ? (
        <div className="inPlayHeader__timer">
          00:{props.timeLeft}
        </div>
      ) : (
        <div className="inPlayHeader__timer">
          Result
        </div>
      )}
      

      <div className="inPlayHeader__share">
        SHARE
      </div>
    </div>
  )
}

export default InPlayHeader