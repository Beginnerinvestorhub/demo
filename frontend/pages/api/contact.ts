import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required fields.',
      });
    }

    if (!email.includes('@')) {
      return res
        .status(400)
        .json({ error: 'Please provide a valid email address.' });
    }

    // Demo mode: simulate successful submission
    // In production, this would send an email via SendGrid, Resend, etc.
    console.log('Contact form submission:', { name, email, subject, message });

    return res.status(200).json({
      success: true,
      message:
        'Your message has been received. We will get back to you shortly.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res
      .status(500)
      .json({ error: 'Failed to process your message. Please try again.' });
  }
}
