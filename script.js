document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-container");
  const searchInput = document.getElementById("search-input");

  // Berfungsi untuk mengambil data dari API
  async function fetchPokemonData() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const data = await response.json();
      const pokemonDetails = await Promise.all(data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json())));
      displayCards(pokemonDetails);
      searchInput.addEventListener("input", () => searchPokemon(pokemonDetails));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  // Berfungsi untuk menampilkan kartu
  function displayCards(pokemons) {
    cardsContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      const pokemonImage = pokemon.sprites.front_default;
      const pokemonName = pokemon.name;
      const pokemonType = pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ");

      cardElement.innerHTML = `
              <img src="${pokemonImage}" alt="${pokemonName}">
              <div class="card-content">
                  <h2>${pokemonName}</h2>
                  <p>Type: ${pokemonType}</p>
              </div>
          `;
      cardsContainer.appendChild(cardElement);
    });
  }

  // Berfungsi untuk mencari Pokemon
  function searchPokemon(pokemons) {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));
    displayCards(filteredPokemons);
  }

  // Ambil dan tampilkan data saat dimuat
  fetchPokemonData();
});
