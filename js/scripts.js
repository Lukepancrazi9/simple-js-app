let pokemonRepository = (function (){

let pokemonList = [
    {
        name: 'Pikachu',
        height: 0.4, //m
        type: 'electric'
    },

    {
        name: 'Pidgeot',
        height: 1.5, //m
        type: ['flying', 'normal']
    },

    {
        name: 'Charizard',
        height: 1.7, //m
        type: ['fire', 'flying']
    }
];
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
    
}
return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
}
})();

pokemonRepository.add({
    name: 'Nidoqueen', height: 1.3, type: ['ground', 'poison']
});

pokemonRepository.getAll().forEach (function (pokemon){
    pokemonRepository.addListItem(pokemon);
});