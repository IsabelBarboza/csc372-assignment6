"use strict";

const BASE_URL = "/jokebook";

window.onload = () => {
    getRandomJoke();
    getCategories();

    document.getElementById("joke-form").addEventListener("submit", addJoke);
    document.getElementById("search-button").addEventListener("click", searchCategory);  
}; 

function id(name) {
    return document.getElementById(name);
}

async function getRandomJoke() {
        const res = await fetch(BASE_URL+"/random");
        const data = await res.json();
        id("random-joke").textContent = data.setup + " " + data.delivery;
}

async function getCategories() {
    
        const res = await fetch(BASE_URL+"/categories");
        const data = await res.json();
        const container = id("categories-container");
        container.innerHTML = "";
        data.forEach(cat => {
            const button = document.createElement("button");
            button.textContent = cat;
            button.onclick = () => getJokes(cat);
            container.appendChild(button);
        });
}
async function getJokes(category) {
        const res = await fetch(BASE_URL+"/category/"+category);
        const data = await res.json();
        const container = id("jokes-container");
        container.innerHTML = data.map(j => `<p>${j.setup} - ${j.delivery}</p>`).join("");
    }

function searchCategory() {
        const value = id("search-input").value;   
        getJokes(value);
    }

async function addJoke(event) {
    event.preventDefault();
    const form = new FormData(id("joke-form"));
    const body = JSON.stringify(Object.fromEntries(form));
    const res = await fetch(BASE_URL+"/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body
        });
    const data = await res.json();
    getJokes(Object.fromEntries(form).category);
        
}