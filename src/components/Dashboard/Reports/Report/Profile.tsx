import { useState } from 'react'
import { Row, List, Card, Typography, Space, Divider, Empty } from 'antd'
import styled from '@emotion/styled'
import { currencyRoundedFormatter } from 'src/common/utils/formatters'
import { DebtCheck, InsiderTradesCheck, ROICCheck, ProfitabilityCheck, GrowthRateCheck, DividendsCheck } from './Checks'

const { Text, Title } = Typography

const Logo = styled.img`
  height: 32px;
  margin-right: 16px;
  border-radius: 4px;
`

const GridItemContainer = styled.div`
  background: ${(p) => p.theme.palette.neutral[300]};
  border-radius: 4px;
  padding: 16px 24px;
  display: flex;
`

const ItemLabel = styled.p`
  margin: 0;
  margin-right: 8px;
`

const ItemValue = styled.p`
  margin: 0;
  font-weight: bold;
`

const Grid = styled.div`
  display: flex;
`

const GridItem = ({ label, value }: any) => (
  <GridItemContainer>
    <ItemLabel>{label}:</ItemLabel> <ItemValue>{value}</ItemValue>
  </GridItemContainer>
)

const Profile = ({ profile, symbol }: any) => {
  const [image, setImage] = useState(profile?.image)
  if (!profile) {
    return (
      <Card>
        <Empty description="Profile not found" />
      </Card>
    )
  }

  const gridItems = [
    { label: 'Sector', value: profile.sector },
    { label: 'Industry', value: profile.industry },
    { label: 'Website', value: profile.website },
    { label: 'Ceo', value: profile.ceo },
    { label: 'Exchange', value: profile.exchange },
    { label: 'IPO', value: profile.ipoDate },
    { label: 'Country', value: profile.country },
    { label: 'Market Cap', value: currencyRoundedFormatter.format(profile.mktCap) },
  ]

  return (
    <>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4} style={{ margin: 0 }}>
            {/* sets the image to empty if it fails */}
            <Logo src={image} onError={() => setImage('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')} />
            {profile.companyName} ({profile.symbol})
          </Title>
          <Divider />
          <Text>{profile.description}</Text>
          <Divider />
          <Grid>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              dataSource={gridItems}
              renderItem={(item) => (
                <List.Item>
                  <GridItem label={item.label} value={item.value} />
                </List.Item>
              )}
            />
          </Grid>
        </Space>
      </Card>
      <Title level={4} style={{ marginTop: 32 }}>
        Metrics
      </Title>
      <Row gutter={[16, 16]}>
        <ROICCheck symbol={symbol} />
        <GrowthRateCheck
          label="Equity Growth"
          url={`https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=10`}
          metricName="bookValuePerShare"
        />
        <GrowthRateCheck
          label="Earnings Growth"
          url={`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`}
          metricName="eps"
        />
        <GrowthRateCheck
          label="Sales Growth"
          url={`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=10`}
          metricName="revenue"
        />
        <GrowthRateCheck
          label="Cash Flow Growth"
          url={`https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=10`}
          metricName="freeCashFlow"
        />
        <DebtCheck symbol={symbol} />
        <InsiderTradesCheck symbol={symbol} />
        <ProfitabilityCheck symbol={symbol} />
        <DividendsCheck symbol={symbol} />
      </Row>
    </>
  )
}

export default Profile
