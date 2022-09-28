import { render } from "@testing-library/react"
import SearchAnimeCard from "../components/SearchAnimeCard"

describe("SearchAnimeCard component", () => {
  it("should render the anime image", () => {
    const { getByRole } = render(<SearchAnimeCard 
      createdAt="2014-01-07" 
      genre="mild nudity" 
      imgSrc="https://media.kitsu.io/anime/poster_images/1555/small.jpg" 
      onClick={jest.fn()}
      score="76.78"
      synopsis="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      title="Naruto"
      desktop
      key={"1"}
    />)

    const animeImage = getByRole('img')

    expect(animeImage).toBeInTheDocument()
    expect(animeImage.getAttribute("src")).toBe("/_next/image?url=https%3A%2F%2Fmedia.kitsu.io%2Fanime%2Fposter_images%2F1555%2Fsmall.jpg&w=3840&q=75")
  })

  it("should test if desktop prop has false value", () => {
    render(<SearchAnimeCard 
      createdAt="2014-01-07" 
      genre="mild nudity" 
      imgSrc="https://media.kitsu.io/anime/poster_images/1555/small.jpg" 
      onClick={jest.fn()}
      score="76.78"
      synopsis="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      title="Naruto"
      key={"1"}
    />)
  })

  it("should test if createdAt prop value doesn't exist", () => {
    render(<SearchAnimeCard 
      genre="mild nudity" 
      imgSrc="https://media.kitsu.io/anime/poster_images/1555/small.jpg" 
      onClick={jest.fn()}
      score="76.78"
      synopsis="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      title="Naruto"
      key={"1"}
    />)
  })
})