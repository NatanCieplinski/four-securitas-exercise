import { useEffect, useState } from 'react'
import { Character } from 'rickmortyapi/dist/interfaces'
import { Search } from 'tabler-icons-react'
import { useCharactersQuery } from './api/characters.queries'
import { CharacterCard } from './components/CharacterCard'

function App() {
  const { data: characters, isLoading } = useCharactersQuery()
  const localeFavorites =
    JSON.parse(
      (localStorage.getItem('favoriteCharactersIds') ?? []) as string
    ) ?? []

  const [searchFilter, setSearchFilter] = useState('')
  const [favoriteCharactersIds, setFavoriteCharactersIds] =
    useState<number[]>(localeFavorites)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      'favoriteCharactersIds',
      JSON.stringify(favoriteCharactersIds)
    )
  }, [favoriteCharactersIds])

  const filteredCharacters =
    characters?.results?.filter((character) =>
      character.name.toLowerCase().includes(searchFilter)
    ) ?? []
  const filteredCharactersIds = new Set(
    filteredCharacters.map((character) => character.id)
  )

  const filteredAndFavoritesCharactersIds = favoriteCharactersIds.filter(
    (item) => filteredCharactersIds.has(item)
  )

  const sortedCharactersIds = showOnlyFavorites
    ? [...filteredAndFavoritesCharactersIds]
    : [
        ...new Set([
          ...filteredAndFavoritesCharactersIds,
          ...filteredCharactersIds,
        ]),
      ]

  const sortedAndFilteredCharacters = sortedCharactersIds.map(
    (characterId) =>
      filteredCharacters.find(
        (character) => character.id === characterId
      ) as Character
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="overflow-scroll justify-center items-center p-20 space-y-20 h-screen bg-slate-100">
      <div className="flex flex-col gap-3 md:flex-row">
        <SearchBar onChange={(searchQuery) => setSearchFilter(searchQuery)} />
        <button
          className="py-2 px-4 w-64 text-white uppercase bg-slate-800 rounded-lg"
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        >
          {showOnlyFavorites ? 'Show All' : 'Show Only Favorites'}
        </button>
      </div>
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {sortedAndFilteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={favoriteCharactersIds.includes(character.id)}
            onAddToFavorite={() => {
              setFavoriteCharactersIds([...favoriteCharactersIds, character.id])
            }}
            onRemoveFromFavorite={() => {
              setFavoriteCharactersIds(
                favoriteCharactersIds.filter((id) => id !== character.id)
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}

function SearchBar({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="flex grow gap-2 items-center py-2 px-4 text-black bg-white rounded-lg border border-slate-800">
      <Search />
      <input
        className="w-full h-full text-2xl rounded-lg outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default App
