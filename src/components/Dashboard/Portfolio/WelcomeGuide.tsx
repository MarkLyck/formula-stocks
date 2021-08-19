import { useState } from 'react'
import { Guide } from 'src/ui-components'
import useStore from 'src/lib/useStore'
import { useMutation } from '@apollo/client'
import { SET_TUTORIALS } from 'src/common/queries'

const WelcomeGuide = () => {
  const user = useStore((state: any) => state.user)
  const [isVisible, setIsVisible] = useState(true)
  const [setTutorials] = useMutation(SET_TUTORIALS)

  if (!user || !isVisible) return null
  if (user.tutorials.includes('getting-started')) return null

  const handleClick = () => {
    $crisp.push(['do', 'helpdesk:article:open', ['en', 'w64pew']])
  }

  const handleClose = () => {
    setIsVisible(false)
    setTutorials({ variables: { id: user.id, tutorials: [...user.tutorials, 'getting-started'] } })
  }

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
