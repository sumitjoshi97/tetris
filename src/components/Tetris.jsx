import React from 'react'

import createStage from '../utils/gameHelper'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

export default function Tetris() {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Columns" />
      </aside>
      <StartButton />
    </div>
  )
}
