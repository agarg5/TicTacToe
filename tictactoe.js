var readlineSync = require("readline-sync");

class TicTacToe {
  constructor(n = 3, p = 2, test = false) {
    if (n < 3 || p < 2)
      throw Error("must have at least 3X3 grid and 2 players");
    this.n = n;
    this.board = [...new Array(n).fill(undefined)].map(e =>
      new Array(n).fill(undefined)
    );
    const constIcons = ["X", "O"];
    const additionalPlayers = new Array(p - constIcons.length)
      .fill(undefined)
      .map((e, i) => `P${i + constIcons.length}`);
    this.playerIcons = [...constIcons, ...additionalPlayers];
    console.log(this.playerIcons);
    this.moveCount = 0;
    if (!test) this.playGame();
  }

  promptUserCoordinates(s) {
    let x = null;
    let y = null;
    while (!Number.isInteger(x))
      x = parseInt(
        readlineSync.question(
          `Player ${s}, please enter a valid number for the x coordinate for the move `
        )
      );
    while (!Number.isInteger(y))
      y = parseInt(
        readlineSync.question(
          `Player ${s}, please enter a valid number for the y coordinate for the move `
        )
      );
    return [x, y];
  }

  playGame() {
    while (true) {
      this.playerIcons.forEach((s, i) => {
        this.printBoard();
        let x = undefined;
        let y = undefined;
        do {
          [x, y] = this.promptUserCoordinates(s);
        } while (!this.addMove(s, x, y));
        if (this.isGameOver(s, x, y)) process.exit();
      });
    }
  }

  isSpaceInBounds(x, y) {
    if (x == undefined || y == undefined) return false;
    if (x < 0 || x >= this.n) return false;
    if (y < 0 || y >= this.n) return false;
    return true;
  }

  isSpaceOpen(x, y) {
    return this.board[x][y] == undefined;
  }

  addMove(s, x, y) {
    if (!this.isSpaceInBounds(x, y)) {
      console.log("Space out of bounds. Please try another space");
      this.printBoard();
      return false;
    }
    if (!this.isSpaceOpen(x, y)) {
      console.log("Space not open. Please try another space");
      this.printBoard();
      return false;
    }
    this.board[x][y] = s;
    this.moveCount++;
    return true;
  }

  printBoard() {
    for (let x = 0; x < this.n; x++)
      console.log(this.board[x].map(e => e || "E").join(" | "));
  }

  hasEmptySpace() {
    return !!findEmptySpace();
  }

  findEmptySpace() {
    for (let x = 0; x < this.n; x++)
      for (let y = 0; y < this.n; y++)
        if (this.isSpaceEmpty(x, y)) return [x, y];
    return null;
  }

  reportWin(s) {
    console.log(`${s} has won the game!`);
    this.printBoard();
  }

  reportDraw() {
    console.log(`There has been a draw!`);
    this.printBoard();
  }

  isGameOver(s, x, y) {
    //check col
    for (let i = 0; i < this.n; i++) {
      if (this.board[x][i] != s) break;
      if (i == this.n - 1) {
        this.reportWin(s);
        return true;
      }
    }

    //check row
    for (let i = 0; i < this.n; i++) {
      if (this.board[i][y] != s) break;
      if (i == this.n - 1) {
        this.reportWin(s);
        return true;
      }
    }

    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < this.n; i++) {
        if (this.board[i][i] != s) break;
        if (i == this.n - 1) {
          this.reportWin(s);
          return true;
        }
      }
    }

    //check anti diag
    if (x + y == this.n - 1) {
      for (let i = 0; i < this.n; i++) {
        if (this.board[i][this.n - 1 - i] != s) break;
        if (i == this.n - 1) {
          this.reportWin(s);
          return true;
        }
      }
    }

    //check draw
    if (this.moveCount == Math.pow(this.n, 2) - 1) {
      this.reportDraw();
      return true;
    }

    return false;
  }
}

new TicTacToe();
