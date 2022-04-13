import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import { Game } from 'types/model'
import Carousel from './Carousel'

type PropTypes = { onClose: () => void; game: Game }

const GameModal = ({ onClose, game }: PropTypes) => {
  return (
    <ModalContent>
      <ModalHeader>{game.name}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Carousel game={game} />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default GameModal
