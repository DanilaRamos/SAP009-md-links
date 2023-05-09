const chalk = require('chalk'); //estilizar o texto no console
const path = require('path'); //contém o caminho do diretório de onde o conteúdo deve ser lido. Pode ser uma String, Buffer ou URL
const fetch = require('node-fetch');
const { mdlinks } = require('./mdLink');
const mdLinks = require('./mdLink');
const { error } = require('console');
const { mainModule } = require('process');

const pathFile = process.argv[2]; //Process. argv: A process.argv propriedade retorna uma matriz contendo os argumentos de linha de comando passados ​​quando o processo Node.js foi iniciado
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

    return fetch(element.href)//esta chamando a função fetch
        .then(response => {
            element.status = response.status;
            element.statusText = statusMessager[response.status.toString()] || response.statusText //esta pegando a resposta do status e estra tranformando em uma string
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
     console.log(chalk.orange('Total:'), stats.total);
     console.log(chalk.orange('Unique:'), stats.unique);
};

function imprimeResultadoValidacao(element) {
    const statusColor = element.status >= 200 && element.status < 300 ? chalk.green : chalk.red;
    console.log(
    statusColor('\u2714'),
    chalk.blue(element.file),
    chalk.blue(element.href),
    statusColor(`${element.status} ${element.statusText}`),
    chalk.blue(element.text)
  );
};

function imprimirEstatisticaComFalha(result) {
    const promise = result.map(element => buscarLink(element));
    
    Promise.all(promise)
        .then(linksArray => {
            const verificaLink = [...new Set(linksArray.map(element => element.href))];
            const estatisticas = {
                total: linksArray.length,
                unique: verificaLink.length,
                broken: linksArray.filter(element => element.status !== 200).length,
            };

            console.log(chalk.grey('Total:'), estatisticas.total);
            console.log(chalk.grey('Unique:'), estatisticas.unique);
            console.log(chalk.grey('Broken:'), estatisticas.broken);
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
        console.log('Error');
        console.error(error);
    });
};

function manipularOpcaoValidada() {
    mdLinks(pathFile)
    .then(result => {
      const promises = result.map(element => buscarLink(element));

      Promise.all(promise)
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
        console.log('Error');
        console.error(error);
    }); 
};

if(options === '--stats' && process.argv.includes('--validate')) {
    estatisticasComOpcaoDeValidacao();
} else if(options === '--validate') {
    manipularOpcaoValidada();
} else if(options === '--stats') {
    manipularOpcaoEstatisca();
} else {
    mdLinks(pathFile)
        .then(result => {
            result.forEach(element => {
                console.log(chalk.grey(element.file), chalk.grey(element.href), chalk.grey(element.text));
            });
        })
        .catch(error => {
            console.log('Error');
            console.error(error);
        }); 
}

        