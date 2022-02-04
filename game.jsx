const Square = ({ id, player, newState, totalState }) => {
  const { useState, useEffect } = React;
  const palet = ["lavender", "lavenderblush"];
  const [color, setColor] = useState(palet[0]);
  const [mounted, setMounted] = useState(true);
  const xo = ["x", "o"];
  useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting square ${id}`);
  });
  const toggle = () => {
    setMounted(!mounted);
  };
  //if (!mounted) return null;
  return (
    <button
      id={id}
      onClick={(e) => {
        console.log(JSON.stringify(totalState));
        //if (e.target.innerText === null) {
        let newColor = palet[player - 1];
        setColor(newColor);
        e.target.style.background = newColor;
        e.target.innerText = xo[player - 1];
        newState(id, player);
        //toggle();
        //}
      }}
    >
      {null}
    </button>
  );
};

const Board = () => {
  const { useEffect, useState, useReduce } = React;
  const [player, setPlayer] = useState(1);
  const [totalState, setTotalState] = useState(Array(9).fill(null));
  const [mounted, setMounted] = useState(true);

  function checkWinner(state) {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      let [a, b, c] = win[i];
      if (
        state[a] === state[b] &&
        state[a] === state[c] &&
        state[b] === state[c]
      ) {
        return state[a];
      }
    }
    return null;
  }
  const clearGame = () => {
    setMounted(false);
    status = "";
  };

  const startGame = () => {
    setMounted(true);
    setPlayer(1);
    setTotalState(Array(9).fill(null));
    status = `It's your turn, Player ${player}.`;
  };

  const newState = (idOfSquare, player) => {
    totalState[idOfSquare] = player;
    setTotalState(totalState);
    console.log(`adding ${JSON.stringify({ idOfSquare: player })}`);
    console.log(JSON.stringify(totalState));
  };

  let status = `It's your turn, Player ${player}.`;
  let winner = checkWinner(totalState);
  if (winner != null) status = `Player ${winner} wins!`;

  const renderSquare = (i) => {
    return (
      <Square
        id={i}
        player={player}
        newState={newState}
        totalState={totalState}
        key={i}
        className="square"
      ></Square>
    );
  };
  return (
    <div
      className="game-board"
      onClick={(e) => {
        player === 1 ? setPlayer(2) : setPlayer(1);
      }}
    >
      <h1 className="header">React Tic-Tac-Toe</h1>
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
      </div>
      <div className="game-buttons">
        <br />
        <button onClick={clearGame}>Reset Game</button>
        <button onClick={startGame}>Start New Game</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
