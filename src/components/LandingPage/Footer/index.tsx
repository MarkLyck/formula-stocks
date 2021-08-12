import React from 'react'
import { Space, Typography } from 'antd'
import styled from '@emotion/styled'
import { useToggle } from 'ahooks'

import { SocialMediaLink, Disclaimer } from 'src/ui-components'
import { COMPANY_NAME, SOCIAL_MEDIA_LINKS } from 'src/common/constants'
import TermsModal from 'src/components/LandingPage/Modals/Legal/Terms'
import PrivacyPolicyModal from 'src/components/LandingPage/Modals/Legal/PrivacyPolicy'

const { Link } = Typography

const Logo = styled.img`
  height: 48px;
  max-width: 100%;
  margin-bottom: 16px;

  @media (max-width: ${(p) => p.theme.breakpoints.extraSmall}) {
    height: auto;
    width: 100%;
  }
`

const Container = styled.div`
  background-color: #3c3fa3;
  background-image: url('/images/space/stars.svg'), url('/images/space/footer-transition.svg');
  background-size: 100%;
  background-repeat: repeat, no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px;
  padding-top: 400px;
  text-align: center;

  @media (max-width: ${(p) => p.theme.breakpoints.large}) {
    padding-top: 300px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.medium}) {
    padding-top: 250px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.small}) {
    padding-top: 200px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.extraSmall}) {
    padding-top: 100px;
  }
`

const MainDisclaimer = styled(Disclaimer)`
  color: ${(p) => p.theme.palette.text[100]};
  text-align: justify;
  line-height: 1.4rem;
  max-width: 1400px;
  margin: 0 auto;
`

const FooterDisclaimer = styled(Disclaimer)`
  color: ${(p) => p.theme.palette.text[100]};
  line-height: 1.3rem;
`

const StyledLink = styled(Link)`
  && {
    text-decoration: underline;
    color: white;
  }
`

const Footer = () => {
  const [termsVisible, { toggle: toggleTerms }] = useToggle()
  const [privacyPolicyVisible, { toggle: togglePrivacyPolicy }] = useToggle()

  return (
    <Container>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Logo src="/logos/formula_stocks/logo_horizontal_white.svg" />
        <Space size="middle">
          {SOCIAL_MEDIA_LINKS.map((link) => (
            <SocialMediaLink key={link.href} {...link} />
          ))}
        </Space>
        <FooterDisclaimer>
          By accessing this website and any pages thereof, you agree to be bound by our{' '}
          <StyledLink onClick={() => toggleTerms()}>Terms of Use</StyledLink> and{' '}
          <StyledLink onClick={() => togglePrivacyPolicy()}>Privacy Policy</StyledLink>.
        </FooterDisclaimer>
        <MainDisclaimer>
          {COMPANY_NAME} is an information provider, not an investment advisory service or a registered investment
          advisor, does not offer individual investment advice and does not manage client funds. Unless otherwise
          specified, all return figures shown above are for illustrative purposes only. {COMPANY_NAME} does not purport
          to tell which securities individual customers should buy or sell for themselves and recommendations are not
          solicitations to buy or sell a security, Like a newsletter {COMPANY_NAME} offer a model portfolio, which
          members can choose to use as an input in their own decisionmaking process. {COMPANY_NAME} assumes no
          responsibility or liability for your investment results. You understand and acknowledge that there is risk
          involved in investing in securities. For technical reasons the website displays up-to-date graph data
          refreshed daily based on backtested data. Backtested performance results have certain inherent limitations, as
          they could potentially be designed with some benefit of hindsight, even though every effort have been made to
          avoid such risk. Unlike an actual performance record such as the one mentioned above, backtested results do
          not represent actual trading and may not be impacted by brokerage and other slippage fees. Also, since
          transactions may or may not have been executed, results may have under- or over-compensated for impact, if
          any, of certain market factors, such as lack of market liquidity or level of participation. Past results of
          any investment system are not necessarily indicative of future results. No representation is being made that
          you are likely to achieve profits or losses similar to those shown here. In addition, information, system
          output, articles, and other features of our products are provided for educational and informational purposes
          only and should not be construed as investment advice. It remains the user’s exclusive responsibility to
          review and evaluate the content and to determine whether to accept or reject any content. {COMPANY_NAME}{' '}
          expresses no opinion as to whether any of the website content is appropriate for a user’s investment
          portfolio, strategy, financial situation, or investment objective(s).
        </MainDisclaimer>
      </Space>
      <TermsModal visible={termsVisible} onClose={() => toggleTerms()} />
      <PrivacyPolicyModal visible={privacyPolicyVisible} onClose={() => togglePrivacyPolicy()} />
    </Container>
  )
}

export default Footer
