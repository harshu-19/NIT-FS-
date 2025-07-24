const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, course } = userData;

    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
    });

    // Output path
    const outputPath = path.join(__dirname, 'certificate-output.pdf');
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Load background certificate image (make sure it exists in the same folder)
    const backgroundPath = path.join(__dirname, 'certificate.png');
    if (fs.existsSync(backgroundPath)) {
      doc.image(backgroundPath, 0, 0, { width: 842, height: 595 });
    }

    // Add user details on top of the certificate
    doc
      .font('Helvetica-Bold')
      .fontSize(32)
      .fillColor('#000000')
      .text(name, 0, 260, {
        align: 'center',
      });

    doc
      .font('Helvetica')
      .fontSize(20)
      .text(`has successfully completed the ${course} course`, {
        align: 'center',
      });

    const currentDate = new Date().toLocaleDateString();
    doc
      .font('Helvetica-Oblique')
      .fontSize(16)
      .text(`Date: ${currentDate}`, 0, 520, { align: 'right', margin: 50 });

    doc.end();

    stream.on('finish', () => {
      resolve(outputPath); // Return path of generated PDF
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = generateCertificate;
