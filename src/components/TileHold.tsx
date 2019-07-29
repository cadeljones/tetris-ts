import React from 'react';

import { TETRIS_TILES } from '../constants/index'

type TileHoldProps = {
    tileOnHold: number

}

type TileHoldState = {
    field: number[][],
    rows: number[],
    // field: any[],
    // rows: any[],
    tiles: number[][][][],

    holdHeight: number
    holdWidth: number


    timerId: any,
}

class TileHold extends React.Component<TileHoldProps, TileHoldState> {
    constructor(props: any) {
        super(props)
        let holdHeight: number = 4
        let holdWidth: number = 4

        let field = []
        for (let y = 0; y < holdHeight; y++) {
            let row = []
            for (let x = 0; x < holdWidth; x++) {
                row.push(0)
            }
            field.push(row)
        }

        // Create board rows
        let rows: any[] = []

        field.forEach((row: any, index: any) => {
            // Create board columns
            const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)
            rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
        })


        this.state = {
            field: field,
            rows: rows,
            tiles: TETRIS_TILES,
            holdHeight:holdHeight,
            holdWidth:holdWidth,


            timerId: null,
        }

        this.updateRows = this.updateRows.bind(this)
    }

    componentDidMount() {
    
        let timerId
    
        timerId = setInterval(
          () => this.updateRows(),
          1000
        );
    
        this.setState({
          timerId: timerId
        })
      }
    
      componentWillUnmount() {
        window.clearInterval(this.state.timerId)
      }

    updateRows() {
        let x = 1
        let y = 1
        let field: any = []
        let tiles = this.state.tiles
        
        // let field = []
        for (let y = 0; y < this.state.holdHeight; y++) {
            let row = []
            for (let x = 0; x < this.state.holdWidth; x++) {
                row.push(0)
            }
            field.push(row)
        }
        
        let tile = this.props.tileOnHold
        if (!tile){tile = 0}

        field[y + tiles[tile][0][0][1]][x + tiles[tile][0][0][0]] = tile
        field[y + tiles[tile][0][1][1]][x + tiles[tile][0][1][0]] = tile
        field[y + tiles[tile][0][2][1]][x + tiles[tile][0][2][0]] = tile
        field[y + tiles[tile][0][3][1]][x + tiles[tile][0][3][0]] = tile
        let rows: any[] = []
    
        field.forEach((row: any, index: any) => {
          // Create board columns
          const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)
    
          rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
        })
        this.setState({
          rows: rows
        })
      }

    render() {
        return (
            <div className="tetris-board">

                {/* Hold board */}
                <div className="tetris-board__board">{this.state.rows}</div>
            </div>
        )
    }

}

export default TileHold