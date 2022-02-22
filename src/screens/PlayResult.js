import React from 'react'
import './PlayResult.css'

function PlayResult() {
  const yourResult = [1, 2, 1, 1, 1, 2, 1, 2, 1, 2]
  return (
    <div className="playResult">
      <div className="playResult__hero">
        <h1>Yeahee!</h1>
        <p>asdf</p>
      </div>

      <div className="playResult__yourChoices">
        <p>Your Choices VS Public</p>
        <div className="playResult__yourChoicesContentWrapper">
          {yourResult.map((choice, index) => (
            <div className="playResult__yourChoice">
              40%
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayResult