import { Center } from '@chakra-ui/react'

type PropTypes = {
  score: number
}

const Score = ({ score }: PropTypes) => {
  const roundScore = Math.round(score)
  let color = '#66cc33'
  if (roundScore >= 50 && roundScore < 75) {
    color = '#facc33'
  } else if (roundScore < 50) {
    color = '#f50103'
  }
  return (
    <Center w={10} h={10} mr={2} bg="#66cc33" borderRadius={3} fontSize={25}>
      {roundScore}
    </Center>
  )
}

export default Score
