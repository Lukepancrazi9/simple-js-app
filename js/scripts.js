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
return{
    add: add,
    getAll: getAll
}
})();

pokemonRepository.add({
    name: 'Nidoqueen', height: 1.3, type: ['ground', 'poison']
});

pokemonRepository.getAll().forEach (function (pokemon){
    if (pokemon.height > 1.6){
        document.write('<p>' + pokemon.name + " (height:" + pokemon.height + ")" + " - Wow that's huge!" +'</p>'); 
    }else {
        document.write('<p>' + pokemon.name + " (height:" + pokemon.height + ")" +'</p>');
    }
});