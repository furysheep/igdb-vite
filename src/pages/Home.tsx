import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import GameItem from 'components/GameItem'
import { API_DOMAIN } from 'constants'
import { Game } from 'types/model'
import { SearchIcon } from '@chakra-ui/icons'

const Home = () => {
  const [data, setData] = useState<Game[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [sortBy, setSortBy] = useState('first_release_date')
  const fetchGames = () => {
    axios
      .post(
        `${API_DOMAIN}/games`,
        `fields age_ratings.*,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.*,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres.*,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates.*,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.*,websites; where first_release_date > 0 & total_rating > 0 & release_dates.platform = 6;sort ${sortBy} desc; limit 30; offset ${data.length};`,
        {
          headers: {
            'Client-ID': import.meta.env.VITE_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length < 30) {
          setHasMore(false)
        }
        setData((prev) => [...prev, ...res.data])
      })
      .catch(console.error)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const selectOrderBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData([])
    setSortBy(event.target.value)
    fetchGames()
  }

  return (
    <Container maxW="container.xl" mt={50}>
      <Flex mb="3">
        <InputGroup flex="1" mr="3">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input placeholder="Search" />
        </InputGroup>
        <Flex alignItems="center">
          <Box w="100px">Sort by</Box>
          <Select size="md" variant="outline" onChange={selectOrderBy}>
            <option value="first_release_date">Release Date</option>
            <option value="rating">User Rating</option>
          </Select>
        </Flex>
      </Flex>
      <Flex>
        <Box flex="1">
          <InfiniteScroll
            dataLength={data.length}
            next={fetchGames}
            hasMore={hasMore}
            loader={
              <Box w="100%" textAlign="center">
                <Spinner />
              </Box>
            }
          >
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {data &&
                data.map((game) => <GameItem key={game.id} game={game} />)}
            </Grid>
          </InfiniteScroll>
        </Box>
        <Box
          w="400px"
          ml="3"
          p="3"
          border="1px"
          borderColor="gray.700"
          borderRadius="5"
          h="100%"
        >
          <Box>Platforms</Box>
          <Select size="md">
            <option value="option1">Release Date</option>
            <option value="option2">User Rating</option>
          </Select>
          <Box>Genres</Box>
          <Select size="md">
            <option value="option1">Release Date</option>
            <option value="option2">User Rating</option>
          </Select>
          <Box>Themes</Box>
          <Select size="md">
            <option value="option1">Release Date</option>
            <option value="option2">User Rating</option>
          </Select>
        </Box>
      </Flex>
    </Container>
  )
}

export default Home
