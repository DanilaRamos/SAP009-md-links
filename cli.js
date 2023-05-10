#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./mdLink');

//Process. argv: A process.argv propriedade retorna uma matriz contendo os argumentos de linha de comando passados ​​quando o processo Node.js foi iniciado
const pathFile = process.argv[2]; 
const options = process.argv[3];

const statusDaMensagem = {
  '200': 'OK',
  '201': 'Criado',
  '204': 'Nenhum conteúdo',
  '400': 'Requisição inválida',
  '401': 'Não autorizado',
  '403': 'Proibido',
  '404': 'Não encontrado',
  '500': 'Erro interno do servidor',
  '502': 'Gateway ruim',
  '503': 'Serviço indisponível',
};

function buscarLink(element) {
    if (!element || !element.href) {
        return Promise.reject(new Error(`O elemento é invalido ou está sem URL`));
    }

    //esta chamando a função fetch
    return fetch(element.href)
        .then(response => {
            element.status = response.status;
            //esta pegando a resposta do status e estra tranformando em uma string
            element.statusText = statusDaMensagem[response.status.toString()] || response.statusText; 
            return element;
        })
        .catch(error => {
            element.status = 'Elemento não encontrado';
            element.statusText = error.message;
            return element;
        });
};

function imprimirEstatistica(result) {
    const verificaLink = [...new Set(result.map(element => element.href))];
    const recebeEstatistica = {
        total: result.length, 
        unique: verificaLink.length,
    };
     console.log(chalk.green('Total:'), recebeEstatistica.total);
     console.log(chalk.green('Unique:'), recebeEstatistica.unique);
};

function imprimeResultadoValidacao(element) {
    const statusColor = element.status >= 200 && element.status < 300 ? chalk.green : chalk.red;
    console.log(
    statusColor('\u2714'),
    chalk.green(element.file),
    chalk.white(element.href),
    statusColor(`${element.status} ${element.statusText}`),
    chalk.magenta(element.text)
  );
};

function imprimirEstatisticaComFalha(result) {
    const promises = result.map(element => buscarLink(element));
    
    Promise.all(promises)
        .then(linksArray => {
            const verificaLink = [...new Set(linksArray.map(element => element.href))];
            const recebeEstatistica = {
                total: linksArray.length,
                unique: verificaLink.length,
                broken: linksArray.filter(element => element.status !== 200).length,
            };

            console.log(chalk.magenta('Total:'), recebeEstatistica.total);
            console.log(chalk.magenta('Unique:'), recebeEstatistica.unique);
            console.log(chalk.red('Broken:'), recebeEstatistica.broken);
            })
        .catch(error => {
            console.error(error);
        });
};

function estatisticasComOpcaoDeValidacao() {
    mdLinks(pathFile)
    .then(result => {
        imprimirEstatisticaComFalha(result);
    })
    .catch(error => {
        console.log('Erro');
        console.error(error);
    });
};

function manipularOpcaoValidada() {
    mdLinks(pathFile)
    .then(result => {
      const promises = result.map(element => buscarLink(element));

      Promise.all(promises)
        .then(linksArray => {
            linksArray.forEach(element => {
                imprimeResultadoValidacao(element);
            });
        })
        .catch(error => {
            console.error(error);
        });
    })
    .catch(error => {
        console.log('Error');
        console.error(error);
    })  
};

function manipularOpcaoEstatisca() {
    mdLinks(pathFile)
    .then(result => {
        imprimirEstatistica(result);
    })
    .catch(error => {
        console.log('Erro');
        console.error(error);
    }); 
};

if(options === '--stats' && process.argv.includes('--validate')) {
    estatisticasComOpcaoDeValidacao();
} else if(options === '--validate') {
    manipularOpcaoValidada();
} else if(options === '--stats') {
    manipularOpcaoEstatisca();
 //manipulação sem opção selecionada   
} else {
    mdLinks(pathFile)
        .then(result => {
            result.forEach(element => {
                console.log(chalk.blue('\u2764') + ' ' + chalk.red(element.file), chalk.grey(element.href), chalk.blue(element.text));
            });
        })
        .catch(error => {
            console.log('Error');
            console.error(error);
        }); 
}

        