import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import cookie from 'cookie'

import { P } from './Typography'
import Button from './Button'

const Container = styled.div`
  padding: 16px 16px;
  position: relative;
  display: flex;
  align-items: center;
`

const SlideUp = keyframes`
  from {
    transform: translateY(150%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1;
  }
`

const CloseButton = styled.button`
  font-size: 16px;
  color: #484848;
  opacity: 0.5;
  position: absolute;
  top: 2px;
  right: 4px;
  padding: 0;
  transform: rotate(45deg);
`

const Banner = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 200;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;

  animation: ${SlideUp} 0.3s ease-out;
`

export default function AppBanner() {
  const [displayBanner, setDisplayBanner] = useState(false)

  useEffect(() => {
    const bannerDismissed =
      cookie.parse(document.cookie).bannerDismissed || false

    setDisplayBanner(
      navigator.userAgent.toLowerCase().includes('android') && !bannerDismissed
    )
  }, [])

  if (displayBanner)
    return (
      <Banner>
        <Container>
          <P style={{ flex: 1 }}>Download our Android app</P>
          <a href="/download-apk">
            <Button>Download</Button>
          </a>
          <CloseButton
            onClick={() => {
              document.cookie = cookie.serialize('bannerDismissed', true, {
                maxAge: 60 * 60 * 24 * 7 // 1 week
              })

              setDisplayBanner(false)
            }}
          >
            +
          </CloseButton>
        </Container>
      </Banner>
    )
  return null
}
