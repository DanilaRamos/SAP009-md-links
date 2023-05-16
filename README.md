# <div align="center"> 🔗💻 Links de Remarcação (Markdown Links) 🔗💻

[Markdown](https://www.alura.com.br/artigos/como-trabalhar-com-markdown) é um formato simples de markup, isso é, de marcação de texto. A ideia é marcar um texto informando o que é importante, o que é um tópico, o que são links e imagens, sem a necessidade de utilizar marcações mais complexas, como o HTML.

***
<div align="center">
 
  <br>
  <br>
  <img align="center" alt="Jest" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" /> 
  <img align="center" alt="git" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
  <img align="center" alt="Rafa-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="vscode" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
  <img align="center" alt="Node" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <br>
  <br>
  Este projeto foi desenvolvido por 
  <br>
  
  <br> DANILA S RAMOS <br> 
  [Linkedin](https://www.linkedin.com/in/danila-ramos) | [Github](https://github.com/DanilaRamos) 
  <br>
  <br>
  
</div>
 
## Índice

* [1. Prefácio](#1-prefacio) 
* [2. Fluxograma](#2-fluxograma) 
* [3. Instalação](#3-Instalação) 
* [4. Terminal e seus comandos](#4-Terminal-e-seus-comandos)
* [5. Testes](#5-testes) 
* [6. Checklists de Objetivos Alcançados](#6-checklist-de-objetivos-alcançados) 

***

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

Os arquivos `Markdown` normalmente contém _links_ que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali.

## 2. Fluxograma 

![Fluxograma](https://github.com/DanilaRamos/SAP009-social-network/assets/104326333/0c8e326a-b504-474e-b443-614784f4a9c3)

<div align="center">
 Fluxograma de estudos e tomada de decisões.
</div>

***

## 3. Instalação

*  `npm install md-links-danila-ramos`

***

## 4. Terminal e seus comandos
  
O usuário que utilizar a ferramenta desenvolvida, poderá localizar os links em um arquivo de interesse com o comando abaixo:
  * `md-links ./arquivos/texto.md` </br>
  </br>![md links](https://github.com/DanilaRamos/SAP009-card-validation/assets/104326333/243ce76f-b86f-4706-b3a2-67aac14ce264)
 
Inserir o comando --validate após o caminho do arquivo, para que assim a ferramenta informe os links que estão com erros.
* `md-links ./arquivos/texto.md --validate` </br>
</br>![--validate](https://github.com/DanilaRamos/SAP009-card-validation/assets/104326333/163120b7-345d-4d5b-80a5-a848daa4b91e)

Verificar informações resumidas sobre os links, acrescentando o comando --stats:
* `md-links ./arquivos/texto.md --stats` </br>
</br>![--stats](https://github.com/DanilaRamos/SAP009-card-validation/assets/104326333/50d20e74-c99c-48a4-a83b-f98749533cbf)

Também é possível utilizar as duas opções acima, juntas:
* `md-links ./arquivos/texto.md --stats --validate` </br>
</br>![--stats--validate](https://github.com/DanilaRamos/SAP009-card-validation/assets/104326333/47bf6d3e-7ec8-4394-ac36-fcead077293d)

Mensagem de retorno quando digitado um arquivo que não existe:
* `md-links ./arquivos/pasta` </br>
</br>![arquivo-nao-existe](https://github.com/DanilaRamos/SAP009-card-validation/assets/104326333/24f30ad8-858e-4e48-b3e8-90fd11a46aef)

## 5. Teste

</br>![testes](https://github.com/DanilaRamos/SAP009-md-links/assets/104326333/c5bd53ab-45fb-40bc-b9b7-5774733df9f9)

</br>

<div align="center">
Função mdLinks passou no teste.
</div>

***

## 6. Checklists de Objetivos Alcançados 🏆

- [:star2:] Possui CLI.
- [:star2:] É instalável.
- [:star2:] Passa pelo linter.
- [:star2:] Passa pelos testes (npm test).
- [:star2:] Inclui fluxograma de estudos e tomada de decisões no README.md.
- [:star2:] Inclui uma definição de produto clara e informativa no README.md.
- [:star2:] Testes unitários cobrem um mínimo de 70% de statements, functions, lines e branches.
- [:star2:] Package.json: deve possuir nome, versão, descrição, autor, licença, dependências e scripts (pretest, test e etc).
