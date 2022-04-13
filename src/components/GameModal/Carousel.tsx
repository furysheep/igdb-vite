import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'
import { Game, Screenshot, Video } from 'types/model'
import { Image } from '@chakra-ui/react'
import React from 'react'

type PropTypes = { game: Game }

type SlidePropTypes = {
  url: string
  isSelected?: boolean
  type: 'video' | 'screenshot'
  id: string
}

const YoutubeSlide = ({ url, isSelected }: SlidePropTypes) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} />
)

const ImageSlide = ({ url }: SlidePropTypes) => <Image src={url} />

const VideoImageCarousel = ({ game }: PropTypes) => {
  console.log(game)
  const customRenderItem = (item: any, props: any) => (
    <item.type {...item.props} {...props} />
  )

  const getVideoThumb = (videoId: string) =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`

  const getVideoId = (url: string) =>
    url.substr('https://www.youtube.com/embed/'.length, url.length)

  const customRenderThumb = (children: React.ReactElement<SlidePropTypes>[]) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url)
      return (
        <img
          key={item.props.id}
          src={
            item.props.type === 'video'
              ? getVideoThumb(videoId)
              : `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${item.props.id}.jpg`
          }
        />
      )
    })

  let slides: (Screenshot | Video)[] = game.videos?.map((video) => ({
    ...video,
    type: 'video',
  }))
  slides = slides.concat(
    game.screenshots?.map((image) => ({ ...image, type: 'screenshot' }))
  )

  return (
    <Carousel
      renderItem={customRenderItem}
      renderThumbs={customRenderThumb as any}
    >
      {slides.map((slide) =>
        slide.type === 'video' ? (
          <YoutubeSlide
            key={slide.id}
            url={`https://www.youtube.com/embed/${slide.video_id}`}
            type={slide.type}
            id={slide.video_id}
          />
        ) : (
          <ImageSlide
            key={slide.id}
            url={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge_2x/${slide.image_id}.jpg`}
            type={slide.type}
            id={slide.image_id}
          />
        )
      )}
    </Carousel>
  )
}

export default VideoImageCarousel
