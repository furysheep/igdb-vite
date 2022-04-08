import {
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import './App.css'
import useFetch from 'hooks/useFetch'

import { Game } from 'types/model'
import GameItem from 'components/GameItem'
import { API_DOMAIN } from 'constants'
import Header from 'layouts/Header'
import { useRef, useState } from 'react'
import GameModal from 'components/GameModal'

function App() {
  const { data, error } = useFetch<Game[]>(`${API_DOMAIN}/games`, {
    headers: {
      'Client-ID': 'vwenjm8qqm00temcigiirwyovdggjy',
      Authorization: 'Bearer g8rmueypzhoy5ykswin6xx42wstcgk',
    },
    method: 'POST',
    body: 'fields age_ratings.*,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover.*,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.*,websites; where rating >= 80 & release_dates.date > 1609474683;',
  })

  console.log(data)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()
  const [selectedGame, setSelectedGame] = useState<Game | undefined>(undefined)

  const onOpenGame = (game: Game) => {
    setSelectedGame(game)
    onOpen()
  }

  return (
    <div>
      <Header />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <GameModal game={selectedGame!} onClose={onClose} />
      </Modal>
      <Container mt={50}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {data &&
            data.map((game) => (
              <GameItem key={game.id} game={game} onOpenGame={onOpenGame} />
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default App
