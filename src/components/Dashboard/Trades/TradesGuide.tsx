import { useState } from 'react'
import { Guide } from 'src/ui-components'
import useStore from 'src/lib/useStore'
import { useMutation } from '@apollo/client'
import { SET_TUTORIALS } from 'src/common/queries'

const TradesGuide = () => {
  const user = useStore((state: any) => state.user)
  const [isVisible, setIsVisible] = useState(true)
  const [setTutorials] = useMutation(SET_TUTORIALS)

  if (!user || !isVisible) return null
  if (user.tutorials.includes('trades-tutorial')) return null

  const handleClick = () => {
    $crisp.push(['do', 'helpdesk:article:open', ['en', 'ymtmaw']])
  }

  const handleClose = () => {
    setIsVisible(false)
    setTutorials({ variables: { id: user.id, tutorials: [...user.tutorials, 'trades-tutorial'] } })
  }

  return (
    <Guide
      onClick={handleClick}
      onClose={handleClose}
      title="How to use trades."
      subtitle="Here's a quick guide on how to use trades."
      text="This will help you keep up to date with our portfolio."
      buttonText="Learn about trades"
    />
  )
}

export default TradesGuide
