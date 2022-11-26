// const lukeLogin = () => {
//   let array = [];
//   for (i = 0; i < 90000; i++) {
//     array.push(i);
//   }
//   return 'Luke logado com sucesso!';
// };

// const leiaLogin = () => {
//   let array = [];
//   for (i = 0; i < 90000; i++) {
//     array.push(i);
//   }
//   return 'Leia logada com sucesso!';
// };

// console.log(lukeLogin());
// console.log(leiaLogin());

// const usuarioLogin = (pessoa) => {
//   let array = [];
//   for (i = 0; i < 90000; i++) {
//     array.push(i);
//   }
//   return `${pessoa} logou com sucesso no sistema!`;
// };

// console.log(usuarioLogin('Luke'));

// const acesso = (nome) => {
//   return `${nome} logou com sucesso no sistema!`;
// };

// const usuarioLogin = (nome) => {
//   let array = [];
//   for (i = 0; i < 90000; i++) {
//     array.push(i);
//   }
//   return acesso(nome);
// };

// usuarioLogin('Luke');

// const acesso = (nome) => {
//   return `${nome} logou com sucesso no sistema!`;
// };

// const usuarioLogin = (nome) => {
//   let array = [];
//   for (i = 0; i < 90000; i++) {
//     array.push(i);
//   }
//   return acesso(nome);
// };

// const diretoriaLogin = (nome) => {
//   let array = [];
//   for (i = 0; i < 900000; i++) {
//     array.push(i);
//   }
//   return acesso(nome);
// };

// console.log(diretoriaLogin('Leia'));

const acesso = (nome) => {
  return `${nome} logou com sucesso no sistema!`;
};

const autentica = (cargo) => {
  let array = [];
  for (i = 0; i < cargo; i++) {
    array.push(i);
    console.log(i);
  }
  return true;
};

const login = (pessoa, autentica) => {
  if (pessoa.cargo === `funcionario`) {
    autentica(9);
  } else if (pessoa.cargo === `diretoria`) {
    autentica(90);
  }
  return acesso(pessoa.nome);
};

console.log(login({ cargo: `diretoria`, nome: `Leia` }, autentica));
