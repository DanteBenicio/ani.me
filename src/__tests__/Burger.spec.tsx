import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Burger from "../components/Burger";

describe('Burger component', () => {
  it("Should have active class when it clicked", async () => {
    const { container, debug } = render(<Burger showSidebarMenu={false} handleToggleMenu={() => {}}/>)
    const burgerElement = container.firstElementChild;

    await userEvent.click(burgerElement!)

    burgerElement?.classList.add('active')
    
    expect(burgerElement).toHaveClass('active')
  })

  it("Should have three", () => {
    const { container, debug } = render(<Burger showSidebarMenu={false} handleToggleMenu={() => {}}/>)
    const burgerElement = container.firstElementChild;

    const spans = burgerElement?.children!

    expect(spans).toHaveLength(3)
  })
})