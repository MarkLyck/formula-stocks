import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'src/ui-components'
import { resetApplication } from 'src/common/utils'

import { CURRENT_USER_QUERY, USER_LAST_SEEN } from 'src/common/queries'
import Layout from './Layout'
import useStore from 'src/lib/useStore'

const withDashboard = (Component: React.ReactNode) => () => {
  const setUser = useStore((state: any) => state.setUser)
  const { data } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: 'cache-and-network' })
  const [updateLastSeen] = useMutation(USER_LAST_SEEN)

  useEffect(() => {
    if (data?.user) {
      woopra
        .identify({
          email: data.user.email,
          name: `${data.user.firstName || ''} ${data.user.lastName || ''}`,
        })
        .push()

      setUser(data.user)
      updateLastSeen({ variables: { id: data.user.id, lastSeen: new Date() } })
      // updateLastSeen({ variables: { id: data.user.id, lastSeen: dayjs(new Date()).format('YYYY-MM-DD') } })
    }
    // @ts-ignore
    $crisp.push(['do', 'chat:hide'])
  }, [data])

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetApplication}>
        {/* @ts-ignore */}
        <Component />
      </ErrorBoundary>
    </Layout>
  )
}

export default withDashboard
