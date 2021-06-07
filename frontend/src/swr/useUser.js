import axios from 'axios'
import useSWR from 'swr'

const useUser = (id, token) => {
   const fetcher = (url, token) =>
      axios
         .get(url, {
            headers: { Authorization: `Bearer ${token}` },
         })
         .then((res) => res.data)

   const { data, error } = useSWR([`api/users/${id}`, token], fetcher, {
      revalidateOnFocus: false,
   })

   return {
      user: data,
      isLoading: !error && !data,
      isError: error,
   }
}
export default useUser
