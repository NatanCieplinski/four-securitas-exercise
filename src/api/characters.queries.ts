import { useQuery } from 'react-query'
import { getCharacters } from './characters.api'

export const useCharactersQuery = () =>
  useQuery(['characters'], () => getCharacters())
