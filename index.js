//fs é uma biblioteca nativa do node
const fs = require('fs'); 
//estilizar o texto no console
const chalk = require('chalk'); 
// // nodeconst mdLink = require('./mdLink.js'); 
// const path = ('path');

fs.readFile('./arquivos/texto.md', 'utf8', function(err, data) {
  if(err)
      console.log(err);
  else
      console.log(data);
});

// const arquivosPath = 'arquivos/texto.md';

// fs.readFile(arquivosPath, 'utf-8', function(err, data) {
//   if (err) throw err;
//   const extension = path.extname(arquivosPath);
//   console.log(`O arquivo ${chalk.blue.bgRed.bold(arquivosPath)} tem a extensão ${chalk.blue('\u2764') + chalk.red.underline(extension)}`);
// });

