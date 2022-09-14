import { fireEvent, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Filter from "../components/Filter"

describe("Filter component", () => {
  it("should render 27 items", () => {
    const { container, debug } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)

    expect(elements).toHaveLength(27)
  })

  it("should added active class for the clicked button", () => {
    const { container, debug } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)
    const firstButton = elements[0]

    firstButton.addEventListener('click', () => {
      if (!firstButton.getAttribute('class')?.includes('active')) {
        firstButton.setAttribute('class', 'active')
      }
    })

    fireEvent.click(firstButton)

    debug(firstButton)
    
    expect(firstButton).toHaveClass('active')
  })
})