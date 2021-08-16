import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { scroller } from 'react-scroll'

import { isBrowser } from 'src/common/utils/featureTests'
import useWindowSize from 'src/common/hooks/useWindowSize'
import LoginItems from 'src/components/LandingPage/Navbar/LoginItems'
import NavItem from './NavItem'

const Navbar = styled.div`
  width: 100%;
  height: 68px;
  position: ${(p: any) => (p.type === 'homepage' ? 'absolute' : 'static')};
  top: 0;
  z-index: 99;
  background: ${(p: any) => (p.type === 'homepage' ? 'transparent' : '#fff')};
  box-shadow: ${(p: any) => (p.type === 'homepage' ? 'none' : '0 2px 33px 0 rgb(0 0 0 / 5%);')};
`

const Container = styled.div`
  width: 100%;
  padding: 0 8%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
`

const LinkContainer = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  padding-left: 0px;
  padding: 0;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: static;
  padding-left: 0;
  width: 100%;
  list-style: none;
  margin-bottom: 0;

  @media (max-width: 1600px) {
    li:nth-of-type(4) {
      display: none;
    }
  }
  @media (max-width: 1500px) {
    li:nth-of-type(3) {
      display: none;
    }
  }
  @media (max-width: 1300px) {
    li:nth-of-type(2) {
      display: none;
    }
  }

  @media (max-width: 1100px) {
    display: none;
  }
`

const Logo = styled.img`
  display: flex;
  height: 44px;
  align-items: center;
  margin-right: 48px;
  background: white;
  border-radius: 4px;
  padding: 8px;
  margin-top: -7px;

  @media (max-width: 1100px) {
    margin-top: 0;
  }
`

const LogoPlaceholder = styled.div`
  width: 150px;
  margin-left: 7px;
`

// const openWhitePaper = () => window.open('/assets/whitepaper_2008.pdf', '_blank')

const Nav = ({ showSignup, type }: any) => {
  // @ts-ignore
  if (isBrowser && window.$crisp) $crisp.push(['do', 'chat:show'])
  const windowSize = useWindowSize()

  const goToPricing = () => {
    scroller.scrollTo('pricing', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -80,
    })
  }

  return (
    // @ts-ignore
    <Navbar type={type}>
      <Container>
        <LinkContainer>
          {isBrowser ? (
            <Link href="/">
              <Logo
                data-id="sales-navbar"
                src={
                  windowSize.width > 800
                    ? '/logos/formula_stocks/logo_horizontal.svg'
                    : '/logos/formula_stocks/logo_square.svg'
                }
              />
            </Link>
          ) : (
            <LogoPlaceholder />
          )}

          <NavLinks>
            {type !== 'homepage' && <NavItem variant="light" title="HOME" to="/" />}
            <NavItem variant="light" title="STRATEGY" to="/strategy" />
            <NavItem variant="light" title="RISK" to="/risk" />
            {type === 'homepage' && <NavItem variant="light" title="PRICING" onClick={goToPricing} href={false} />}
            <NavItem variant="light" title="FAQ" href="https://help.formulastocks.com/en/" target="_blank" />

            {/* <NavItem variant="light" title="WHITE PAPER" onClick={() => openWhitePaper()} /> */}
          </NavLinks>
          <LoginItems showSignup={showSignup} dark={type === 'homepage' ? false : true} />
        </LinkContainer>
      </Container>
    </Navbar>
  )
}

export default Nav
