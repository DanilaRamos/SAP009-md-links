const mdLinks = require('../mdLink.js');
const fs = require('fs');

describe('mdLinks', () => {

  test('devera devolver uma promisse', () => {
    const resultado = mdLinks('README.md')
    expect(resultado instanceof Promise).toBe(true)
  });

  test('devera devolver o caso de erro', async() => {
    let erro = 'sucesso'
    await mdLinks('./arquivos/teste').catch(() => {
        erro = 'erro'
    })
    expect(erro).toEqual('erro')
    });
 });

describe('caso a extensao não exista', () => {
   test('devera retornar uma mensagem de erro', async () => {
    let erro = 'sucesso';
    await mdLinks('./arquivos/arquivo-sem-link.txt').catch(() => {
        erro = 'extensao-invalida'
    });
    expect(erro).toEqual('extensao-invalida');
   });
});

test('devera resolver a promessa com uma matriz de objetos com propriedades href, texto e arquivo', async () => {
    const conteudoArquivo = '[Twitter](https://www.twitter.com)';
    //spyOn() é útil quando queremos testar uma função que já existe em um módulo, mas precisamos de mais controle sobre como ela é chamada ou seu comportamento
    const arquivoExiste = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const lerArquivo = jest.spyOn(fs, 'readFile').mockImplementation((pathFile, options, callback) => {
    callback(null, conteudoArquivo);  
  });

    const saidaEsperada = [
      {
        href: 'https://www.twitter.com',
        text: 'Twitter',
        file: 'README.md',
      },
    ];

    const result = await mdLinks('README.md');
    expect(result).toEqual(saidaEsperada);
    arquivoExiste.mockRestore();
    lerArquivo.mockRestore();
});

test('Deve retornar uma matriz com objetos contendo propriedades status: fail e ok.', async () => {
  const result = await mdLinks('./arquivos/texto.md', { validate: true });
  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(11);
  // toHaveProperty para verificar se a propriedade fornecida na referênci existe para um objeto.
  expect(result[0]).toHaveProperty('status');
});



