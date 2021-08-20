import { useState } from 'react'
import { Guide } from 'src/ui-components'
import useStore from 'src/lib/useStore'
import { useMutation } from '@apollo/client'
import { SET_TUTORIALS } from 'src/common/queries'

const SuggestionsGuide = () => {
  const user = useStore((state: any) => state.user)
  const [isVisible, setIsVisible] = useState(true)
  const [setTutorials] = useMutation(SET_TUTORIALS)

  if (!user || !isVisible) return null
  if (user.tutorials.includes('suggestions-tutorial')) return null

  const handleClick = () => {
    analyticsTrack('open-tutorial', { tutorial: 'suggestions-tutorial' })
    $crisp.push(['do', 'helpdesk:article:open', ['en', '1si08de']])
  }

  const handleClose = () => {
    setIsVisible(false)
    setTutorials({ variables: { id: user.id, tutorials: [...user.tutorials, 'suggestions-tutorial'] } })
  }

  return (
    <Guide
      onClick={handleClick}
      onClose={handleClose}
      title="How to use suggestions."
      subtitle="Here's a quick guide on how to use suggestions."
      text="What would Joe do if he received a weekly paycheck?"
      buttonText="Learn about suggestions"
    />
  )
}

export default SuggestionsGuide
