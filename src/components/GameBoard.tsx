///
// src/components/tetris-board.tsx

// Import React
import * as React from 'react'

// Define props for TetrisBoard component
type GameBoardProps = {
  field: any[],
}

type GameBoardState = {
    field: any[],
    rows: any[],
    activeTile: number,
    activeX: number,
    activeY: number,
    tiles: number[][][][],
    rotation: number,
    timerId: any,
  }

class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
    constructor(props: any){
        super(props)

        // Create board rows
        let rows: any[] = []

        props.field.forEach((row: any, index: any) => {
            // Create board columns
            const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)

            rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
        })


        this.state = {
            field: props.field,
            rows: rows,
            activeTile: 3,
            activeX: 2,
            activeY: 1,
            rotation: 0,
            timerId: null,


            tiles: [
                // 7 tiles
                // Each tile can be rotated 4 times (x/y coordinates)
                [
                  // The default square
                  [[0, 0], [0, 0], [0, 0], [0, 0]],
                  [[0, 0], [0, 0], [0, 0], [0, 0]],
                  [[0, 0], [0, 0], [0, 0], [0, 0]],
                  [[0, 0], [0, 0], [0, 0], [0, 0]]
                ],
                [
                  // The cube tile (block 2x2)
                  [[0, 0], [1, 0], [0, 1], [1, 1]],
                  [[0, 0], [1, 0], [0, 1], [1, 1]],
                  [[0, 0], [1, 0], [0, 1], [1, 1]],
                  [[0, 0], [1, 0], [0, 1], [1, 1]]
                ],
                [
                  // The I tile
                  [[0, -1], [0, 0], [0, 1], [0, 2]],
                  [[-1, 0], [0, 0], [1, 0], [2, 0]],
                  [[0, -1], [0, 0], [0, 1], [0, 2]],
                  [[-1, 0], [0, 0], [1, 0], [2, 0]]
                ],
                [
                  // The T tile
                  [[0, 0], [-1, 0], [1, 0], [0, -1]],
                  [[0, 0], [1, 0], [0, 1], [0, -1]],
                  [[0, 0], [-1, 0], [1, 0], [0, 1]],
                  [[0, 0], [-1, 0], [0, 1], [0, -1]]
                ],
                [
                  // The inverse L tile
                  [[0, 0], [-1, 0], [1, 0], [-1, -1]],
                  [[0, 0], [0, 1], [0, -1], [1, -1]],
                  [[0, 0], [1, 0], [-1, 0], [1, 1]],
                  [[0, 0], [0, 1], [0, -1], [-1, 1]]
                ],
                [
                  // The L tile
                  [[0, 0], [1, 0], [-1, 0], [1, -1]],
                  [[0, 0], [0, 1], [0, -1], [1, 1]],
                  [[0, 0], [1, 0], [-1, 0], [-1, 1]],
                  [[0, 0], [0, 1], [0, -1], [-1, -1]]
                ],
                [
                  // The Z tile
                  [[0, 0], [1, 0], [0, -1], [-1, -1]],
                  [[0, 0], [1, 0], [0, 1], [1, -1]],
                  [[0, 0], [1, 0], [0, -1], [-1, -1]],
                  [[0, 0], [1, 0], [0, 1], [1, -1]]
                ],
                [
                  // The inverse Z tile
                  [[0, 0], [-1, 0], [0, -1], [1, -1]],
                  [[0, 0], [0, -1], [1, 0], [1, 1]],
                  [[0, 0], [-1, 0], [0, -1], [1, -1]],
                  [[0, 0], [0, -1], [1, 0], [1, 1]]
                ]
              ]

        }

        this.renderTile = this.renderTile.bind(this)
        this.rotateTile = this.rotateTile.bind(this)
        this.tileDown = this.tileDown.bind(this)
        this.tileDirection = this.tileDirection.bind(this)
        this.updateRows = this.updateRows.bind(this)
        this.keyPressWatch = this.keyPressWatch.bind(this)
        this.tileUpdate = this.tileUpdate.bind(this)


    }

    keyPressWatch(event:any){
      if(event.keyCode === 37) {
        this.tileDirection("left")
      }
      if(event.keyCode === 39) {
        this.tileDirection("right")
      }
      if(event.keyCode === 40) {
        this.tileDown()
      }
      if(event.keyCode === 32) {
        this.rotateTile()
      }
    }


    componentDidMount() {
      document.addEventListener("keydown", this.keyPressWatch, false);


      let timerId
  
      timerId =  setInterval(
        () => this.tileDown(),
        1000
    );
  
      this.setState({
        timerId: timerId
      })
    }
  
    componentWillUnmount() {
      window.clearInterval(this.state.timerId)
    }

    updateRows(field: any[]){
        let rows: any[] = []

        field.forEach((row: any, index: any) => {
            // Create board columns
            const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)

            rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
        })
        this.setState({
            rows:rows
        })
    }

    tileUpdate(field: any, tile: any, prev_x: any, prev_y: any, prev_rotation: any, x: any, y: any, rotation: any){
      let tiles = this.state.tiles

      // Remove previous location
      field[prev_y + tiles[tile][prev_rotation][0][1]][prev_x + tiles[tile][prev_rotation][0][0]] = 0
      field[prev_y + tiles[tile][prev_rotation][1][1]][prev_x + tiles[tile][prev_rotation][1][0]] = 0
      field[prev_y + tiles[tile][prev_rotation][2][1]][prev_x + tiles[tile][prev_rotation][2][0]] = 0
      field[prev_y + tiles[tile][prev_rotation][3][1]][prev_x + tiles[tile][prev_rotation][3][0]] = 0

      // Test if the move can be executed on actual field
      let xAddIsValid = true
      // Test if tile should move horizontally
      if (x !== prev_x) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can be moved without getting outside the board
          if (
            x + tiles[tile][prev_rotation][i][0] >= 0
            && x + tiles[tile][prev_rotation][i][0] < 20
          ) {
            if (field[prev_y + tiles[tile][prev_rotation][i][1]][x + tiles[tile][prev_rotation][i][0]] !== 0) {
              // Prevent the move
              xAddIsValid = false
            }
          } else {
            // Prevent the move
            xAddIsValid = false
          }
        }
      }
      // If horizontal move is valid update x variable (move the tile)
      if (!xAddIsValid) {
        x = prev_x
      }

      // Try to rotate the tile
      let rotateIsValid = true
      // Test if tile should rotate
      if (rotation !== prev_rotation) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can be rotated without getting outside the board
          if (
            prev_x + tiles[tile][rotation][i][0] >= 0 &&
            prev_x + tiles[tile][rotation][i][0] < 20 &&
            prev_y + tiles[tile][rotation][i][1] >= 0 &&
            prev_y + tiles[tile][rotation][i][1] < 30
          ) {
            // Test of tile rotation is not blocked by other tiles
            if (
              field[prev_y + tiles[tile][rotation][i][1]][
                prev_x + tiles[tile][rotation][i][0]
              ] !== 0
            ) {
              // Prevent rotation
              rotateIsValid = false
            }
          } else {
            // Prevent rotation
            rotateIsValid = false
          }
        }
      }
      // If rotation is valid update rotate variable (rotate the tile)
      if (!rotateIsValid) {
        rotation = prev_rotation
      }

      // Try to speed up the fall of the tile
      let yAddIsValid = true
      // Test if tile should fall faster
      if (y !== prev_y) {
        for (let i = 0; i <= 3; i++) {
          // Test if tile can fall faster without getting outside the board
          if (
            y + tiles[tile][prev_rotation][i][1] >= 0 &&
            y + tiles[tile][prev_rotation][i][1] < 30
          ) {
            // Test if faster fall is not blocked by other tiles
            if (
              field[y + tiles[tile][prev_rotation][i][1]][
                prev_x + tiles[tile][prev_rotation][i][0]
              ] !== 0
            ) {
              // Prevent faster fall
              yAddIsValid = false
            }
          } else {
            // Prevent faster fall
            yAddIsValid = false
          }
        }
      }
      // If speeding up the fall is valid (move the tile down faster)
      if (!yAddIsValid) {
        y = prev_y
      }
      
      // Render the tile at new position
      field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] = tile
      field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] = tile
      field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] = tile
      field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] = tile

      if (!yAddIsValid) {
        tile = Math.floor(Math.random() * 7 + 1)
        x = 20 / 2
        y = 1
        rotation = Math.floor(Math.random() * 3)

        
        field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] = tile
        field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] = tile
        field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] = tile
        field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] = tile
      }
      
      this.setState({
        field: field,
        activeTile: tile,
        activeX: x,
        activeY: y,
        rotation: rotation
      })
    }

    renderTile (){

        let tile = Math.floor(Math.random() * 7 + 1)
        let x = 20 / 2
        let y = 1

        let field = this.state.field
        
        let tiles = this.state.tiles
        
        field[y + tiles[tile][0][0][1]][x + tiles[tile][0][0][0]] = tile
        field[y + tiles[tile][0][1][1]][x + tiles[tile][0][1][0]] = tile
        field[y + tiles[tile][0][2][1]][x + tiles[tile][0][2][0]] = tile
        field[y + tiles[tile][0][3][1]][x + tiles[tile][0][3][0]] = tile
        // 
        
        this.updateRows(field)
        
        this.setState({
            rotation: 0,
            field: field,
            activeTile: tile,
            activeX: x,
            activeY: y,
          })
        
        console.log(this.state.field)
       


    }

    rotateTile (){

        let tile = this.state.activeTile
        let field = this.state.field

        let rotation = this.state.rotation
        let rotationAdd = 1

        let y: number = this.state.activeY
        let x: number = this.state.activeX


        let tiles = this.state.tiles
        
        let newRotation = rotation + rotationAdd > 3 ? 0 : rotation + rotationAdd

        this.tileUpdate(field, tile, 
                        x,y,rotation,
                        x,y,newRotation)

        this.updateRows(field)
        
        this.setState({
            // field: field,
            // activeTile: tile,
            // rotation: newRotation
          })
        
       


    }

    tileDown (){

      let tile = this.state.activeTile
      let field = this.state.field

      let rotation = this.state.rotation

      let x: number = this.state.activeX 
      let y: number = this.state.activeY
      
      
      let tiles = this.state.tiles
      let newY = y + 1

      this.tileUpdate(field, tile, 
                      x,y,rotation,
                      x,newY,rotation)


      this.updateRows(field)
      
     


  }

  tileDirection (direction:string){

    let tile = this.state.activeTile
    let field = this.state.field

    let rotation = this.state.rotation

    let x: number = this.state.activeX 
    let y: number = this.state.activeY
    
    
    let tiles = this.state.tiles
    let newX = x
    if (direction == "left"){
      newX = this.state.activeX - 1
    }

    if (direction == "right"){
      newX = this.state.activeX + 1
    }

    this.tileUpdate(field, tile, x,y,rotation, newX,y,rotation)

    this.updateRows(field)
    
    this.setState({
        // field: field,
        // activeTile: tile,
        // activeX:newX
      })
    
}

    render(){
        return(
            <div className="tetris-board">
      
            {/* Game board */}
            <div className="tetris-board__board">{this.state.rows}</div>

            <button onClick={this.renderTile}>click</button>
            <button onClick={this.rotateTile}>rotate</button>
            <button onClick={this.tileDown}>down</button>
            <button onClick={() => this.tileDirection("left")}>left</button>
            <button onClick={() => this.tileDirection("right")}>right</button>
            <button onClick={() => console.log(this.state.field)}>checker</button>
          </div>
        )
      }
}

// Create TetrisBoard component
// const TetrisBoard: React.FC<GameBoardProps> = (props) => {
//   // Create board rows
//   let rows: any[] = []

//   props.field.forEach((row, index) => {
//     // Create board columns
//     const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />)

//     rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
//   })

//   return (
//     <div className="tetris-board">
//       {/* Game info */}
//       <div className="tetris-board__info">
//         <p className="tetris-board__text">Level: {props.level}</p>

//         <p className="tetris-board__text">Score: {props.score}</p>

//         {props.gameOver && <p className="tetris-board__text"><strong>Game Over</strong></p>}
//       </div>

//       {/* Game board */}
//       <div className="tetris-board__board">{rows}</div>
//     </div>
//   )
// }

export default GameBoard