import { Table, Tooltip, Typography } from 'antd'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import dayjs from 'dayjs'

import { USERS_QUERY } from 'src/common/queries'
import SubscriptionStatus, {
  getSubscriptionStatus,
} from 'src/components/Dashboard/Account/ManageSubscription/CurrentSubscription/SubscriptionStatus'
import countriesMap from './countriesMap'

const { Paragraph } = Typography

const CountryField = styled.div`
  font-size: 24px;
`

const columns = [
  {
    title: '',
    dataIndex: 'country',
    width: 20,
    render: (value: string) => {
      if (!value) return null
      return (
        // @ts-ignore
        <Tooltip title={countriesMap[value].country}>
          {/* @ts-ignore */}
          <CountryField>{countriesMap[value].emoji}</CountryField>
        </Tooltip>
      )
    },
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    filteredValue: 'firstName',
    sorter: (a: any, b: any) => (a.firstName < b.firstName ? -1 : 1),
    render: (_value: string, row: any) => `${row.firstName} ${row.lastName}`,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a: any, b: any) => (a.email < b.email ? -1 : 1),
    render: (value: string) => (
      <Paragraph copyable style={{ marginBottom: 0 }}>
        {value}
      </Paragraph>
    ),
  },
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
    sorter: (a: any, b: any) => (a.plan < b.plan ? -1 : 1),
    render: (value: string, row: any) => `${value} - ${row.billingPeriod}`,
  },
  {
    title: 'Signed up',
    dataIndex: 'createdAt',
    sorter: (a: any, b: any) => (a.createdAt < b.createdAt ? -1 : 1),
    render: (value: string) => `${dayjs(value).format('MM/DD/YYYY')}`,
  },
  {
    title: 'Last seen',
    dataIndex: 'lastSeen',
    sorter: (a: any, b: any) => (new Date(a.lastSeen).getTime() < new Date(b.lastSeen).getTime() ? -1 : 1),
    // sorter: true,
    // defaultSortOrder: 'ascend',
    render: (value: string) => {
      console.log('🔈 ~ value', value)
      if (!value) return null

      return dayjs(value).fromNow()
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 20,
    sorter: (a: any, b: any) => {
      const aStatus = getSubscriptionStatus(a?.stripe?.subscription, a.type)
      const bStatus = getSubscriptionStatus(b?.stripe?.subscription, b.type)

      return aStatus < bStatus ? -1 : 1
    },
    render: (_value: string, row: any) => {
      if (!row.stripe) return null
      const { subscription } = row.stripe

      return <SubscriptionStatus status={getSubscriptionStatus(subscription, row.type)} />
    },
  },
]

const UsersTable = () => {
  const { data, loading } = useQuery(USERS_QUERY)
  const usersData = data?.usersList?.items || []
  console.log('🔈 ~ usersData', usersData)

  return (
    // @ts-ignore
    <Table loading={loading} dataSource={usersData} columns={columns} rowKey="email" scroll={{ x: 'max-content' }} />
  )
}

export default UsersTable
