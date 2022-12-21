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
  const filteredCharactersIds = filteredCharacters.map(
    (character) => character.id
  )

  const set = new Set(filteredCharactersIds)

  const filteredAndFavoritesCharactersIds = favoriteCharactersIds.filter(
    (item) => set.has(item)
  )

  const sortedCharactersIds = [
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
    <div className="overflow-scroll justify-center items-center p-20 space-y-20 h-screen bg-gray-800">
      <SearchBar onChange={(searchQuery) => setSearchFilter(searchQuery)} />
      <div className="flex flex-wrap gap-10">
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
    <div className="flex gap-2 p-2 text-black bg-white rounded-lg">
      <Search />
      <input
        className="w-full h-full rounded-lg outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default App
