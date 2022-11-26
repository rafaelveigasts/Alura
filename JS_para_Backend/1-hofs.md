# **Higher Order Functions: o que são?**

Nesse artigo vamos entender o que é e como utilizar as funções de ordem superior ou higher order functions.

Uma higher order function é uma função que recebe uma outra como argumento, ou uma função que retorna outra função.

Vamos ver na prática como isso acontece criando um sistema de login que autentica usuários e devolve uma mensagem de sucesso.

## **Funções**

Segundo a documentação da Mozilla, uma função é um conjunto de instruções que executa uma tarefa.

Sendo assim, em primeiro lugar vamos criar duas funções responsáveis pelo login de duas pessoas.

O código abaixo mostra duas funções para imprimir uma mensagem no console depois do término da iteração do array. Esta iteração representa o período que o sistema levaria para autenticar que os usuários Luke e Leia foram logados com sucesso:

```
const lukeLogin = () => {
  let array = []
  for( i = 0; i < 90000; i++){
    array.push(i)
  }
  return "Luke logado com sucesso!"
}

const leiaLogin = () => {
  let array = []
  for( i = 0; i < 90000; i++){
    array.push(i)
  }
  return "Leia logada com sucesso!"
}

lukeLogin()
leiaLogin()
```

Ao executarmos ambas as funções, vamos ter como resultado:

"Luke logado com sucesso!"

"Leia logada com sucesso!"

Podemos perceber que temos duas funções realizando uma mesma tarefa, que é fazer o login. Pensando em como podemos melhorar esse código, logo vem à mente o conceito DRY, don’t repeat yourself ou “Não se repita” em tradução livre.

Para resolver essa questão, vamos substituir o código anterior por apenas uma função que vai lidar com o login. Ao executá-la, passamos por parâmetro o nome de quem está logando:

```
const usuarioLogin = (pessoa) => {
  let array = []
  for( i = 0; i < 90000; i++){
    array.push(i)
  }
  return `${pessoa} logou com sucesso no sistema!`
}

usuarioLogin("Luke")
```

Executando a função teremos:

"Luke logou com sucesso no sistema!"

Podemos melhorar esse código ainda mais. Para isso vamos pensar no poder da composição das funções.

## **Retornando uma função**

Ao refatorar o primeiro código, ainda misturamos duas responsabilidades diferentes no mesmo código, pois criamos a função envolvendo a lógica de fazer o login através do nome do usuário e escrevemos a forma de exibição do resultado no console.

Por meio do conceito de higher order function, podemos compor funções para separar tarefas diferentes. Para exemplificar, podemos criar uma função de acesso que vai cuidar da visualização do resultado e outra que vai ficar responsável pela lógica:

```
const acesso = (nome) => {
  return `${nome} logou com sucesso no sistema!`
}

const usuarioLogin = (nome) => {
  let array = []
  for( i = 0; i < 90000; i++){
    array.push(i)
  }
  return acesso(nome)
}

usuarioLogin("Luke")
```

Como as duas funções estão no mesmo escopo global, a função usuarioLogin() consegue acessar a função acesso(). Assim, funções com responsabilidades diferentes são geradas dentro de outras funções e o valor de retorno da função usuarioLogin() é outra função, acesso().

Isso é possível porque no JavaScript as funções também são valores que podem ser atribuídos a variáveis e “passados para a frente”, algo que nem toda linguagem de programação faz.

No caso da função usuarioLogin(), recebemos um nome como argumento. Mas como a responsabilidade dela é a lógica, podemos retornar dentro dela a função acesso() que vai receber o nome passado na função usuarioLogin(), fazer a execução da sua lógica e exibir o resultado na tela.

Sendo assim, refatoramos nosso login e utilizamos o conceito de higher order functions para compor melhor nosso sistema. Mas e se quisermos adicionar outro cargo, como uma diretora, por exemplo?

## **Recebendo uma função e retornando uma função**

