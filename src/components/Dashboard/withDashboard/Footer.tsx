import { Layout, Divider, Typography } from 'antd'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { COMPANY_NAME } from 'src/common/constants'

const { Footer: AntDFooter } = Layout
const { Link } = Typography

const DashboardFooter = styled(AntDFooter)`
  text-align: center;
  padding-top: 0;
`

const helpArticles = {
  portfolio: {
    label: 'How to use the portfolio',
    tutorial: 'getting-started',
    code: 'w64pew',
  },
  trades: {
    label: 'How to use trades',
    tutorial: 'trades-tutorial',
    code: 'ymtmaw',
  },
  suggestions: {
    label: 'How to use suggestions',
    tutorial: 'suggestions-tutorial',
    code: '1si08de',
  },
  reports: {
    label: 'How to use AI reports',
    tutorial: 'ai-reports-tutorial',
    code: '1xjhxg9',
  },
}

const Footer = () => {
  const router = useRouter()
  const path = router.pathname.split('/')[2]

  // @ts-ignore
  let helpArticle = helpArticles[path] ? helpArticles[path] : helpArticles.portfolio
  const openHelpArticle = () => {
    $crisp.push(['do', 'helpdesk:article:open', ['en', helpArticle.code]])
  }

  return (
    <DashboardFooter>
      {COMPANY_NAME} ©{new Date().getFullYear()}
      <Divider type="vertical" />
      <Link onClick={openHelpArticle}>{helpArticle.label}</Link>
    </DashboardFooter>
  )
}

export default Footer
