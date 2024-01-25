
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getFormattedTypeNames = (pokemon) => {
    if (pokemon.types && pokemon.types.length > 0) {
        const typeNames = pokemon.types.map(type => capitalizeFirstLetter(type.type.name));
        return typeNames.join(', ');
    } else {
        return '';
    }
};

const getFormattedAbilities = (pokemon) => {
    if (pokemon.abilities && pokemon.abilities.length > 0) {
        const abilityNames = pokemon.abilities.map(ability => {
            const words = ability.ability.name.split('-');
            const capitalizedWords = words.map(word => capitalizeFirstLetter(word));
            return capitalizedWords.join(' ');
        });
        return abilityNames.join(', ');
    } else {
        return '';
    }
};


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pName').value;
    const URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName.toLowerCase();

    fetch(URL)
        .then((res) => res.json())
        .then((pokemon) => {
            const pokemonContainer = document.getElementById('pokemon-container');

            const newPokemonDetail = document.createElement('div');
            newPokemonDetail.className = 'pokemon-detail';

            const img = document.createElement('img');
            img.className = 'pkmnSprite';
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
            img.alt = `Image of ${pokemon.name}`;

            const nameHeading = document.createElement('h2');
            nameHeading.className = 'monName';
            nameHeading.textContent = capitalizeFirstLetter(pokemon.name);

            const typeHeading = document.createElement('h3');
            typeHeading.textContent = 'Type:';

            const typeText = document.createElement('h3');
            typeText.className = 'monType';
            typeText.textContent = getFormattedTypeNames(pokemon);

            const abilityHeading = document.createElement('h3');
            abilityHeading.textContent = 'Ability:';

            const abilityText = document.createElement('h3');
            abilityText.className = 'monAbility';
            abilityText.textContent = getFormattedAbilities(pokemon);

            newPokemonDetail.appendChild(img);
            newPokemonDetail.appendChild(nameHeading);
            newPokemonDetail.appendChild(typeHeading);
            newPokemonDetail.appendChild(typeText);
            newPokemonDetail.appendChild(abilityHeading);
            newPokemonDetail.appendChild(abilityText);

            pokemonContainer.appendChild(newPokemonDetail);
        })
        .catch((error) => {
            console.error('Error fetching Pokemon:', error);
        });
});

const savePokemon = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    savedPokemons.push(pokemon);
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons));
};

const loadPokemons = () => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons')) || [];
    return savedPokemons;
};

document.getElementById('saveButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pName').value.toLowerCase();
    const URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;

    fetch(URL)
        .then((res) => res.json())
        .then((pokemon) => {
            savePokemon(pokemon);
            alert('Pokemon saved!');
        })
        .catch((error) => {
            console.error('Error fetching Pokemon:', error);
        });
});


document.getElementById('loadButton').addEventListener('click', function() {
    const savedPokemons = loadPokemons();

    if (savedPokemons.length > 0) {
        const pokemonContainer = document.getElementById('pokemon-container');
        pokemonContainer.innerHTML = ''; 

        savedPokemons.forEach((savedPokemon) => {
            const savedPokemonDetail = document.createElement('div');
            savedPokemonDetail.className = 'pokemon-detail';

            const img = document.createElement('img');
            img.className = 'pkmnSprite';
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${savedPokemon.id}.png`;
            img.alt = `Image of ${savedPokemon.name}`;

            const nameHeading = document.createElement('h2');
            nameHeading.className = 'monName';
            nameHeading.textContent = capitalizeFirstLetter(savedPokemon.name);

            const typeHeading = document.createElement('h3');
            typeHeading.textContent = 'Type:';

            const typeText = document.createElement('h3');
            typeText.className = 'monType';
            typeText.textContent = getFormattedTypeNames(savedPokemon);

            const abilityHeading = document.createElement('h3');
            abilityHeading.textContent = 'Ability:';

            const abilityText = document.createElement('h3');
            abilityText.className = 'monAbility';
            abilityText.textContent = getFormattedAbilities(pokemon);

            savedPokemonDetail.appendChild(img);
            savedPokemonDetail.appendChild(nameHeading);
            savedPokemonDetail.appendChild(typeHeading);
            savedPokemonDetail.appendChild(typeText);
            savedPokemonDetail.appendChild(abilityHeading);
            savedPokemonDetail.appendChild(abilityText);

            pokemonContainer.appendChild(savedPokemonDetail);
        });
    } else {
        console.log('No saved Pokemon found.');
    }
});

document.getElementById('modeToggle').addEventListener('change', function() {
    const body = document.body;
    body.classList.toggle('dark-mode', this.checked);
    const modeLabel = document.getElementById('modeLabel');
    modeLabel.textContent = this.checked ? 'Dark Mode' : 'Light Mode';
})