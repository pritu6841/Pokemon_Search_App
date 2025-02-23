const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-button')
const pokemonName = document.querySelector('#pokemon-name')
const pokemonId = document.querySelector('#pokemon-id')
const pokemonWeight = document.querySelector('#weight')
const pokemonHeight = document.querySelector('#height')
const pokemonType = document.querySelector('#types')
const pokemonhp = document.querySelector('#hp')
const pokemonAttack = document.querySelector('#attack')
const pokemonDefence = document.querySelector('#defense')
const pokemonSpeAttack = document.querySelector('#special-attack')
const pokemonSpeDefence = document.querySelector('#special-defense')
const pokemonSpeed = document.querySelector('#speed')
const spriteContainer = document.querySelector('#sprite-container')

const getPokemon = async ()=>{
    try{
        const pokemonNameorId = searchInput.value.toLowerCase()
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameorId}`)
        const data = await res.json()
        setPokemonInfo(data)
    }
    catch(err){
        alert('Pokémon not found')
        console.log(err);
    }
}

setPokemonInfo = data=>{
    const{ name, id, weight, height, types, sprites, stats} = data
    pokemonName.textContent = `${name[0].toUpperCase() + name.slice(1)}`
    pokemonId.textContent = `${id}`
    pokemonWeight.textContent = `Weight: ${weight}`
    pokemonHeight.textContent = `Height: ${height}`
    spriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}">`
    pokemonhp.textContent = `${stats[0].base_stat}`
    pokemonAttack.textContent = `${stats[1].base_stat}`
    pokemonDefence.textContent = `${stats[2].base_stat}`
    pokemonSpeAttack.textContent = `${stats[3].base_stat}`
    pokemonSpeDefence.textContent = `${stats[4].base_stat}`
    pokemonSpeed.textContent = `${stats[5].base_stat}`
    pokemonType.innerHTML = types.map(obj => {
        `<span>${obj.type.name[0].toUpperCase() + obj.type.name.slice(1)}</span>`
    }).join(" ")
}

searchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    getPokemon()
})

searchInput.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        searchButton.click()
    }
})