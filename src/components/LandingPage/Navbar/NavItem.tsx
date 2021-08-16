import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

const NavListItem = styled.li`
  border-bottom: 3px solid transparent;
  height: 68px;
  display: flex;
  align-items: center;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  &:hover {
    background: ${(p) => p.theme.palette.neutral[200]};
    border-bottom: 3px solid ${(p) => p.theme.palette.neutral[600]};

    a {
      color: ${(p) => p.theme.palette.neutral[1000]};
    }
  }

  &:active,
  &:focus {
    border-bottom: 3px solid ${(p) => p.theme.palette.primary[600]};
    a {
      color: ${(p) => p.theme.palette.primary[600]};
    }
  }
`

const StyledA = styled.a`
  padding: 3px 15px 0;
  font-size: 12px;

  color: ${(p) => p.theme.palette.neutral[600]};
  text-transform: uppercase;
  letter-spacing: 1px;
  height: 68px;
  display: flex;
  align-items: center;
`

const NavItem = ({ title, to = '', href, target, onClick, variant }: any) => (
  // @ts-ignore
  <NavListItem variant={variant}>
    {to ? (
      <Link href={to}>
        <StyledA>{title}</StyledA>
      </Link>
    ) : (
      <StyledA onClick={onClick} href={href ? href : undefined} target={target}>
        {title}
      </StyledA>
    )}
  </NavListItem>
)

export default NavItem
