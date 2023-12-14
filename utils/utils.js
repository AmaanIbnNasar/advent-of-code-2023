// create a function to read a txt file as a an array of strings
// and return the array
import fs from "fs";

export const readTxtFile = (filePath, split = "\n") => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileContentArray = fileContent.split(split);
  return fileContentArray;
};

export const transpose2DArray = (array) => {
  const rows = array.length,
    cols = array[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = array[i][j];
    }
  }
  return grid;
};
