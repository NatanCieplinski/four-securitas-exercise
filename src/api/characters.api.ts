import axios from 'axios'
import { Character, Info } from 'rickmortyapi/dist/interfaces'

export type CharacterResponse = Info<Character[]>

export async function getCharacters() {
  const res = await axios.get<CharacterResponse>('/character')
  return res.data
}
