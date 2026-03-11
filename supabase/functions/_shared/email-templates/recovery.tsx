/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your 40² password</Preview>
    <Body style={main}>
      <Container style={container}>
        <div style={logoWrap}><span style={logo}>40²</span></div>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>
          No worries — it happens to the best of us! Click below to choose a new password and get back to practicing. 💪
        </Text>
        <Button style={button} href={confirmationUrl}>Reset Password</Button>
        <Text style={footer}>If you didn't request this, you can safely ignore this email. Your password won't change.</Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Space Grotesk', Arial, sans-serif" }
const container = { padding: '32px 28px' }
const logoWrap = { textAlign: 'center' as const, marginBottom: '24px' }
const logo = { display: 'inline-block', background: 'linear-gradient(135deg, hsl(265, 89%, 58%), hsl(340, 85%, 60%))', color: '#ffffff', fontSize: '24px', fontWeight: 'bold' as const, padding: '12px 20px', borderRadius: '16px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: 'hsl(240, 10%, 10%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '14px', color: 'hsl(240, 5%, 50%)', lineHeight: '1.6', margin: '0 0 24px' }
const button = { backgroundColor: 'hsl(265, 89%, 58%)', color: '#ffffff', fontSize: '14px', fontWeight: '600' as const, borderRadius: '16px', padding: '14px 24px', textDecoration: 'none', display: 'block', textAlign: 'center' as const }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0', textAlign: 'center' as const }
