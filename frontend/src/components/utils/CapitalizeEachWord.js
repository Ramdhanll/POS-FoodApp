const CapitalizeEachWord = (data) => {
   const words = data.split(' ')

   const result = words
      .map((word) => {
         return word[0].toUpperCase() + word.substring(1)
      })
      .join(' ')

   return result
}

export default CapitalizeEachWord
