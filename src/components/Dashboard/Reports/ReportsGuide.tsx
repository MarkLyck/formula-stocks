import { useState } from 'react'
import { Guide } from 'src/ui-components'
import useStore from 'src/lib/useStore'
import { useMutation } from '@apollo/client'
import { SET_TUTORIALS } from 'src/common/queries'

const ReportsGuide = () => {
  const user = useStore((state: any) => state.user)
  const [isVisible, setIsVisible] = useState(true)
  const [setTutorials] = useMutation(SET_TUTORIALS)

  if (!user || !isVisible) return null
  if (user.tutorials.includes('ai-reports-tutorial')) return null

  const handleClick = () => {
    $crisp.push(['do', 'helpdesk:article:open', ['en', '1xjhxg9']])
  }

  const handleClose = () => {
    setIsVisible(false)
    setTutorials({ variables: { id: user.id, tutorials: [...user.tutorials, 'ai-reports-tutorial'] } })
  }

  return (
    <Guide
      onClick={handleClick}
      onClose={handleClose}
      title="How to use AI Reports."
      subtitle="Here's a quick guide on how to use AI Reports."
      text="A revolutionary easy way to pick stocks."
      buttonText="Learn about the AI Score"
    />
  )
}

export default ReportsGuide
