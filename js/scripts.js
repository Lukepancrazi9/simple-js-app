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

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 1.6){
        document.write('<p>' + pokemonList[i].name + " (height:" + pokemonList[i].height + ")" + " - Wow that's huge!" +'</p>'); 
    }else {
        document.write('<p>' + pokemonList[i].name + " (height:" + pokemonList[i].height + ")" +'</p>');
    }
}