import type { NextApiRequest, NextApiResponse } from 'next'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

type ResponseData = {
  secret: string
  qrCode: string
} | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const secret = speakeasy.generateSecret({
      name: 'MySecureApp',
      length: 20,
    })

    const dataUrl = await qrcode.toDataURL(secret.otpauth_url!)
    
    // In a real application, you would save this secret in a database
    // associated with the user's account
    
    res.status(200).json({ 
      secret: secret.base32,
      qrCode: dataUrl
    })
  } catch (error) {
    console.error('Error generating 2FA secret:', error)
    res.status(500).json({ error: 'Failed to generate QR code' })
  }
}