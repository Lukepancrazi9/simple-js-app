let pokemonRepository = (function (){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon){
    if (typeof pokemon === 'object'){
        pokemonList.push(pokemon);
    }
}
function getAll(){
    return pokemonList;
}

function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let list = document.createElement("li");
    pokemonList.appendChild(list);

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    list.appendChild(button);

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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

let modalContainer = document.querySelector('#modal-container');
function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
        openModal(pokemon);
    });
}

function openModal(pokemon) {
    //clear existing modal content
    modalContainer.innerHTML = '';

    //create modal
    let modal =  document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X'
    closeButtonElement.addEventListener('click', hideModal);

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.alt = pokemon.name;

    let nameElement = document.createElement('h2');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height + 'm';

    let allPokemonTypes = ''
        pokemon.types.forEach(function (current) {
            allPokemonTypes += ('<span class = "pokemonTypes">' + current.type.name + '</span> ');
        });
    let pokemonTypes = `Types: ${allPokemonTypes}`;

    let typesElement = document.createElement('p');
    typesElement.innerHTML = pokemonTypes

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imgElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);

    //append modal to modal container 
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

function hideModal() {
    modalContainer.classList.remove('is-visible');
}

modalContainer.addEventListener('click', function (event) {
    let target = event.target;
    if (target === modalContainer) {
        hideModal();
    }
});

return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
};
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach (function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});