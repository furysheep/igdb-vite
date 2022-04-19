import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  Link,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { API_DOMAIN } from 'constants'
import useFetch from 'hooks/useFetch'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { AgeRatingsCategory, AgeRatingsRating, Game } from 'types/model'
import { findGameBySlug } from 'utils/queries'
import NoImage from 'assets/no-image-available.png'
import Score from 'components/Score'
import VideoImageCarousel from 'components/GameModal/Carousel'

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
  console.log(game)
  const developer = game.involved_companies
    ? game.involved_companies.find((c) => c.developer)
    : null

  return (
    <Box>
      <Container maxW="container.xl">
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
      <Container maxW="container.lg">
        <Flex>
          <Box w="60">
            <Image
              objectFit="cover"
              mb="2"
              mt="-40"
              h="80"
              src={
                game.cover
                  ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                  : NoImage
              }
            />
            <Grid templateColumns="repeat(3, 1fr)" mt={2} gap={1}>
              {game.age_ratings &&
                game.age_ratings.map((age_rating) => (
                  <Image
                    key={age_rating.id}
                    objectFit="contain"
                    src={
                      new URL(
                        `../assets/ratings/${
                          AgeRatingsCategory[age_rating.category]
                        }_${AgeRatingsRating[age_rating.rating]}.svg`,
                        import.meta.url
                      ).href
                    }
                    w={20}
                    h={20}
                  />
                ))}
            </Grid>
          </Box>
          <Box flex="1" p="10">
            <h1>{game.name}</h1>
            <div>
              {new Date(game.first_release_date * 1000).toLocaleDateString(
                'en-US'
              )}
            </div>
            {developer && (
              <Link as={RouterLink} to={`/company/${developer.company.slug}`}>
                {developer.company.name}
              </Link>
            )}
            <div>{'Genre: '}</div>
            <Wrap spacing={2}>
              {game.genres &&
                game.genres.map((genre) => (
                  <Tag
                    key={genre.id}
                    as={RouterLink}
                    to={`/genre/${genre.slug}`}
                  >
                    {genre.name}
                  </Tag>
                ))}
            </Wrap>
            <HStack mt={2} spacing={1}>
              {game.websites &&
                game.websites.map((website) => (
                  <Link key={website.id} href={website.url} isExternal>
                    <Image
                      w={30}
                      src={
                        new URL(
                          `../assets/websites/${website.category}.svg`,
                          import.meta.url
                        ).href
                      }
                      color="white"
                    ></Image>
                  </Link>
                ))}
            </HStack>
            <Center mt={2} justifyContent="flex-start">
              <Score score={game.total_rating} />
              {`based on ${game.total_rating_count} reviews`}
            </Center>
            <Box>{game.summary}</Box>
            {/* <div>
              {game}
            </div> */}
          </Box>
        </Flex>
        <VideoImageCarousel game={game} />
        <div>{'Themes: '}</div>
        <Wrap spacing={2}>
          {game.themes &&
            game.themes.map((theme) => (
              <Tag key={theme.id} as={RouterLink} to={`/themes/${theme.slug}`}>
                {theme.name}
              </Tag>
            ))}
        </Wrap>
        <div>{'Player Perspectives: '}</div>
        <Wrap spacing={2}>
          {game.player_perspectives.map((perspective) => (
            <Tag
              key={perspective.id}
              as={RouterLink}
              to={`/player_perspectives/${perspective.slug}`}
            >
              {perspective.name}
            </Tag>
          ))}
        </Wrap>
        {game.storyline && <div>{game.storyline}</div>}
        Similar games
      </Container>
    </Box>
  )
}

export default Details
