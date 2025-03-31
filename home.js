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
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cargoInput = document.getElementById("cargo");
const salarioInput = document.getElementById("salario");
const corpoTabela = document.getElementById("bodytable");
const cadastrarBtn = document.getElementById("cadastrarBtn");

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

    const funcionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(funcionario);

    nomeInput.value = '';
    idadeInput.value = '';
    cargoInput.value = '';
    salarioInput.value = '';

    renderizarTabela();
    alert("Funcionário cadastrado com sucesso!");
});


function excluirFuncionario(indice) {
    funcionarios.splice(indice, 1);
    renderizarTabela();
}


function editarFuncionario(indice) {
    const funcionario = funcionarios[indice];

    nomeInput.value = funcionario.nome;
    idadeInput.value = funcionario.idade;
    cargoInput.value = funcionario.cargo;
    salarioInput.value = funcionario.salario;

    funcionarios.splice(indice, 1); 
    renderizarTabela();
}
