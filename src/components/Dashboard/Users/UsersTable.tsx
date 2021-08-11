import { Table } from 'antd'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'

import { USERS_QUERY } from 'src/common/queries'
import SubscriptionStatus from 'src/components/Dashboard/Account/ManageSubscription/CurrentSubscription/SubscriptionStatus'

const columns = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_value: string, row: any) => `${row.firstName} ${row.lastName}`,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
    render: (value: string, row: any) => `${value} - ${row.billingPeriod}`,
  },
  {
    title: 'Signed up',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: string) => `${dayjs(value).format('MM/DD/YYYY')}`,
  },
  {
    title: 'Last seen',
    dataIndex: 'lastSeen',
    key: 'lastSeen',
    render: (value: string) => {
      if (!value) return null

      return dayjs(value).fromNow()
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_value: string, row: any) => {
      console.log('🔈 ~ row', row)
      if (!row.stripe) return null

      const { subscription } = row?.stripe
      let status = subscription?.status
      if (subscription?.pause_collection) {
        status = 'paused'
      }
      if (subscription?.cancel_at_period_end) {
        status = 'canceled'
      }

      return <SubscriptionStatus status={status} />
    },
  },
]

const UsersTable = () => {
  const { data, loading } = useQuery(USERS_QUERY)
  const usersData = data?.usersList?.items || []

  return <Table loading={loading} dataSource={usersData} columns={columns} />
}

export default UsersTable
