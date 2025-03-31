class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = parseInt(idade);
        this._cargo = cargo;
        this._salario = parseFloat(salario);
    }

    get nome() { return this._nome; }
    set nome(nome) { this._nome = nome; }

    get idade() { return this._idade; }
    set idade(idade) { this._idade = parseInt(idade); }

    get cargo() { return this._cargo; }
    set cargo(cargo) { this._cargo = cargo; }

    get salario() { return this._salario; }
    set salario(salario) { this._salario = parseFloat(salario); }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario.toFixed(2)}`;
    }
}

let funcionarios = [];
let indiceEditando = null;

const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cargoInput = document.getElementById("cargo");
const salarioInput = document.getElementById("salario");
const corpoTabela = document.getElementById("bodytable");
const cadastrarBtn = document.getElementById("cadastrarBtn");
const relatorioDiv = document.getElementById("relatorio");

const renderizarTabela = () => {
    corpoTabela.innerHTML = '';
    funcionarios.forEach((funcionario, indice) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.salario.toFixed(2)}</td>
            <td>
                <button onclick="editarFuncionario(${indice})">Editar</button>
                <button onclick="excluirFuncionario(${indice})">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

cadastrarBtn.addEventListener("click", () => {
    const nome = nomeInput.value;
    const idade = idadeInput.value;
    const cargo = cargoInput.value;
    const salario = salarioInput.value;

    if (!nome || !idade || !cargo || !salario) {
        alert("Preencha todos os campos!");
        return;
    }

    if (indiceEditando === null) {
        funcionarios.push(new Funcionario(nome, idade, cargo, salario));
        alert("Funcionário cadastrado com sucesso!");
    } else {
        funcionarios[indiceEditando] = new Funcionario(nome, idade, cargo, salario);
        alert("Funcionário atualizado com sucesso!");
        indiceEditando = null;
        cadastrarBtn.textContent = "Cadastrar";
    }

    nomeInput.value = '';
    idadeInput.value = '';
    cargoInput.value = '';
    salarioInput.value = '';

    renderizarTabela();
});

const excluirFuncionario = indice => {
    funcionarios = funcionarios.filter((_, i) => i !== indice);
    renderizarTabela();
}

const editarFuncionario = indice => {
    const funcionario = funcionarios[indice];
    nomeInput.value = funcionario.nome;
    idadeInput.value = funcionario.idade;
    cargoInput.value = funcionario.cargo;
    salarioInput.value = funcionario.salario;

    indiceEditando = indice;
    cadastrarBtn.textContent = "Atualizar";
}

const buscarFuncionarioPorNome = nome => funcionarios.find(func => func.nome.toLowerCase() === nome.toLowerCase());

const relatorios = {
    listarAltosSalarios: () => funcionarios.filter(func => func.salario > 5000),
    mediaSalarial: () => funcionarios.reduce((acc, func) => acc + func.salario, 0) / funcionarios.length || 0,
    listarCargosUnicos: () => Array.from(new Set(funcionarios.map(func => func.cargo))),
    listarNomesMaiusculos: () => funcionarios.map(func => func.nome.toUpperCase())
};

renderizarTabela();
