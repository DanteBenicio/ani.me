import { render } from "@testing-library/react"
import MoreWatchedAnimeCard from '../components/MoreWatchedAnimeCard'

describe("MoreWatchedAnime component", () => {
  it("should render the anime image", () => {
    const { getByRole, debug } = render(<MoreWatchedAnimeCard 
      createdAt="2013-02-20T16:00:25.722Z"
      imgSrc="https://media.kitsu.io/anime/poster_images/12/small.jpg"
      title="One Piece"
    />)
    const image = getByRole('img')

    expect(image).toBeInTheDocument()
    expect(image.getAttribute('src')).toBe("/_next/image?url=https%3A%2F%2Fmedia.kitsu.io%2Fanime%2Fposter_images%2F12%2Fsmall.jpg&w=384&q=75")
  })
})