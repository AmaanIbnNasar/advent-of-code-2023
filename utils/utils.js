// create a function to read a txt file as a an array of strings
// and return the array
import fs from "fs";

export const readTxtFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileContentArray = fileContent.split("\n");
  return fileContentArray;
};
