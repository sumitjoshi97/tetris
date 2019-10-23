import React, { useState } from 'react'

import { createStage } from '../utils/gameHelper'

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

//Custom hooks
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

// Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player] = usePlayer()
  const [stage, setStage] = useStage(player)

  console.log('re-render')

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 })
  }

  const startGame = () => {
    setStage(createStage())
    resetPlayer()
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keycode }) => {
    if (!gameOver) {
      if (keycode === 37) {
        movePlayer(-1)
      } else if (keycode === 39) {
        movePlayer(1)
      } else if (keycode === 40) {
        dropPlayer()
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Columns" />
            </div>
          )}
        </aside>
      </StyledTetris>
      <StartButton onClick={e => e} />
    </StyledTetrisWrapper>
  )
}
