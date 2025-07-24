import PDFDocument from 'pdfkit';
import path from 'path';

export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = req.user;

    console.log('📥 Certificate API called with courseId:', courseId);

    const doc = new PDFDocument();

    // Store PDF in buffer
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=certificate.pdf');
      res.send(pdfData);
    });

    // ✅ Simple styled certificate
    doc.fontSize(24).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Awarded to: ${user.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`For completing course ID: ${courseId}`, { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Certificate generation error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
