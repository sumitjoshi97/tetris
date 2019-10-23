import { useState, useCallback } from 'react'
import { generateRandomTetromino } from '../utils/tetrominos'
import { STAGE_WIDTH } from '../utils/gameHelper'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: generateRandomTetromino().shape,
    collided: false,
  })

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }))
  }

  const resetPlayer = useCallback(
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2 },
      tetromino: generateRandomTetromino().shape,
      collided: false,
    }),
    []
  )

  return [player, updatePlayerPos, resetPlayer]
}
