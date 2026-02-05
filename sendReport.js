require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

function escapeHtml(text) {
  if (!text) return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getLatestFiles() {
  const reportsDir = './cypress/reports';

  const htmlFiles = fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => ({
      name: file,
      time: fs.statSync(path.join(reportsDir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  const jsonFiles = fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => ({
      name: file,
      time: fs.statSync(path.join(reportsDir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  return {
    latestHtml: htmlFiles.length ? path.join(reportsDir, htmlFiles[0].name) : null,
    latestJson: jsonFiles.length ? path.join(reportsDir, jsonFiles[0].name) : null,
  };
}

function extractTests(suites) {
  let tests = [];

  suites.forEach((suite) => {
    if (suite.tests) {
      suite.tests.forEach((test) => {
        tests.push({
          title: test.title,
          state: test.state,
          error: test.err && test.err.message ? escapeHtml(test.err.message) : null,
          stack: test.err && test.err.stack ? escapeHtml(test.err.stack) : null,
        });
      });
    }

    if (suite.suites && suite.suites.length > 0) {
      tests = tests.concat(extractTests(suite.suites));
    }
  });

  return tests;
}

function buildEmailBody(jsonPath) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const stats = data.stats;

  const allTests = extractTests(data.results[0].suites);

  const passedTests = allTests.filter((t) => t.state === 'passed');
  const failedTests = allTests.filter((t) => t.state === 'failed');

  const statusText = stats.failures > 0 ? 'TESTS FAILED' : 'ALL TESTS PASSED';
  const statusColor = stats.failures > 0 ? '#e74c3c' : '#2ecc71';

  let failedRows = failedTests
    .map(
      (t) => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd;">${t.title}</td>
      <td style="padding:8px; border:1px solid #ddd; color:#c0392b;">
        ${t.error ? t.error : 'No error message'}

      </td>
    </tr>
  `,
    )
    .join('');

  let passedRows = passedTests
    .map(
      (t) => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd;">${t.title}</td>
    </tr>
  `,
    )
    .join('');

  return `
  <div style="font-family: Arial, sans-serif; max-width:900px; margin:auto;">

    <h1 style="text-align:center; color:${statusColor};">
      ${statusText}
    </h1>

    <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
      <tr style="background:#f4f4f4;">
        <th style="padding:10px; border:1px solid #ddd;">Total</th>
        <th style="padding:10px; border:1px solid #ddd;">Passed</th>
        <th style="padding:10px; border:1px solid #ddd;">Failed</th>
        <th style="padding:10px; border:1px solid #ddd;">Pending</th>
      </tr>
      <tr style="text-align:center;">
        <td style="padding:10px; border:1px solid #ddd;">${stats.tests}</td>
        <td style="padding:10px; border:1px solid #ddd; color:green;">${stats.passes}</td>
        <td style="padding:10px; border:1px solid #ddd; color:red;">${stats.failures}</td>
        <td style="padding:10px; border:1px solid #ddd;">${stats.pending}</td>
      </tr>
    </table>

    <h2 style="color:#e74c3c;">Failed Tests (${failedTests.length})</h2>

    <table style="width:100%; border-collapse:collapse;">
      <tr style="background:#f9e6e6;">
        <th style="padding:10px; border:1px solid #ddd;">Test Name</th>
        <th style="padding:10px; border:1px solid #ddd;">Error Message</th>
      </tr>
      ${failedRows || "<tr><td colspan='2' style='padding:10px;'>No failed tests 🎉</td></tr>"}
    </table>

    <h2 style="color:#2ecc71; margin-top:30px;">Passed Tests (${passedTests.length})</h2>

    <table style="width:100%; border-collapse:collapse;">
      <tr style="background:#e6f9e6;">
        <th style="padding:10px; border:1px solid #ddd;">Test Name</th>
      </tr>
      ${passedRows}
    </table>

    <p style="margin-top:20px; font-size:12px; color:#555;">
      Generated automatically by Cypress Automation
    </p>

  </div>
  `;
}

async function sendEmail() {
  try {
    const { latestHtml, latestJson } = getLatestFiles();

    if (!latestJson) {
      console.log('No JSON report found.');
      return;
    }

    const emailBody = buildEmailBody(latestJson);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_REC,
      subject: `Cypress Results – ${path.basename(latestJson)}`,
      html: emailBody,
      attachments: latestHtml ? [{ path: latestHtml }] : [],
    });

    console.log('Custom compact HTML email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendEmail();
