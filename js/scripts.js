let pokemonRepository = (function (){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon){
        pokemonList.push(pokemon);
}
function getAll(){
    return pokemonList;
}

function addListItem(pokemon){
    let pokemonList = document.querySelector(".list-group");
    let list = document.createElement("li");
    list.classList.add('list-group-item', 'row')
    pokemonList.appendChild(list);

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-success');
    list.appendChild(button);
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

    button.addEventListener("click", function(){
        showDetails(pokemon);
    });
    
}

function loadList() {
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url 
            };
            add(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
}

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
}

function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name.charAt(0).toUpperCase() + item.name.slice(1) + "</h1>")
    let imageElementFront = $('<img class="modal-img" style="width:50%">').attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">').attr("src", item.imageUrlBack);
    let heightElement = $("<p>" + '<b>Height: </b>' + item.height + 'm' + "</p>");
    let weightElement = $("<p>" + '<b>Weight: </b>' + item.weight + 'kg' + "</p>");
    let typesElement = $('<p>' + '<b>Types: </b>' + item.types.map(type => type.type.name).join(', ') + '</p>');
    let abilitiesElement = $('<p>' + '<b>Abilities: </b>' + item.abilities.map(ability => ability.ability.name).join(', ') + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
}

return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
};
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach (function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

let inputField = document.querySelector('input');

document.querySelector('#searchButton').addEventListener('click', function (event) {
    event.preventDefault();
    searchPage();
});

inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchPage();
    }
});

function searchPage() {
    let searchString = inputField.value.trim().toLowerCase();

    if (searchString !== '') {
    
        document.querySelector('.list-group').innerHTML = '';

        pokemonRepository.getAll().forEach(function (currentPokemon) {
            let currentPokemonName = currentPokemon.name.toLowerCase();
            if (currentPokemonName.includes(searchString)) {
                pokemonRepository.addListItem(currentPokemon);
            }
        });
    }
}