import type { NextApiRequest, NextApiResponse } from 'next';

// This is the Apps Script Web App URL you get after deploying as a web app
// Make sure to set this in your environment variables for production
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxswHrs9OM0d_q1ZZIsgglSQsWf5derQmxV6PuPlMtCYWTpmoycCoytBUmCxB5ndRDY/exec';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYVPJZo8ZJy6fLkPeGpAqU1m-gfCLGUDiOI8rsW1ryvOqpiAUrAed-BzUkuiqkpMbT0q98bPntSMLp/pub?output=csv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, why } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
      }

      // Forward the request to Google Apps Script
      const scriptRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, why: why || "Signed up from landing page" }),
      });

      if (!scriptRes.ok) {
        console.error('Apps Script error:', await scriptRes.text());
        return res.status(500).json({ error: 'Failed to sync with backend' });
      }

      const result = await scriptRes.json();

      return res.status(200).json({
        success: true,
        message: result.status === "WAITLIST" 
          ? "You've been added to our waitlist! We'll notify you as soon as a spot opens."
          : "Welcome to Founderlings! Your seat is secured.",
        status: result.status,
        memberNumber: result.count,
        email: email,
      });
    } catch (error) {
      console.error('Founderlings signup error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      // We can use the public CSV for faster GET requests if enabled,
      // or fetch directly from the script. CSV is usually cached and faster.
      const sheetRes = await fetch(SHEET_CSV_URL);

      if (!sheetRes.ok) {
        // Fallback to Apps Script if CSV export is not available
        const scriptRes = await fetch(APPS_SCRIPT_URL);
        if (!scriptRes.ok) {
          return res.status(500).json({ error: 'Failed to fetch count' });
        }
        const data = await scriptRes.json();
        return res.status(200).json({ count: data.count });
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

