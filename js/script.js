const params = new URLSearchParams(window.location.search);

const filme = params.get("filme");

const nomeFilme = document.getElementById("nomeFilme")

if (filme) {
    nomeFilme.textContent = filme;
} else {
    nomeFilme.textContent = "Filme não selecionado"
}

const sala = document.getElementById("sala");

const assentosEscolhidos = document.getElementById("assentosEscolhidos");
const total = document.getElementById("total");
const finalizar = document.getElementById("finalizar");

const preco = 25;

let selecionados = [];


// ALGUNS ASSENTOS QUE JÁ ESTÃO OCUPADOS

const ocupados = [3, 4, 12, 18, 25, 26];


// CRIANDO AS 32 CADEIRAS

for (let fileira = 0; fileira < 4; fileira++) {

    const divFileira = document.createElement("div");

    divFileira.classList.add("fileira");


    for (let cadeira = 1; cadeira <= 8; cadeira++) {

        const numero = fileira * 8 + cadeira;


        // LABEL

        const label = document.createElement("label");

        label.classList.add("assento");


        // CHECKBOX

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = numero;


        // CADEIRA

        const span = document.createElement("span");

        span.textContent = numero;


        // VERIFICA SE ESTÁ OCUPADO

        if (ocupados.includes(numero)) {

            checkbox.disabled = true;

            label.classList.add("ocupado");

        }


        // COLOCA CHECKBOX E CADEIRA DENTRO DO LABEL

        label.appendChild(checkbox);
        label.appendChild(span);


        // COLOCA A CADEIRA NA FILEIRA

        divFileira.appendChild(label);


        // QUANDO CLICAR

        checkbox.addEventListener("change", () => {

            if (checkbox.checked) {

                selecionados.push(numero);

            } else {

                selecionados = selecionados.filter(
                    item => item !== numero
                );

            }

            atualizarResumo();

        });

    }


    // COLOCA A FILEIRA NA SALA

    sala.appendChild(divFileira);
}


// ATUALIZA O RESUMO

function atualizarResumo() {

    if (selecionados.length === 0) {

        assentosEscolhidos.textContent = "Nenhum";

    } else {

        assentosEscolhidos.textContent =
            selecionados.join(", ");

    }


    const valorTotal = selecionados.length * preco;

    total.textContent =
        valorTotal.toFixed(2).replace(".", ",");
}


// BOTÃO FINALIZAR

finalizar.addEventListener("click", () => {

    if (selecionados.length === 0) {

        alert("Selecione pelo menos um assento!");

        return;

    }


    alert(
        `Compra realizada!\n\n` +
        `Filme: ${filme}\n` +
        `Assentos: ${selecionados.join(", ")}\n` +
        `Total: R$ ${total.textContent}`
    );

});