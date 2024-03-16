const fs = require("fs");

const readFile = async (path) => {
  let fileTotal = await fs.promises.readFile(path, "UTF-8");
  fileTotal = JSON.parse(fileTotal);
  return fileTotal;
};

const createFile = async (path, file) => {
  file = JSON.stringify(file, null, 2);
  await fs.promises.writeFile(path, file);
};

const createFileNP = async (path, file, newProduct) => {
  file.push(newProduct);
  file = JSON.stringify(file, null, 2);
  await fs.promises.writeFile(path, file);
  console.log("Product added:", newProduct);
};

module.exports = { readFile, createFile, createFileNP };
