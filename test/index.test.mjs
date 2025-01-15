import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function runTest() {
 try {
  console.log('\n🚀 Starting CLI test...');
  console.log('Follow the prompts to test the project setup.\n');

  // Run the CLI tool - this will prompt for user input
  execSync('node bin/index.mjs', { stdio: 'inherit' });

  // After user completes the prompts, verify the setup
  console.log('\n🔍 Verifying project setup...');

  // Find the most recently created directory
  const currentDir = process.cwd();
  const directories = fs
   .readdirSync(currentDir)
   .filter((file) =>
    fs.statSync(path.join(currentDir, file)).isDirectory(),
   )
   .filter((dir) =>
    fs.existsSync(path.join(currentDir, dir, 'package.json')),
   );

  if (directories.length === 0) {
   throw new Error('No project directory found with package.json');
  }

  // Sort by creation time and get the most recent
  const projectDir = directories.sort((a, b) => {
   return (
    fs.statSync(path.join(currentDir, b)).ctimeMs -
    fs.statSync(path.join(currentDir, a)).ctimeMs
   );
  })[0];

  const projectPath = path.join(currentDir, projectDir);

  // Verify basic project structure
  console.log(`\nChecking project structure for "${projectDir}"...`);

  const requiredFiles = [
   'package.json',
   'src',
   'index.html',
   'vite.config.js',
  ];
  for (const file of requiredFiles) {
   const filePath = path.join(projectPath, file);
   if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file/directory: ${file}`);
   }
   console.log(`✓ Found ${file}`);
  }

  // Read package.json to verify setup
  const packageJson = JSON.parse(
   fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'),
  );

  console.log('\nVerifying dependencies...');
  // Check core dependencies
  const coreDeps = ['react', 'react-dom'];
  for (const dep of coreDeps) {
   if (!packageJson.dependencies[dep]) {
    throw new Error(`Missing core dependency: ${dep}`);
   }
   console.log(`✓ Found ${dep}`);
  }

  // Verify if tailwind is configured when selected
  if (fs.existsSync(path.join(projectPath, 'tailwind.config.js'))) {
   console.log('✓ Tailwind CSS configuration found');

   const postCssPath = path.join(projectPath, 'postcss.config.js');
   if (fs.existsSync(postCssPath)) {
    console.log('✓ PostCSS configuration found');
   }
  }

  // Check if it's a TypeScript project
  const isTypeScript = fs.existsSync(
   path.join(projectPath, 'tsconfig.json'),
  );
  if (isTypeScript) {
   console.log('✓ TypeScript configuration found');
  }

  console.log('\n✨ Test completed successfully!');
  console.log('\nNext steps for testing the project:');
  console.log(`1. cd ${projectDir}`);
  console.log('2. npm install');
  console.log('3. npm run dev');

  if (
   packageJson.dependencies['shadcn-ui'] ||
   packageJson.devDependencies['tailwindcss']
  ) {
   console.log('\nFor shadcn/ui setup:');
   console.log('4. npx shadcn-ui@latest init');
   console.log('5. Follow the prompts to complete shadcn setup');
  }
 } catch (err) {
  console.error('\n❌ Test failed:', err.message);
  process.exit(1);
 }
}

// Run the test
runTest().catch(console.error);
