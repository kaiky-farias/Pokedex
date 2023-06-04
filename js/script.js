const pokemonName= document.querySelector('.pokemon__name')
const pokemonNumber= document.querySelector('.pokemon__number')
const pokemonImage= document.querySelector('.pokemon__image')

const form= document.querySelector('.form')
const input= document.querySelector('.input__search')
const buttonNext= document.querySelector('.btn-next')
const buttonPrev= document.querySelector('.btn-prev')

let searchPokemon =1;

const fectchPokemon =  async (pokemon) =>{

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIresponse.status == 200)
    {
        const data = await APIresponse.json();
        return data;
    }

} ;

const renderPokemon = async(pokemon) =>{

    pokemonName.innerHTML='loading...';
    pokemonNumber.innerHTML= '';

    const data = await fectchPokemon(pokemon);
    if(data)
    {
    pokemonImage.style.display ='block';    
    pokemonName.innerHTML= data.name;
    pokemonNumber.innerHTML= data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon= data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML= 'Not found ';
        pokemonNumber.innerHTML= '';
    }

};

form.addEventListener('submit', (event)=> {

    event.preventDefault();

    renderPokemon(input.value);
    
});
buttonPrev.addEventListener('click', ()=> {

    if (searchPokemon>1)
    {
    searchPokemon -= 1;
    renderPokemon (searchPokemon);
    }
});

buttonNext.addEventListener('click', ()=> {

    searchPokemon += 1;
    renderPokemon (searchPokemon);

 });
 
 renderPokemon(searchPokemon)