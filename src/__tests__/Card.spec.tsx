import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

describe("Card Component", () => {
  it("Should render the card title and the anime image", () => {
    const { getByText, debug, getByAltText} = render(<Card imgSrc='/one-punch-man.png' title='One Punch Man'/>)
    const titleElement = getByText('One Punch Man')
    const imgElement = getByAltText('anime image')

    expect(titleElement).toHaveTextContent(/one punch man/i)
    expect(imgElement).toHaveAttribute('src', '/one-punch-man.png')
  })
}) 