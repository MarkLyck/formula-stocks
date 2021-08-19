import styled from '@emotion/styled'
import { Typography, Button, Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const { Title, Paragraph } = Typography

const Container = styled.div`
  position: relative;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 14px 0 rgba(111, 120, 156, 0.08);
  background: white;
  background-position-y: bottom;
  background-position-x: right;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/onboarding/animatedBackground.svg');
  margin-bottom: 24px;

  h2 {
    color: ${(p) => p.theme.palette.neutral[800]};
  }

  h5 {
    color: ${(p) => p.theme.palette.neutral[700]};
  }
`

const StyleParagraph = styled(Paragraph)`
  color: ${(p) => p.theme.palette.neutral[600]};
`

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 48px;
  width: 48px;
  background: none;
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border: none;
  color: ${(p) => p.theme.palette.neutral[600]};
  background: ${(p) => p.theme.palette.neutral[200]};

  &:hover {
    cursor: pointer;
    color: ${(p) => p.theme.palette.neutral[1000]};
  }

  &:active {
    background: ${(p) => p.theme.palette.neutral[300]};
  }
`

// background-image: url(${base64MovingSVGImage});
type GuideProps = {
  title: string
  subtitle: string
  text: string
  buttonText: string
  onClick: () => void
  onClose: () => void
}

export const Guide = ({ title, subtitle, text, buttonText, onClick, onClose }: GuideProps) => {
  return (
    <Container>
      <Title level={2}>{title}</Title>
      <Title level={5}>{subtitle}</Title>
      <StyleParagraph>{text}</StyleParagraph>
      <Button type="primary" onClick={onClick}>
        {buttonText}
      </Button>

      <Tooltip title="Dismiss">
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={['far', 'times']} />
        </CloseButton>
      </Tooltip>
    </Container>
  )
}
