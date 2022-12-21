import classNames from 'classnames'
import { Character } from 'rickmortyapi/dist/interfaces'

export function CharacterCard({
  character,
  isFavorite,
  onAddToFavorite,
  onRemoveFromFavorite,
}: {
  character: Character
  isFavorite: boolean
  onAddToFavorite: () => void
  onRemoveFromFavorite: () => void
}) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-10 p-10 text-black rounded-2xl',
        isFavorite ? 'bg-blue-300' : 'bg-white'
      )}
    >
      <div className="flex gap-8">
        <div>
          <img
            src={character.image}
            alt={character.name}
            className="aspect-square h-28 rounded-full"
          />
        </div>
        <div>
          <div>{character.status}</div>
          <div>{character.episode.length}</div>
        </div>
      </div>
      <div className="font-bold">{character.name}</div>
      {isFavorite ? (
        <button onClick={onRemoveFromFavorite}>Remove to favorites</button>
      ) : (
        <button onClick={onAddToFavorite}>Add to favorites</button>
      )}
    </div>
  )
}
