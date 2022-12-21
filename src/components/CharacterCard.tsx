import { Character } from 'rickmortyapi/dist/interfaces'

export function CharacterCard({ character }: { character: Character }) {
  return <div>{JSON.stringify(character)}</div>
}
