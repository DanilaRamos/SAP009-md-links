//fs é uma biblioteca nativa do node
const fs = require('fs'); 
//estilizar o texto no console
const chalk = require('chalk'); 

fs.readFile('./arquivos/texto.md', 'utf8', function(err, data) {
  if(err)
      console.log(err);
  else
      console.log(data);
});



