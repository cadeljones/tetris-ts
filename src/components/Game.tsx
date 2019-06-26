import React from 'react';

import GameBoard from './GameBoard'


// Define state for Tetris component state
type GameState = {
    // activeTileX: number,
    // activeTileY: number,
    // activeTile: number,
    // tileRotate: number,
    // score: number,
    // level: number,
    // tileCount: number,
    // gameOver: boolean,
    // isPaused: boolean,
    field: any[]
    // timerId: any,
    // tiles: number[][][][]
}


class Game extends React.Component<{}, GameState> {
    constructor(props: any){
        super(props)

        let field = []
        for (let y = 0; y < 30; y++) {
            let row = []
            for (let x = 0; x < 20; x++) {
                row.push(0)
            }
            field.push(row)
        }

        this.state = {
            field: field
        }
    }

    render(){
        return(
          <div className="tetris">
            <GameBoard
              field={this.state.field}
            />
          </div>
        )
      }

}

export default Game