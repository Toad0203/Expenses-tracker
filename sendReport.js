// fvux hgqa dtpi dwya

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

function getLatestHtmlFile() {
  const reportsDir = './cypress/reports';

  const files = fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => ({
      name: file,
      time: fs.statSync(path.join(reportsDir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  if (files.length === 0) {
    return null;
  }

  return path.join(reportsDir, files[0].name);
}

async function sendEmail() {
  try {
    const latestReport = getLatestHtmlFile();

    if (!latestReport) {
      console.log('No HTML report found. Email will not be sent.');
      return;
    }

    console.log('Sending latest report:', latestReport);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tanmayprasad2@gmail.com',
        pass: 'fvux hgqa dtpi dwya',
      },
    });

    await transporter.sendMail({
      from: 'tanmayprasad2@gmail.com',
      to: 'tanmayrandomuse@gmail.com',
      subject: `Cypress Test Report - ${path.basename(latestReport)}`,
      text: 'Attached is the report for the latest Cypress test run.',
      attachments: [{ path: latestReport }],
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendEmail();
