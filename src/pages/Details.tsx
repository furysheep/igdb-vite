import { Box, Container, Flex, Image } from '@chakra-ui/react'
import { API_DOMAIN } from 'constants'
import useFetch from 'hooks/useFetch'
import { useParams } from 'react-router-dom'
import { Game } from 'types/model'
import { findGameBySlug } from 'utils/queries'
import NoImage from 'assets/no-image-available.png'

type DetailsParams = {
  gameId: string
}

const Details = () => {
  const { gameId } = useParams<DetailsParams>()

  if (!gameId) {
    return <div>Error</div>
  }

  const { data, error } = useFetch<Game[]>(`${API_DOMAIN}/games`, {
    headers: {
      'Client-ID': import.meta.env.VITE_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
    method: 'POST',
    body: findGameBySlug(gameId),
  })

  if (error) {
    return <div>Error</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  if (data.length === 0) {
    return <div>Not found</div>
  }

  const game = data[0]

  return (
    <Box>
      <Container maxW="container.lg">
        <Image
          objectFit="cover"
          w="100%"
          h="60"
          src={
            game.cover
              ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg`
              : NoImage
          }
        />
      </Container>
      <Container maxW="container.md">
        <Flex>
          <Image
            objectFit="cover"
            mb="2"
            mt="-40"
            src={
              game.cover
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                : NoImage
            }
          />
          <Box p="10">
            <h1>{game.name}</h1>
            <div>
              {new Date(game.first_release_date * 1000).toLocaleDateString(
                'en-US'
              )}
            </div>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Details
