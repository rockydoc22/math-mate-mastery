/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to AlphaOmega — confirm your email to start grinding 🎮</Preview>
    <Body style={main}>
      <Container style={container}>
        <div style={logoWrap}>
          <span style={logo}>AΩ</span>
        </div>
        <Heading style={h1}>Welcome aboard! 🎮</Heading>
        <Text style={text}>
          You're one step away from joining{' '}
          <Link href={siteUrl} style={link}><strong>AlphaOmega</strong></Link>.
          Let's get you verified so you can start practicing!
        </Text>
        <Text style={text}>
          Confirm your email (<Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>) by clicking below:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify Email & Get Started
        </Button>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Space Grotesk', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const logoWrap = { textAlign: 'center' as const, marginBottom: '24px' }
const logo = { display: 'inline-block', background: 'linear-gradient(135deg, hsl(265, 89%, 58%), hsl(340, 85%, 60%))', color: '#ffffff', fontSize: '24px', fontWeight: 'bold' as const, padding: '12px 20px', borderRadius: '16px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: 'hsl(240, 10%, 10%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '14px', color: 'hsl(240, 5%, 50%)', lineHeight: '1.6', margin: '0 0 24px' }
const link = { color: 'hsl(265, 89%, 58%)', textDecoration: 'underline' }
const button = { backgroundColor: 'hsl(265, 89%, 58%)', color: '#ffffff', fontSize: '14px', fontWeight: '600' as const, borderRadius: '16px', padding: '14px 24px', textDecoration: 'none', display: 'block', textAlign: 'center' as const }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0', textAlign: 'center' as const }
