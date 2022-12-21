import { useCharactersQuery } from './api/characters.queries'
import { CharacterCard } from './components/CharacterCard'

function App() {
  const { data, isLoading } = useCharactersQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen text-white bg-gray-800">
      {data?.results.map((character) => (
        <CharacterCard character={character} key={character.id} />
      ))}
    </div>
  )
}

export default App
