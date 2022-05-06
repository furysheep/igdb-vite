import {
  chakra,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Img,
  Link,
  Tag,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Scroll, Keyframes, SpringConfigs } from 'scrollex'
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

const ScrollItem = chakra(Scroll.Item)
const ScrollSection = chakra(Scroll.Section)
const ScrollContainer = chakra(Scroll.Container)

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

  console.log(data)

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

  const developers = game.involved_companies
    ? game.involved_companies.filter((company) => company.developer)
    : []
  const publishers = game.involved_companies
    ? game.involved_companies.filter((company) => company.publisher)
    : []

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
            <div>
              Developers:{' '}
              {developers.length > 0 &&
                developers.map((developer) => (
                  <Link
                    key={developer.company.id}
                    as={RouterLink}
                    to={`/company/${developer.company.slug}`}
                  >
                    {developer.company.name}
                  </Link>
                ))}
            </div>
            <div>
              Publishers:{' '}
              {publishers.length > 0 &&
                publishers.map((publisher) => (
                  <Link
                    key={publisher.company.id}
                    as={RouterLink}
                    to={`/company/${publisher.company.slug}`}
                  >
                    {publisher.company.name}
                  </Link>
                ))}
            </div>
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
            <div>
              {'Platforms: '}
              {game.platforms &&
                game.platforms.map((platform) => platform.name).join(', ')}
            </div>

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
        <Flex>
          <Box flex="1" mr="5">
            {game.storyline && (
              <>
                <Heading as="h3" mt="5">
                  <div className="heading">Storyline</div>
                </Heading>
                <div>{game.storyline}</div>
              </>
            )}
            <Heading as="h3" mt="5">
              <div className="heading">Recommendations</div>
            </Heading>
            <ScrollContainer
              scrollAxis="x"
              throttleAmount={0}
              width="100%"
              height="440px"
              px={4}
            >
              {game.similar_games &&
                game.similar_games.map((similar_game) => (
                  <ScrollSection height="440px" mx={4}>
                    <Box h="100%" display="inline-flex" alignItems="center">
                      <Box overflow="hidden">
                        <ScrollItem>
                          <Box
                            key={similar_game.id}
                            w="100%"
                            rounded="md"
                            // onClick={navigateGame}
                            position="relative"
                          >
                            <Img
                              w="200px"
                              h="300px"
                              objectFit="cover"
                              mb="2"
                              src={
                                similar_game.cover
                                  ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${similar_game.cover.image_id}.jpg`
                                  : NoImage
                              }
                            />
                          </Box>
                        </ScrollItem>
                        <h1>{similar_game.name}</h1>
                        <h2>
                          {String(
                            new Date(
                              similar_game.first_release_date * 1000
                            ).getFullYear()
                          )}
                        </h2>
                      </Box>
                    </Box>
                  </ScrollSection>
                ))}
            </ScrollContainer>
          </Box>
          <Box w="300px">
            <div>{'Game Modes: '}</div>
            <Wrap spacing={2}>
              {game.game_modes &&
                game.game_modes.map((mode) => (
                  <Tag
                    key={mode.id}
                    as={RouterLink}
                    to={`/game_modes/${mode.slug}`}
                  >
                    {mode.name}
                  </Tag>
                ))}
            </Wrap>
            {game.multiplayer_modes && (
              <>
                <div>{'Multiplayer Modes: '}</div>
                <div>
                  Offline Co-op max players:{' '}
                  {game.multiplayer_modes[0].offlinecoopmax}
                </div>
                <div>
                  Online Co-op max players:{' '}
                  {game.multiplayer_modes[0].onlinecoopmax}
                </div>
                <div>
                  Online max players: {game.multiplayer_modes[0].onlinemax}
                </div>
                <div>
                  Offline max players: {game.multiplayer_modes[0].offlinemax}
                </div>
                <div>
                  Offline Co-op:{' '}
                  {game.multiplayer_modes[0].offlinecoop ? 'Yes' : 'No'}
                </div>
                <div>
                  Online Co-op:{' '}
                  {game.multiplayer_modes[0].onlinecoop ? 'Yes' : 'No'}
                </div>
                <div>
                  LAN Co-op: {game.multiplayer_modes[0].lancoop ? 'Yes' : 'No'}
                </div>
                <div>
                  Co-op Campaign:{' '}
                  {game.multiplayer_modes[0].campaigncoop ? 'Yes' : 'No'}
                </div>
                <div>
                  Online Split-Screen:{' '}
                  {game.multiplayer_modes[0].splitscreenonline ? 'Yes' : 'No'}
                </div>
                <div>
                  Offline Split-Screen:{' '}
                  {game.multiplayer_modes[0].splitscreen ? 'Yes' : 'No'}
                </div>
                <div>Drop in/out: {game.multiplayer_modes[0].dropin}</div>
              </>
            )}
            <div>{'Themes: '}</div>
            <Wrap spacing={2}>
              {game.themes &&
                game.themes.map((theme) => (
                  <Tag
                    key={theme.id}
                    as={RouterLink}
                    to={`/themes/${theme.slug}`}
                  >
                    {theme.name}
                  </Tag>
                ))}
            </Wrap>
            {game.collection && (
              <>
                <div>
                  {'Series: '}
                  <Link
                    as={RouterLink}
                    to={`/collections/${game.collection.slug}`}
                  >
                    {game.collection.name}
                  </Link>
                </div>
              </>
            )}
            <div>{'Player Perspectives: '}</div>
            <Wrap spacing={2}>
              {game.player_perspectives &&
                game.player_perspectives.map((perspective) => (
                  <Tag
                    key={perspective.id}
                    as={RouterLink}
                    to={`/player_perspectives/${perspective.slug}`}
                  >
                    {perspective.name}
                  </Tag>
                ))}
            </Wrap>
            {game.franchises && (
              <>
                <div>{'Franchises: '}</div>
                {game.franchises.map((franchise) => (
                  <Link
                    key={franchise.slug}
                    as={RouterLink}
                    to={`/franchises/${franchise.slug}`}
                  >
                    {franchise.name}
                  </Link>
                ))}
              </>
            )}
            {game.game_engines && (
              <>
                <div>{'Game engine: '}</div>
                {game.game_engines.map((engine) => (
                  <Link
                    key={engine.slug}
                    as={RouterLink}
                    to={`/game_engines/${engine.slug}`}
                  >
                    {engine.name}
                  </Link>
                ))}
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Details
