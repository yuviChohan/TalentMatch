// pages/api/wordpress-webhook.js

export default function handler(req, res) {
    // Handle incoming webhook payload from WordPress
    if (req.method === 'POST') {
      const payload = req.body; // Extract payload data
      
      // Process payload data as needed
      
      console.log('Received webhook payload:', payload);
  
      // Send a response indicating successful receipt
      res.status(200).json({ message: 'Webhook payload received successfully.' });
    } else {
      // Return a 405 Method Not Allowed error for non-POST requests
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  