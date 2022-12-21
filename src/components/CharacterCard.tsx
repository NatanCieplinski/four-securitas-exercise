import classNames from 'classnames'
import { Character } from 'rickmortyapi/dist/interfaces'
import { Heart } from 'tabler-icons-react'

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
        'space-y-4 p-8 text-black rounded-3xl border-2 bg-white border-slate-800 w-[480px]'
      )}
    >
      <div className="flex gap-8 justify-between">
        <div className="shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="aspect-square h-28 rounded-2xl border-2 border-slate-800"
          />
        </div>
        <div className="space-y-2 w-full">
          <DataPoint
            label="N# of Ep."
            value={character.episode.length.toString()}
          />
          <DataPoint label="Gender" value={character.gender} />
          <DataPoint label="Origin" value={character.origin.name.toString()} />
          <DataPoint
            label="Location"
            value={character.location.name.toString()}
          />
        </div>
      </div>
      <div className="text-3xl font-bold">{character.name}</div>
      <div className="flex gap-3 justify-between">
        <CharacterStatus status={character.status} />
        {isFavorite ? (
          <FavoriteButton onClick={onRemoveFromFavorite} variant="remove" />
        ) : (
          <FavoriteButton onClick={onAddToFavorite} variant="add" />
        )}
      </div>
    </div>
  )
}

function FavoriteButton({
  onClick,
  variant,
}: {
  onClick: () => void
  variant: 'add' | 'remove'
}) {
  return (
    <button onClick={onClick} className="">
      <Heart
        className={classNames(
          'w-9 h-9',
          variant === 'remove' ? 'fill-red-400' : 'fill-gray-200'
        )}
      />
    </button>
  )
}

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <div className="col-span-1 text-sm font-medium text-gray-500 uppercase">
        {label}
      </div>
      <div className="col-span-2 text-sm font-bold text-gray-700 truncate">
        {value}
      </div>
    </div>
  )
}

function CharacterStatus({ status }: { status: Character['status'] }) {
  return (
    <div
      className={classNames(
        'rounded-md px-2 py-1 flex items-center justify-center',
        status === 'Alive' && 'bg-green-200 text-green-700',
        status === 'Dead' && 'bg-red-200 text-red-700',
        status === 'unknown' && 'bg-gray-200 text-gray-700'
      )}
    >
      <span className="text-sm font-bold uppercase">{status}</span>
    </div>
  )
}
