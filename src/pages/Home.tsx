import { useEffect, useState } from 'react'
import { Container, Grid, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import GameItem from 'components/GameItem'
import { API_DOMAIN } from 'constants'
import { Game } from 'types/model'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home = () => {
  const [data, setData] = useState<Game[]>([])

  const fetchGames = () => {
    axios
      .post(
        `${API_DOMAIN}/games`,
        `fields age_ratings.*,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.*,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres.*,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates.*,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.*,websites; where first_release_date > 1577882711 & rating >= 85; limit 30; offset ${data.length};`,
        {
          headers: {
            'Client-ID': import.meta.env.VITE_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
          },
        }
      )
      .then((res) => setData((prev) => [...prev, ...res.data]))
      .catch(console.error)
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <Container mt={50}>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchGames}
        hasMore={true}
        loader={<Spinner />}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {data && data.map((game) => <GameItem key={game.id} game={game} />)}
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}

export default Home
