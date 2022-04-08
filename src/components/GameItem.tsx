import { GridItem, Image, Text } from '@chakra-ui/react'
import { AgeRatingsCategory, AgeRatingsRating, Game } from 'types/model'
import NoImage from 'assets/no-image-available.png'

type PropTypes = { game: Game; onOpenGame: (game: Game) => void }

const GameItem = ({ game, onOpenGame }: PropTypes) => {
  const ratingImgUrl = game.age_ratings
    ? new URL(
        `../assets/ratings/${
          AgeRatingsCategory[game.age_ratings[0].category]
        }_${AgeRatingsRating[game.age_ratings[0].rating]}.svg`,
        import.meta.url
      ).href
    : undefined
  return (
    <GridItem
      key={game.id}
      w="100%"
      border="1px"
      borderColor="gray.200"
      padding="0.9rem"
      shadow="base"
      rounded="md"
      p="4"
      transitionProperty="shadow"
      transitionDuration="200ms"
      transitionTimingFunction="ease-in-out"
      _hover={{ shadow: '2xl' }}
      onClick={() => onOpenGame(game)}
    >
      <Image
        w="100%"
        src={
          game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : NoImage
        }
      />
      <Text>{game.name}</Text>
      {ratingImgUrl && <Image src={ratingImgUrl} width={10} />}
    </GridItem>
  )
}

export default GameItem
