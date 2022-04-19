import { GridItem, Image, Text } from '@chakra-ui/react'
import { AgeRatingsCategory, AgeRatingsRating, Game } from 'types/model'
import NoImage from 'assets/no-image-available.png'
import { useNavigate } from 'react-router-dom'

type PropTypes = { game: Game }

const GameItem = ({ game }: PropTypes) => {
  const description = String(
    new Date(game.first_release_date * 1000).getFullYear()
  )

  const navigate = useNavigate()
  const navigateGame = () => {
    navigate(`/games/${game.slug}`)
  }

  return (
    <GridItem
      key={game.id}
      w="100%"
      rounded="md"
      onClick={navigateGame}
      position="relative"
    >
      <Image
        w="100%"
        mb="2"
        src={
          game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : NoImage
        }
      />
      <h1>{game.name}</h1>
      <h2>{description}</h2>
    </GridItem>
  )
}

export default GameItem
