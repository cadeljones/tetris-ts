import React from 'react';

type GameControlsProps = {

}

type GameControlsState = {

}

class GameControls extends React.Component<GameControlsProps, GameControlsState> {

}

export default GameControls
// import { TETRIS_TILES } from '../constants/index'
// const tiles = TETRIS_TILES
// export function validMove(prevTile: object, newTile: object, field:any[]){
//     // TODO: Assert Tiles are valid. Type them?

//     // Remove previous location
//     field[prevTile["y"] + tiles[prevTile[tile][prevTile[rotation]][0][1]][prev_x + tiles[tile][prev_rotation][0][0]] = 0

//     field[prev_y + tiles[tile][prev_rotation][1][1]][prev_x + tiles[tile][prev_rotation][1][0]] = 0
//     field[prev_y + tiles[tile][prev_rotation][2][1]][prev_x + tiles[tile][prev_rotation][2][0]] = 0
//     field[prev_y + tiles[tile][prev_rotation][3][1]][prev_x + tiles[tile][prev_rotation][3][0]] = 0

//     // Test if the move can be executed on actual field
//     let xAddIsValid = true
//     // Test if tile should move horizontally
//     if (x !== prev_x) {
//       for (let i = 0; i <= 3; i++) {
//         // Test if tile can be moved without getting outside the board
//         if (
//           x + tiles[tile][prev_rotation][i][0] >= 0
//           && x + tiles[tile][prev_rotation][i][0] < this.state.boardWidth
//         ) {
//           if (field[prev_y + tiles[tile][prev_rotation][i][1]][x + tiles[tile][prev_rotation][i][0]] !== 0) {
//             // Prevent the move
//             xAddIsValid = false
//           }
//         } else {
//           // Prevent the move
//           xAddIsValid = false
//         }
//       }
//     }
//     // If horizontal move is valid update x variable (move the tile)
//     if (!xAddIsValid) {
//       x = prev_x
//     }

//     // Try to rotate the tile
//     let rotateIsValid = true
//     // Test if tile should rotate
//     if (rotation !== prev_rotation) {
//       for (let i = 0; i <= 3; i++) {
//         // Test if tile can be rotated without getting outside the board
//         if (
//           prev_x + tiles[tile][rotation][i][0] >= 0 &&
//           prev_x + tiles[tile][rotation][i][0] < this.state.boardWidth &&
//           prev_y + tiles[tile][rotation][i][1] >= 0 &&
//           prev_y + tiles[tile][rotation][i][1] < this.state.boardHeight
//         ) {
//           // Test of tile rotation is not blocked by other tiles
//           if (
//             field[prev_y + tiles[tile][rotation][i][1]][
//             prev_x + tiles[tile][rotation][i][0]
//             ] !== 0
//           ) {
//             // Prevent rotation
//             rotateIsValid = false
//           }
//         } else {
//           // Prevent rotation
//           rotateIsValid = false
//         }
//       }
//     }
//     // If rotation is valid update rotate variable (rotate the tile)
//     if (!rotateIsValid) {
//       rotation = prev_rotation
//     }

//     // Try to speed up the fall of the tile
//     let yAddIsValid = true
//     // Test if tile should fall faster
//     if (y !== prev_y) {
//       for (let i = 0; i <= 3; i++) {
//         // Test if tile can fall faster without getting outside the board
//         if (
//           y + tiles[tile][prev_rotation][i][1] >= 0 &&
//           y + tiles[tile][prev_rotation][i][1] < this.state.boardHeight
//         ) {
//           // Test if faster fall is not blocked by other tiles
//           if (
//             field[y + tiles[tile][prev_rotation][i][1]][
//             prev_x + tiles[tile][prev_rotation][i][0]
//             ] !== 0
//           ) {
//             // Prevent faster fall
//             yAddIsValid = false
//           }
//         } else {
//           // Prevent faster fall
//           yAddIsValid = false
//         }
//       }
//     }
//     // If speeding up the fall is valid (move the tile down faster)
//     if (!yAddIsValid) {
//       y = prev_y
//     }

// }
