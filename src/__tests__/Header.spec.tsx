import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Header from "../components/Header"
import SearchAnimeCard from "../components/SearchAnimeCard"

describe("Header component", () => {
  it("title should have a text content", () => {
    const { getByRole } = render(<Header handleToggleMenu={() => {}} showSidebarMenu={false}/>)
    const title = getByRole('heading')
   
    expect(title).toHaveTextContent(/ani.me/i)
  })

  it("should have a menu list", () => {
    const { getByRole } = render(<Header handleToggleMenu={() => {}} showSidebarMenu={false}/>)
    const ulElement = getByRole('navigation').firstElementChild;

    expect(ulElement).toBeInTheDocument()
    expect(ulElement?.children).toHaveLength(4)
  })

  it("should not render the clean button of search anime", () => {
    const { queryByTestId } = render(<Header handleToggleMenu={() => {}} showSidebarMenu={false}/>)
    const button = queryByTestId('clean-btn')

    expect(button).not.toBeInTheDocument()
  })

  it("should render the clean button and finded animes container", async () => {
    const { getByTestId, getByRole } = render(<Header handleToggleMenu={() => {}} showSidebarMenu={false}/>)
    const input = getByRole('textbox')
    console.error = jest.fn()

    await userEvent.type(input, 'naruto')

    const cleanButton = getByTestId('clean-btn')
    const findedAnimesContainer = getByTestId('finded-animes')

    expect(console.error).toHaveBeenCalled()
    expect(cleanButton).toBeInTheDocument()
    expect(findedAnimesContainer).toBeInTheDocument()
  })

  it("should render SearchAnimeCard with child from finded animes container", async () => {
    const { getByRole, getByTestId } = render(<Header handleToggleMenu={() => {}} showSidebarMenu={false}/>)
    const input = getByRole('textbox')
    
    await userEvent.type(input, 'naruto')
    
    const { container } = render(
      <SearchAnimeCard 
        createdAt="2014-01-07" 
        genre="mild nudity" 
        imgSrc="https://media.kitsu.io/anime/poster_images/1555/small.jpg" 
        onClick={jest.fn()}
        score="76.78"
        synopsis="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        title="Naruto"
        desktop
        key={"1"}
      />
    )

    const findedAnimesContainer = getByTestId('finded-animes')

    findedAnimesContainer.insertAdjacentElement('beforeend', container)

    expect(container).toBeInTheDocument()
    expect(findedAnimesContainer.children).toHaveLength(1)
  })


  it("should render close button when btn-container is clicked", async () => {
    const { getByTestId } = render(<Header handleToggleMenu={jest.fn()} showSidebarMenu={false}/>)
    const btnContainer = getByTestId('btn-container')

    await userEvent.click(btnContainer)

    const closeBtn = btnContainer.firstElementChild

    if (closeBtn?.tagName === 'button') {
      expect(closeBtn).toBeInTheDocument()
    }
  })

  it("should render search icon when btn-container is clicked", async () => {
    const { getByTestId } = render(<Header handleToggleMenu={jest.fn()} showSidebarMenu={false}/>)
    const btnContainer = getByTestId('btn-container')

    await userEvent.click(btnContainer)

    await userEvent.click(btnContainer)

    const searchIcon = btnContainer.firstElementChild

    if (searchIcon?.tagName === 'svg') {
      expect(searchIcon).toBeInTheDocument()
    }
  })

  it("should render clear search anime button", async () => {
    const { getByTestId, getByRole } = render(<Header handleToggleMenu={jest.fn()} showSidebarMenu={false}/>)
    const btnContainer = getByTestId('btn-container')
    const input = getByRole('textbox') 
    
    await userEvent.click(btnContainer)
    await userEvent.type(input, 'test')

    const clearSearchAnimeBtn = getByTestId('clear-search-anime')

    expect(clearSearchAnimeBtn).toBeInTheDocument();
  })

  it("should not render not found anime component", async () => {
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(<Header handleToggleMenu={jest.fn()} showSidebarMenu={false}/>)
    const btnContainer = getByTestId('btn-container')
    
    await userEvent.click(btnContainer)

    const input = getByPlaceholderText('Digite o Nome do Anime')
    
    await userEvent.type(input, 'naruto')

    const notFoundAnimeComponent = queryByTestId('not-found-anime')!

    expect(notFoundAnimeComponent).not.toBeInTheDocument();
  })
})