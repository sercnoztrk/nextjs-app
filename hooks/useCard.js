import fetcher from '../lib/fetch'
import useSWR from 'swr'

function useCard (id) {
    const { data, error } = useSWR(`/api/card`, fetcher, { refreshInterval: 1000 })
    return {
      card: data,
      isLoading: !error && !data,
      isError: error
    }
}

export default useCard