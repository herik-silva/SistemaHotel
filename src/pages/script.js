function factoryCard(){
    const div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "18rem";

    const img = document.createElement("img");
    img.classList.add("card-img-top");

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");

    const p = document.createElement("p");
    p.classList.add("card-text");

    const a = document.createElement("a");
    a.classList.add(["btn", "btn-primary"]);

    div.appendChild(img);
    divBody.appendChild(h5);
    divBody.appendChild(p);
    divBody.appendChild(a);
    div.appendChild(divBody);

    return div;
}