Digamos que devido ao seu cargo, uma diretora teria um tempo maior de login, o que seria possível incluindo verificações no sistema para aumentar este período. Nesse caso teríamos que duplicar nosso código, certo?

Então vamos criar uma função para a diretora:

```
const acesso = (nome) => {
  return `${nome} logou com sucesso no sistema!`
}

const usuarioLogin = (nome) => {
  let array = []
  for( i = 0; i < 90000; i++){
      array.push(i)
  }
  return acesso(nome)
}

const diretoriaLogin = (nome) => {
  let array = []
  for( i = 0; i < 900000; i++){
      array.push(i)
  }
  return acesso(nome)
}

diretoriaLogin("Leia")
```

Na tela é exibido:

"Leia logou com sucesso no sistema!"

Mas imagine se tivermos que criar vários cargos, teríamos que repetir o código diversas vezes? Não exatamente. Uma boa resolução nessa situação seria criar uma função genérica de autenticação:

```
const autentica = (cargo) => {
  let array = []
  for( i = 0; i < cargo; i++){
    array.push(i)
  }
  return true;
}
```

Com essa função criada, podemos estender ainda mais a composição das funções, pois uma higher order function pode tanto receber uma função por parâmetro quanto retornar outra função.

Podemos então refatorar a função login() para receber e retornar funções:

```
const login = (pessoa, autentica) => {
  if(pessoa.cargo === `funcionario`) {
     autentica(90000)
  } else if(pessoa.cargo === `diretoria`) {
     autentica(900000)
  }
 return acesso(pessoa.nome)
}
```

O código completo fica assim:

```
const acesso = (nome) => {
  return `${nome} logou com sucesso no sistema!`
}

const autentica = (cargo) => {
  let array = []
  for( i = 0; i < cargo; i++){
    array.push(i)
  }
  return true;
}

const login = (pessoa, autentica) => {
  if(pessoa.cargo === `funcionario`) {
     autentica(90000)
  } else if(pessoa.cargo === `diretoria`) {
     autentica(900000)
  }
 return acesso(pessoa.nome)
}
```

Vamos ver o que acontece ao executarmos o código, passando para a função login os parâmetros esperados - um objeto com as chaves cargo e nome e a função autentica que está sendo passada como valor:

login({cargo: `diretoria`, nome: `Leia`}, autentica)

- a higher order function login compara o valor da chave cargo no if...else e executa a função autentica passando como parâmetro o valor 900000 pois pessoa.cargo === ‘diretoria’;

- a função autentica é executada e o valor 900000 é utilizado no loop for. Uma vez iniciado o loop, o JavaScript só continua a executar as outras linhas da função após o término da iteração.

- Com o término do loop, a função autentica executa sua última linha e vai retornar true. Esse valor é passado de volta para a função autentica, que continua seu fluxo normal até a última linha, na qual chama a função acesso passando como parâmetro o valor da chave nome e recebendo de volta o retorno de acesso, uma string com o texto ”Leia logou com sucesso no sistema!”

- As funções acesso e autentica são “chamadas de volta” (ou, em inglês, called back) pela função login; esse tipo de função é chamada de “função callback”, sendo a função login a de ordem maior na hierarquia, ou seja, a ”higher order function.

Agora além de retornar uma função,também passamos outra função como argumento que por sua vez, vai ser chamada e receber seus próprios argumentos a partir de dados que existem dentro da função “mais alta” na ordem - ou seja, em “higher order”. Esse é o poder das higher order functions: permitir a composição de funções e deixar nosso código mais organizado e genérico para receber diversos tipos de interações.

## **Conclusão**

- High order functions são funções que recebem uma função ou mais como argumento, retornando outra função;

- Isso permite a composição de funções, ou seja, ter funções pequenas que compõem outras funções maiores;

- funções que são chamadas dentro de outra são chamadas callback functions, pois são “called back” (“chamadas de volta” em uma tradução livre) dentro da função onde estão compostas.
