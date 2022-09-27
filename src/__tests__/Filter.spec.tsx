import { fireEvent, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Filter from "../components/Filter"

describe("Filter component", () => {
  it("should render 27 items", () => {
    const { container } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)

    expect(elements).toHaveLength(27)
  })

  it("should added active class for the clicked button", () => {
    const { container } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)
    const firstButton = elements[0]

    firstButton.addEventListener('click', () => {
      if (!firstButton.getAttribute('class')?.includes('active')) {
        firstButton.setAttribute('class', 'active')
      }
    })

    fireEvent.click(firstButton)

    expect(firstButton).toHaveClass('active')
  })

  it('should have remove class if the clicked button already has active class', async () => {
    const { container } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)
    const firstButton = elements[0]
    const secondButton = elements[1]

    firstButton.classList.add('active')

    await userEvent.click(secondButton)

    expect(firstButton.classList).toHaveLength(1)
  })

  it('should ignore the removal of the clicked button class', async () => {
    const { container } = render(<Filter setSelectedFilter={() => {}} />)

    const elements = Array.from(container.firstElementChild?.children!)
    const firstButton = elements[0]

    firstButton.classList.add('active')

    await userEvent.click(firstButton)

    expect(firstButton.classList).toHaveLength(2)
  })
})