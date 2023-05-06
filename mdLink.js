const fs = require('fs'); //fs é uma biblioteca nativa do node
const chalk = require('chalk'); //estilizar o texto no console
const fetch = require('node-fetch'); //irá fazer a manipulação e validação do HTTP
const { error } = require('console');// APARECEU SOZINHO

function mdLinks(pathFile, options = {}) {
    return new Promise((resolve, reject) => {
        const arquivoExiste = fs.existsSync(pathFile); //verifica se o arquivo existe
        // const tamanhoArquivo = fs.statSync(pathFile).size; //stat irá trazer a informação sobre o arquivo
    
        if(!arquivoExiste) {
            reject(chalk.blue('\u2764') + ' ' + `O arquivo: ${chalk.red.bold(pathFile)} não existe.`);
        } else {
            fs.readFile(pathFile, 'utf-8', (err, data) => { //dados: dados gerado na expressão da string
                if(err) {
                    reject(err);
                } else {
                    const linkRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
                    const procuraLinks = data.match(linkRegex) //match retorna os dados da expressão regular

                    const linkEncontrado = procuraLinks.map(link => { //map: ira mapear o procuralink e irá devolver o que foi solicitado
                        const removerLink = link.replace(/.$/, '').replace('[', ''); //O método replace() retorna uma nova string com algumas ou todas as correspondências de um padrão substituídas por um determinado caractere (ou caracteres)  
                        const dividir = removerLink.split(']('); //Split: dividir split() O método split() divide uma String em uma lista ordenada de substrings, coloca essas substrings em um array e retorna o array
                        const novoObjeto = {
                            href: dividir[1], //vide documentação
                            href: dividir[0],
                            file: pathFile,
                        };
                        return novoObjeto;
                    });

                    if(options.validate) {
                        const promise = linkEncontrado.map(element => fetch(element)); //mandando informação para o promise
                        Promise.all(promise)
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