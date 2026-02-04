const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reportsDir = './cypress/reports';

// Find all JSON files
const jsonFiles = fs
  .readdirSync(reportsDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({
    name: file,
    time: fs.statSync(path.join(reportsDir, file)).mtime.getTime(),
  }))
  .sort((a, b) => b.time - a.time);

if (jsonFiles.length === 0) {
  console.log('No JSON reports found.');
  process.exit(0);
}

// Pick the latest JSON file
const latestJsonFile = jsonFiles[0].name;
const latestJsonPath = path.join(reportsDir, latestJsonFile);

console.log('Latest JSON selected:', latestJsonFile);

// Create HTML filename with same base name
const baseName = latestJsonFile.replace('.json', '');
const htmlFileName = `${baseName}.html`;

console.log('HTML will be generated as:', htmlFileName);

// Generate HTML using same name
const command = `npx marge "${latestJsonPath}" --inline -f ${baseName} -o ${reportsDir}`;

execSync(command, { stdio: 'inherit' });

console.log('HTML report generated:', htmlFileName);
