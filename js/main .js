import {buscarDepoimentos,enviarFormulario} from "./api.js";
import {mostrarAlerta,renderizarDepoimentos} from "./ui.js";

document.addEventListener("DOMContentLoaded",()=>{

carregarDepoimentos();
iniciarFormulario();

});

async function carregarDepoimentos(){

const container = document.getElementById("lista-depoimentos");

if(!container) return;

try{

const dados = await buscarDepoimentos();

renderizarDepoimentos(container,dados);

}catch{

console.log("Erro ao carregar depoimentos");

}

}

function iniciarFormulario(){

const form = document.getElementById("form-contato");

if(!form) return;

form.addEventListener("submit",async function(e){

e.preventDefault();

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const mensagem = document.getElementById("mensagem").value;

const dados = {nome,email,mensagem};

try{

const resposta = await enviarFormulario(dados);

if(resposta.status === 201){

mostrarAlerta(form,"Mensagem enviada com sucesso!","success");

form.reset();

}else{

mostrarAlerta(form,"Erro ao enviar mensagem","danger");

}

}catch{

mostrarAlerta(form,"Falha na comunicação com servidor","danger");

}

});

}