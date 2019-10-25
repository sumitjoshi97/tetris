import { useState, useCallback } from 'react'
import { generateRandomTetromino } from '../utils/tetrominos'
import { STAGE_WIDTH, checkCollision } from '../utils/gameHelper'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: generateRandomTetromino().shape,
    collided: false,
  })

  const rotate = (matrix, dir) => {
    const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]))

    if (dir > 0) {
      return rotatedTetro.map(row => row.reverse())
    }
    return rotatedTetro.reverse()
  }

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

    const pos = clonedPlayer.pos.x
    let offset = 1
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir)
        clonedPlayer.pos.x = pos
        return
      }
    }
    setPlayer(clonedPlayer)
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: generateRandomTetromino().shape,
      collided: false,
    })
  }, [])

  return [player, updatePlayerPos, playerRotate, resetPlayer]
}
