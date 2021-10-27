function factoryCard(title, description, button, status){
    const div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "18rem";

    const img = document.createElement("img");
    img.classList.add("card-img-top");

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const situacao = document.createElement("span");
    situacao.innerText = status;
    situacao.classList.add("status");
    situacao.classList.add(status);
    
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = title;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = description;

    const a = document.createElement("a");
    a.classList.add("btn");
    a.classList.add("btn-primary");
    if(status=="Limpeza"){
        a.classList.add("disabled");
    }
    a.innerText = button;

    div.appendChild(img);
    divBody.appendChild(situacao);
    divBody.appendChild(h5);
    divBody.appendChild(p);
    divBody.appendChild(a);
    div.appendChild(divBody);

    return div;
}

const section = document.querySelector('.roomList');

console.log("ENTROU")

for(let index=0; index<10; index++){
    section.appendChild(factoryCard("Quarto N° 1", "Suite: R$ 90,00", "Reservar", "Livre"));
    section.appendChild(factoryCard("Quarto N° 2", "Suite: R$ 90,00", "Detalhes", "Ocupado"));
    section.appendChild(factoryCard("Quarto N° 3", "Suite: R$ 90,00", "Reservar", "Limpeza"));
}