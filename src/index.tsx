///
// src/index.tsx

// Import React and ReactDOM
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Import Tetris component
import Game from './components/Game'

// Import styles
import './styles/styles.css'

ReactDOM.render(<Game />, document.getElementById('root'))