const fs = require('fs'); //fs é uma biblioteca nativa do node
const chalk = require('chalk'); //estilizar o texto no console
const fetch = require('node-fetch'); //irá fazer a manipulação e validação do HTTP

//path: contém o caminho do diretório de onde o conteúdo deve ser lido e options: É um objeto que pode ser usado para especificar parâmetros opcionais que afetarão o método.
function mdLinks(pathFile, options = {}) { 
    return new Promise((resolve, reject) => {
        
        //verifica se o arquivo existe 
        const arquivoExiste = fs.existsSync(pathFile); 
    
        if(!arquivoExiste) {
            reject(chalk.red('\u274C') + ' ' + `O arquivo: ${chalk.red.underline(pathFile)} não existe.`);
        } else {
            //data: dados gerado na expressão da string
            fs.readFile(pathFile, 'utf-8', (err, data) => { 
                if(err) {
                    reject(err);
                } else {
                    const linkRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
                    //match retorna os dados da expressão regular
                    const procuraLinks = data.match(linkRegex); 
                    //map: ira mapear o procuralink e irá devolver o que foi solicitado
                    const linkEncontrado = procuraLinks.map(link => { 
                        //O método replace() retorna uma nova string com algumas ou todas as correspondências de um padrão substituídas por um determinado caractere (ou caracteres)  
                        const removerLink = link.replace(/.$/, '').replace('[', ''); 
                        //Split: dividir split() O método split() divide uma String em uma lista ordenada de substrings, coloca essas substrings em um array e retorna o array
                        const dividir = removerLink.split(']('); 
                        const novoObjeto = {
                            //vide documentação (read.me)
                            href: dividir[1], 
                            text: dividir[0],
                            file: pathFile,
                        };
                        return novoObjeto;
                    });
                    // resolve(linkEncontrado);

                    if(options.validate) {
                        //mandando informação para o promise
                        const promises = linkEncontrado.map(element => fetch(element)); 
                        Promise.all(promises)
                            .then(linkArray => {
                                resolve(linkArray)
                            })
                            .catch(error => {
                                reject(error)
                            });
                    } else {
                        resolve(linkEncontrado);
                    }
                }
            });
        }
    });
}

module.exports = mdLinks;