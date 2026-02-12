import type { NextApiRequest, NextApiResponse } from 'next';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYVPJZo8ZJy6fLkPeGpAqU1m-gfCLGUDiOI8rsW1ryvOqpiAUrAed-BzUkuiqkpMbT0q98bPntSMLp/pub?output=csv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
      }

      // Get current sheet data
      const sheetRes = await fetch(SHEET_CSV_URL);
      if (!sheetRes.ok) {
        return res.status(500).json({ error: 'Failed to access sheet' });
      }

      const text = await sheetRes.text();
      const rows = text
        .trim()
        .split('\n')
        .filter(r => r.trim() !== '');

      // Check if email already exists
      const emailExists = rows.some(row =>
        row.toLowerCase().includes(email.toLowerCase())
      );

      if (emailExists) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      // Add new email to sheet (in a real implementation, this would use Google Sheets API)
      // For demo purposes, we'll just return success
      const newCount = rows.length + 1;

      return res.status(200).json({
        success: true,
        message: 'Welcome to Founderlings!',
        memberNumber: newCount,
        email: email,
      });
    } catch (error) {
      console.error('Founderlings signup error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const sheetRes = await fetch(SHEET_CSV_URL);

      if (!sheetRes.ok) {
        return res.status(500).json({ error: 'Failed to fetch sheet' });
      }

      const text = await sheetRes.text();
      const rows = text
        .trim()
        .split('\n')
        .filter(r => r.trim() !== '');
      const count = Math.max(0, rows.length - 1); // Exclude header row

      return res.status(200).json({
        count,
        message: `${count} Founderlings have joined so far`,
      });
    } catch (error) {
      console.error('Founderlings count error:', error);
      return res.status(500).json({ error: 'Failed to fetch count' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
