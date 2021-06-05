import axios from 'axios'
import useSWR from 'swr'

// const fetcher = async () =>

//    await fetch({
//       method: 'GET',
//       headers: {
//          latitude: '34.211822',
//          longitude: '-118.646435',
//       },
//    }).then((response) => response.json())

// const useUser = (id) => {
//    const { data, error } = useSWR(
//       `${process.env.REACT_APP_BASE_URL_SERVER}/api/users/${id}`
//    )

//    return {
//       user: data,
//       isLoading: !error & !data,
//       isError: error,
//    }
// }

const useUser = (id, token) => {
   const fetcher = (url, token) => {
      axios
         .get(url, { headers: { Authorization: 'Bearer ' + token } })
         .then((res) => res.data)
   }
   const { data, error } = useSWR(
      [`${process.env.REACT_APP_BASE_URL_SERVER}/api/users/${id}`, token],
      fetcher
   )

   return {
      data,
      error,
   }
}

export default useUser
