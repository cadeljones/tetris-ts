import React from 'react';

import GameBoard from './GameBoard'
import TileHold from './TileHold'


// Define state for Tetris component state
type GameState = {
    field: any[],
    boardHeight: number,
    boardWidth: number
}


class Game extends React.Component<{}, GameState> {
    constructor(props: any){
        super(props)

        let HEIGHT: number = 20
        let WIDTH: number = 10

        let field = []
        for (let y = 0; y < HEIGHT; y++) {
            let row = []
            for (let x = 0; x < WIDTH; x++) {
                row.push(0)
            }
            field.push(row)
        }

        this.state = {
            field: field,
            boardHeight: HEIGHT,
            boardWidth: WIDTH
        }
    }

    render(){
        return(
          <div>

          <div className="tetris">
            <GameBoard
              field={this.state.field}
              boardHeight={this.state.boardHeight}
              boardWidth={this.state.boardWidth}
            />
          <div>
          <h1>Controls</h1>
          <img src="./tetris-controls.png"/>
          </div>
          </div>
          </div>
        )
      }

}

export default Game