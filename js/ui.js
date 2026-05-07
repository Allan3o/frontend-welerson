export function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

export function mostrarAlerta(form,texto,tipo){

const alerta = document.createElement("div");

alerta.className = `alert alert-${tipo} mt-3`;
alerta.innerText = texto;

form.appendChild(alerta);

setTimeout(()=>{
alerta.remove();
},4000);

}

export function renderizarDepoimentos(container,dados){

container.innerHTML = "";

dados.forEach(item => {

container.innerHTML += `
<div class="col-md-4 mb-4">
<div class="card shadow h-100">
<div class="card-body">
<h5 class="card-title">${item.name}</h5>
<h6 class="text-muted">${item.email}</h6>
<p class="card-text">${item.body}</p>
</div>
</div>
</div>
`;

});

}