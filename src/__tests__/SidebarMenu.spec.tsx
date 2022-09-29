import { render } from "@testing-library/react"
import SidebarMenu from "../components/SidebarMenu"

describe("SidebarMenu component", () => {
  it("should render the burger button", () => {
    const { getByRole } = render(<SidebarMenu handleToggleMenu={jest.fn()} showSidebarMenu={false} />)
    const burgerButton = getByRole('button')

    expect(burgerButton).toBeInTheDocument()
  })

  it("should not render the active class", () => {
    render(<SidebarMenu handleToggleMenu={jest.fn()} showSidebarMenu={true} />)
  })
})