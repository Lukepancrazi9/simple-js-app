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

pokemonList.forEach (function (pokemon){
    if (pokemon.height > 1.6){
        document.write('<p>' + pokemon.name + " (height:" + pokemon.height + ")" + " - Wow that's huge!" +'</p>'); 
    }else {
        document.write('<p>' + pokemon.name + " (height:" + pokemon.height + ")" +'</p>');
    }
});