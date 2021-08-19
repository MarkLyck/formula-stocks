import { Guide } from 'src/ui-components'

const WelcomeGuide = () => {
  const handleClick = () => {
    $crisp.push(['do', 'helpdesk:article:open', ['en', 'w64pew']])
  }
  const handleClose = () => {}

  return (
    <Guide
      onClick={handleClick}
      onClose={handleClose}
      title="Getting started with Formula Stocks."
      subtitle="Here's a quick guide on how to use the portfolio page."
      text="Learn how to mirror the portfolio in your brokerage account."
      buttonText="Get started"
    />
  )
}

export default WelcomeGuide
