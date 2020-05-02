// get player names
var player1 = prompt("Player One: Enter Your Name, you will be Blue");
var player2 = prompt("Player Two: Enter Your Name, you will be Red");

var player1Color = "rgb(86, 151, 255)";
var player2Color = "rgb(237, 45, 73)";

var table = $("table tr");

// used to check if the game is running
var game_on = true;

function reportWin(rowNum, colNum) {
  console.log(`you won at this row: ${rowNum}, col: ${colNum}`);
}

// find & change the color of a button
// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function changeColor(rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

// get current color of a button
function returnColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

// find bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);

  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row, colIndex);

    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

// Check to see if 4 inputs are the same color & aren't gray
function colorMatchCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(128, 128, 128)" &&
    one !== undefined // prevent bug from checking outside the table
  );
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    // six rows
    for (var col = 0; col < 4; col++) {
      /*
       four columns starting from the left
       colums 5-7 will result in undefined colors... 
       (the iterator will go outside the table)
       */
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horiz");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
// similar to horizontalWinCheck()
function verticalWinCheck() {
  // seven columns
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("vertical");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      // positive slopes
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        return true;
      }
      // negative slopes
      else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("diag");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}
