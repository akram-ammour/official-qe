import React, { useContext } from 'react'
import rankContext from "../context/RankProvider"
const useRanking = () => {
  return useContext(rankContext)
}

export default useRanking