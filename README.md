# ÂnimaPlay
Sistema de Gerenciamento do Ânima Hub

    O projeto consiste no desenvolvimento de um sistema para o gerenciamento dos laboratórios, projetos e eventos do  hub anima lav. O principal objetivo é centralizar as inscrições, informações e ter um portfólio dos laboratórios.

    v1 foi criada em nodejs porém após analise de escalibilidade foi realizado a sua reestruturação (v2) em C# DotNet 6.

Agradecimentos ao time pelo esforço e contribuições e agredicimentos especiais ao [Léo](https://github.com/Leo3965) por sua incrível dedicação, entrega e  contribuições técnicas como a modelagem de banco, desenvolvimento da arquitetura de software do backend e frontend  e eximia atuação no projeto como um todo.


## Descrição
Em ambiente de desenvolvimento digite o comando:

~~~javascript
dot net run
~~~
e acesse [link](https://localhost:7011/swagger), para conferir as apis disponíveis e suas formas de uso.

Para criar as entidade do banco de dados, crie uma instancia do banco MySQL, na versão 5.7, sugiro que utilize um container docker com a seguinte imagem `docker pull mysql:5.7.37-oracle`, altere o arquivo de conexão no arquivo `appsetting.json` e digite o comando em um terminal dentro da pasta do projeto:
~~~javascript
dotnet ef database update
~~~

## 🛠 Tecnologias
