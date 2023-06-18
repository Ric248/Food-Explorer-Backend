# Desafio Final do Programa Explorer da RocketSeat (Back-end)

<div align="center">
  <img alt="Imagem da aplcação versão desktop" title="Food-explorer" src="https://i.imgur.com/ceQJAOl.png">
</div>
<br>
<div align="center">
  <img alt="Imagem da aplcação versão mobile" title="Food-explorer" src="https://i.imgur.com/GYH9hP6.png">
</div>

# Food Explorer
Uma aplicação de ponta a ponta com front-end e back-end de um menu interativo para um restaurante fictício.

## Critérios obrigatórios
- [x] Atende a todas as especificações na Descrição da Aplicação.
- [x] Um projeto estruturado, com uma boa organização das pastas, divisão de componentes no front-end, etc.
- [x] Os dados do admin, do restaurante e dos usuários serão armazenados em um banco de dados.
- [x] Os usuários deverão se autenticar para entrar na aplicação através da tela de login, utilizando autenticação JWT. A autenticação deve ser validada com senha.
- [x] Funções, variáveis, classes, arquivos, tabelas e todos os outros elementos do código devem ter nomes significativos, de acordo com as boas práticas no mercado.
- [x] Usuário e admin podem fazer uma busca tanto pelo nome do prato quanto pelos ingredientes.
- [x] O admin irá fazer upload de imagens para cadastrar os pratos.
- [x] A aplicação deve ser responsiva, de acordo com o conceito Mobile First que foi aprendido em aula e seguindo o modelo do Figma.
- [x] O repositório deverá conter um README bem detalhado tanto no back-end quanto no front-end com link do deploy, previews e instruções para a execução do projeto.
- [x] Use os conceitos aprendidos em aula sobre animações e inclua transições e transformações (entre outros exemplos) para deixar a experiência da aplicação mais fluida.
- [x] A sua aplicação deverá consumir a sua própria API.
- [x] Faça o deploy da sua aplicação (front-end e back-end).
- [x] Atende ao modelo proposto no Figma e contém elementos indicativos de ação e estado.

## Critérios opcionais
- [ ] Você pode adicionar quaisquer novas funcionalidades no seu projeto. Se desafie.
- [x] O usuário poderá incluir itens no carrinho, clicando no botão incluir. Já a quantidade é controlada pelos botões “-” e “+”.
- [ ] Ao clicar no botão meu pedido, o usuário será redirecionado para uma tela onde irá ver o seu pedido, a soma e os métodos de pagamento.
- [ ] O usuário poderá excluir um prato do carrinho e o valor total do pedido deve ser atualizado automaticamente.
- [x] O usuário poderá marcar um prato como favorito, basta clicar no coração que aparece ao lado de cada um.
- [ ] O admin irá visualizar e controlar o status de cada pedido, por um campo do tipo select. Os pedidos irão aparecer em uma tabela ao clicar em Pedidos.
- [ ] Já que o projeto está em dark mode, você pode aplicar a versão light mode.

## Execução do Back-end
```bash
# Clone do repotório
git clone -b main https://github.com/Ric248/Food-Explorer-Backend.git

# Acessar a pasta do projeto
cd Food-Explorer-Backend

# Instalação das depêndencias
npm install

# Execução
npm start
```

## Links de deploy
### Front-end
https://food-explorer-front.netlify.app/

### Back-end
https://food-explorer-backend-zd8f.onrender.com

##  Personas
O food explorer possui duas personas: o admin e o usuário.

O admin é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento.
`Email: admin@foodexplorer.com`
`Senha: 123456`

O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.
`Email: user@email.com`
`Senha: 123456`

## Autor
- [Ricardo Oliveira da Silva](https://github.com/Ric248/)
