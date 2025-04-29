import type { NextApiRequest, NextApiResponse } from 'next'
import speakeasy from 'speakeasy'

type RequestData = {
  token: string
  secret: string
}

type ResponseData = {
  message: string
} | {
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { token, secret } = req.body as RequestData

    if (!token || !secret) {
      return res.status(400).json({ error: 'Token and secret are required' })
    }

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1 // Allow 1 time step before/after for clock drift
    })

    if (verified) {
      // In a real application, you would update the user's profile in the database
      // to mark 2FA as enabled
      
      res.status(200).json({ message: 'Token verified successfully!' })
    } else {
      res.status(400).json({ error: 'Invalid token' })
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    res.status(500).json({ error: 'Server error during verification' })
  }
}