///
// src/components/tetris-board.tsx

// Import React
import * as React from "react";
import { TETRIS_TILES } from "../constants/index";
import TileHold from "./TileHold";
// import validMove from '../helpers/index'

// Define props for TetrisBoard component
type GameBoardProps = {
  field: any[];
  boardHeight: number;
  boardWidth: number;
};

type GameBoardState = {
  field: any[];
  rows: any[];
  activeTile: number;
  heldTile: any;
  activeX: number;
  activeY: number;
  tiles: number[][][][];
  rotation: number;
  timerId: any;
  boardHeight: number;
  boardWidth: number;
  gameOver: boolean;
  gamePaused: boolean;
  score: number;
  tileCount: number;
  level: number;
};

class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  constructor(props: any) {
    super(props);

    // Create board rows
    let rows: any[] = [];

    props.field.forEach((row: any, index: any) => {
      // Create board columns
      const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />);

      rows.push(
        <div className="tetris-board__row" key={index}>
          {cols}
        </div>
      );
    });

    this.state = {
      boardHeight: props.boardHeight,
      boardWidth: props.boardWidth,
      field: props.field,
      rows: rows,
      activeTile: 3,
      // activeTile: {tile:0,x:1,y:2,rotation:0},
      heldTile: null,
      activeX: 2,
      activeY: 1,
      rotation: 0,
      timerId: null,
      tiles: TETRIS_TILES,
      gameOver: false,
      gamePaused: false,

      // for scoring and increase in difficulty
      score: 0,
      tileCount: 1,
      level: 1
    };

    this.renderTile = this.renderTile.bind(this);
    this.rotateTile = this.rotateTile.bind(this);
    // // this.tileSoftDown = this.tileSoftDown.bind(this)
    this.tileDown = this.tileDown.bind(this);
    this.tileDrop = this.tileDrop.bind(this);
    this.tileDirection = this.tileDirection.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.keyPressWatch = this.keyPressWatch.bind(this);
    this.tileUpdate = this.tileUpdate.bind(this);
    this.holdTile = this.holdTile.bind(this);
    this.pause = this.pause.bind(this);
  }

  keyPressWatch(event: any) {
    if (event.keyCode === 37) {
      event.preventDefault();
      this.tileDirection("left");
    }
    if (event.keyCode === 39) {
      event.preventDefault();
      this.tileDirection("right");
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      // this.tileSoftDown()
      this.tileDown();
    }
    if (event.keyCode === 32) {
      event.preventDefault();
      this.tileDrop();
    }
    if (event.keyCode === 90 || event.keyCode == 38) {
      event.preventDefault();
      this.rotateTile();
    }
    if (event.keyCode === 67) {
      event.preventDefault();
      this.holdTile();
    }
    if (event.keyCode === 27) {
      event.preventDefault();
      this.pause();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressWatch, false);

    let timerId;

    timerId = setInterval(() => this.tileDown(), 1000 - this.state.level * 20 > 800 ? 800 : this.state.level * 20);

    this.setState({
      timerId: timerId
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerId);
  }

  updateRows(field: any[]) {
    let rows: any[] = [];

    field.forEach((row: any, index: any) => {
      // Create board columns
      const cols = row.map((column: any, index: number) => <div className={`col-${column}`} key={index} />);

      rows.push(
        <div className="tetris-board__row" key={index}>
          {cols}
        </div>
      );
    });
    this.setState({
      rows: rows
    });
  }

  // tileUpdate(prevTile: object, newTile: object){
  //   console.log(validMove(prevTile, newTile)
  // }

  tileUpdate(field: any, tile: any, prev_x: any, prev_y: any, prev_rotation: any, x: any, y: any, rotation: any) {
    if (this.state.gameOver || this.state.gamePaused) {
      // if (this.state.gameOver) {
      return;
    }

    let tiles = this.state.tiles;

    // Remove previous location
    field[prev_y + tiles[tile][prev_rotation][0][1]][prev_x + tiles[tile][prev_rotation][0][0]] = 0;
    field[prev_y + tiles[tile][prev_rotation][1][1]][prev_x + tiles[tile][prev_rotation][1][0]] = 0;
    field[prev_y + tiles[tile][prev_rotation][2][1]][prev_x + tiles[tile][prev_rotation][2][0]] = 0;
    field[prev_y + tiles[tile][prev_rotation][3][1]][prev_x + tiles[tile][prev_rotation][3][0]] = 0;

    // Test if the move can be executed on actual field
    let xAddIsValid = true;
    // Test if tile should move horizontally
    if (x !== prev_x) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be moved without getting outside the board
        if (x + tiles[tile][prev_rotation][i][0] >= 0 && x + tiles[tile][prev_rotation][i][0] < this.state.boardWidth) {
          if (field[prev_y + tiles[tile][prev_rotation][i][1]][x + tiles[tile][prev_rotation][i][0]] !== 0) {
            // Prevent the move

            xAddIsValid = false;
          }
        } else {
          // Prevent the move
          xAddIsValid = false;
        }
      }
    }
    // If horizontal move is valid update x variable (move the tile)
    if (!xAddIsValid) {
      x = prev_x;
    }

    // Try to rotate the tile
    let rotateIsValid = true;
    // Test if tile should rotate
    if (rotation !== prev_rotation) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be rotated without getting outside the board
        if (
          prev_x + tiles[tile][rotation][i][0] >= 0 &&
          prev_x + tiles[tile][rotation][i][0] < this.state.boardWidth &&
          prev_y + tiles[tile][rotation][i][1] >= 0 &&
          prev_y + tiles[tile][rotation][i][1] < this.state.boardHeight
        ) {
          // Test of tile rotation is not blocked by other tiles
          if (field[prev_y + tiles[tile][rotation][i][1]][prev_x + tiles[tile][rotation][i][0]] !== 0) {
            // Prevent rotation
            rotateIsValid = false;
          }
        } else {
          // Prevent rotation
          rotateIsValid = false;
        }
      }
    }
    // If rotation is valid update rotate variable (rotate the tile)
    if (!rotateIsValid) {
      rotation = prev_rotation;
    }

    // Try to speed up the fall of the tile
    let yAddIsValid = true;
    // Test if tile should fall faster
    if (y !== prev_y) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can fall faster without getting outside the board
        if (
          y + tiles[tile][prev_rotation][i][1] >= 0 &&
          y + tiles[tile][prev_rotation][i][1] < this.state.boardHeight
        ) {
          // Test if faster fall is not blocked by other tiles
          if (field[y + tiles[tile][prev_rotation][i][1]][prev_x + tiles[tile][prev_rotation][i][0]] !== 0) {
            // Prevent faster fall
            yAddIsValid = false;
          }
        } else {
          // Prevent faster fall
          yAddIsValid = false;
        }
      }
    }
    // If speeding up the fall is valid (move the tile down faster)
    if (!yAddIsValid) {
      y = prev_y;
    }

    // Render the tile at new position
    field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] = tile;
    field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] = tile;
    field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] = tile;
    field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] = tile;

    let isSameTile = true;
    if (!yAddIsValid) {
      isSameTile = false;
      tile = Math.floor(Math.random() * 7 + 1);
      x = this.state.boardWidth / 2;
      y = 1;
      rotation = Math.floor(Math.random() * 3);

      // Test if game is over - test if new tile can't be placed in field
      if (
        field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] !== 0 ||
        field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] !== 0 ||
        field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] !== 0 ||
        field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] !== 0
      ) {
        // Stop the game
        this.setState({
          gameOver: true
        });
      } else {
        // for (let i = 0; i < 20; i++) {
        //   console.log("row", field[i])
        //   let clearRow: boolean = true

        //   for (let y = 0; y < 10; y++) {
        //     if (field[i][y] == 0){clearRow = false}
        //   }

        //   console.log("should clear? ", clearRow)
        //   if (clearRow){
        //     field.pop(i)
        //     let row = []
        //       for (let x = 0; x < this.state.boardWidth; x++) {
        //           row.push(0)
        //       }
        //     field.unshift(row)
        //     i--;
        //     i--;
        //   }
        // Check if row is completed
        for (let row = this.props.boardHeight - 1; row >= 0; row--) {
          let isLineComplete = true;
          for (let col = 0; col < this.props.boardWidth; col++) {
            if (field[row][col] === 0) {
              isLineComplete = false;
            }
          }

          // Remove completed rows
          if (isLineComplete) {
            for (let yRowSrc = row; row > 0; row--) {
              for (let col = 0; col < this.props.boardWidth; col++) {
                field[row][col] = field[row - 1][col];
              }
            }

            // Check if the row is the last
            row = this.props.boardHeight;
          }
        }

        // isSameTile = false
        // tile = Math.floor(Math.random() * 7 + 1)
        // x = this.state.boardWidth / 2
        // y = 1
        // rotation = Math.floor(Math.random() * 3)

        field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] = tile;
        field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] = tile;
        field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] = tile;
        field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] = tile;
        this.setState(prev => ({
          score: prev.score + 1 * prev.level,
          tileCount: prev.tileCount + 1,
          level: 1 + Math.floor(prev.tileCount / 10)
        }));
      }
    }

    // Update state - update score, update number of tiles, change level
    this.setState(prev => ({
      score: prev.score + 1
    }));
    this.setState({
      field: field,
      activeTile: tile,
      activeX: x,
      activeY: y,
      rotation: rotation
    });
    return isSameTile;
  }

  renderTile() {
    let tile = Math.floor(Math.random() * 7 + 1);
    let x = this.state.boardWidth / 2;
    let y = 1;
    let field = this.state.field;
    let tiles = this.state.tiles;

    field[y + tiles[tile][0][0][1]][x + tiles[tile][0][0][0]] = tile;
    field[y + tiles[tile][0][1][1]][x + tiles[tile][0][1][0]] = tile;
    field[y + tiles[tile][0][2][1]][x + tiles[tile][0][2][0]] = tile;
    field[y + tiles[tile][0][3][1]][x + tiles[tile][0][3][0]] = tile;

    this.updateRows(field);
  }

  rotateTile() {
    let tile = this.state.activeTile;
    let field = this.state.field;
    let rotation = this.state.rotation;
    let rotationAdd = 1;
    let y: number = this.state.activeY;
    let x: number = this.state.activeX;
    let newRotation = rotation + rotationAdd > 3 ? 0 : rotation + rotationAdd;

    this.tileUpdate(field, tile, x, y, rotation, x, y, newRotation);

    this.updateRows(field);
  }

  tileDown() {
    let tile = this.state.activeTile;
    let field = this.state.field;
    let rotation = this.state.rotation;
    let x: number = this.state.activeX;
    let y: number = this.state.activeY;
    let newY = y + 1;

    this.tileUpdate(field, tile, x, y, rotation, x, newY, rotation);

    this.updateRows(field);
  }

  // tileSoftDown() { // Needs to handle check for two dowm that doesnt pause brick. like rotate
  //   let tile = this.state.activeTile
  //   let field = this.state.field
  //   let rotation = this.state.rotation
  //   let x: number = this.state.activeX
  //   let y: number = this.state.activeY
  //   let newY = y + 2

  //   this.tileUpdate(
  //     field, tile,
  //     x, y, rotation,
  //     x, newY, rotation
  //   )

  //   this.updateRows(field)

  // }

  tileDrop() {
    let tile = this.state.activeTile;
    let field = this.state.field;
    let rotation = this.state.rotation;
    let x: number = this.state.activeX;
    let y: number = this.state.activeY;
    let newY = y;

    do {
      this.updateRows(field);
      tile = this.state.activeTile;
      field = this.state.field;
      rotation = this.state.rotation;
      x = this.state.activeX;
      y = this.state.activeY;
      newY++;
    } while (this.tileUpdate(field, tile, x, y, rotation, x, newY, rotation));
  }

  tileDirection(direction: string) {
    let tile = this.state.activeTile;
    let field = this.state.field;
    let rotation = this.state.rotation;
    let x: number = this.state.activeX;
    let y: number = this.state.activeY;
    let newX = x;

    if (direction == "left") {
      newX = this.state.activeX - 1;
    }

    if (direction == "right") {
      newX = this.state.activeX + 1;
    }

    this.tileUpdate(field, tile, x, y, rotation, newX, y, rotation);

    this.updateRows(field);
  }

  holdTile() {
    let tile = this.state.activeTile;
    let field = this.state.field;
    let rotation = this.state.rotation;
    let x: number = this.state.activeX;
    let y: number = this.state.activeY;
    let newX = x;
    let tiles = this.state.tiles;

    field[y + tiles[tile][rotation][0][1]][x + tiles[tile][rotation][0][0]] = 0;
    field[y + tiles[tile][rotation][1][1]][x + tiles[tile][rotation][1][0]] = 0;
    field[y + tiles[tile][rotation][2][1]][x + tiles[tile][rotation][2][0]] = 0;
    field[y + tiles[tile][rotation][3][1]][x + tiles[tile][rotation][3][0]] = 0;

    if (this.state.heldTile) {
      this.setState({
        activeTile: this.state.heldTile,
        heldTile: this.state.activeTile
      });
    } else {
      let newTile = Math.floor(Math.random() * 7 + 1);
      this.setState({
        heldTile: this.state.activeTile,
        activeTile: newTile
      });
    }
    // this.updateRows(this.state.field)
  }

  pause() {
    this.setState({
      gamePaused: !this.state.gamePaused
    });
  }

  refreshPage() {
    window.location.reload(false);
  }



  render() {
    return (
      <div className="tetris-board">
        <TileHold tileOnHold={this.state.heldTile} />

        {/* Game board */}
        {this.state.gameOver && "Game Over"}
        {this.state.gamePaused && "PAUSED"}
        <br />
        {"score: " + this.state.score}
        <br />
        {"level: " + this.state.level}
        <br />
        <br />
        {/* {"is paused: " + this.state.gamePaused} */}
        <div className="tetris-board__board">{this.state.rows}</div>
        <button onClick={this.refreshPage}>Restart</button>
        {/* <button onClick={this.pause}>{this.state.gamePaused ? "Play": "Pause"} Game</button> */}

        {/* <button onClick={this.renderTile}>click</button> */}
        {/* <button onClick={this.rotateTile}>rotate</button> */}
        {/* <button onClick={this.tileSoftDown}>down</button> */}
        {/* <button onClick={this.tileDown}>down</button> */}
        {/* <button onClick={this.tileDrop}>drop</button> */}
        {/* <button onClick={() => this.tileDirection("left")}>left</button> */}
        {/* <button onClick={() => this.tileDirection("right")}>right</button> */}
        {/* <button onClick={() => console.log(this.state.field)}>checker</button> */}
      </div>
    );
  }
}

export default GameBoard;
