// pages/api/generate.js
// 二维码生成API


import QRCode from 'qrcode-svg';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const {
      content,
      padding = 4,
      width = 256,
      height = 256,
      color = "#000000",
      background = "#ffffff",
      ecl = "M",
      join = false,
      container = "svg",
      xmlDeclaration = true,
    } = req.body;

    try {
      const qrcode = new QRCode({
        content,
        padding: parseInt(padding, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        color,
        background,
        ecl,
        join,
        container,
        xmlDeclaration,
      });

      const svg = qrcode.svg();
      res.setHeader('Content-Type', 'image/svg+xml');
      res.status(200).send(svg);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
