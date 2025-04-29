import { useEffect, useState } from "react";
import './App.css'

const Card = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default,
              types: details.types.map((type) => type.type.name),
            };
          })
        );

        setPokemonList(detailedPokemon);

        const allTypes = new Set();
        detailedPokemon.forEach((p) => p.types.forEach((t) => allTypes.add(t)));
        setTypes(["All", ...Array.from(allTypes)]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchData();
  }, []);

  const filteredList = pokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Pokédex</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 w-64 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 w-64"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>{type.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredList.length > 0 ? (
            filteredList.map((pokemon) => (
              <div
                key={pokemon.id}
                className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeIn"
              >
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="mx-auto h-40 w-40 transition-transform duration-300 hover:scale-180"
                />
                <h3 className="text-xl font-bold text-center mt-4 capitalize">{pokemon.name}</h3>
                <p className="text-center text-gray-400 mb-2">ID: {pokemon.id}</p>
                <div className="flex justify-center gap-2 flex-wrap mt-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${typeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg">No Pokémon found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const typeColor = (type) => {
  const map = {
    fire: "bg-red-600 text-white",
    water: "bg-blue-600 text-white",
    grass: "bg-green-600 text-white",
    bug: "bg-lime-600 text-black",
    poison: "bg-purple-600 text-white",
    electric: "bg-yellow-400 text-black",
    ground: "bg-yellow-700 text-white",
    rock: "bg-gray-500 text-white",
    ghost: "bg-indigo-700 text-white",
    fairy: "bg-pink-500 text-white",
    normal: "bg-gray-400 text-black",
    psychic: "bg-pink-600 text-white",
    fighting: "bg-red-700 text-white",
    dragon: "bg-indigo-600 text-white",
    ice: "bg-cyan-400 text-black",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-500 text-white",
    flying: "bg-blue-300 text-black",
  };
  return map[type] || "bg-gray-600 text-white";
};

export default Card;
