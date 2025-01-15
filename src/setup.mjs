import { getUserPreferences } from './prompt.mjs';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function setupProject() {
 const { projectName, libraries, useTypeScript } =
  await getUserPreferences();

 // Create project with appropriate template
 const template = useTypeScript ? 'react-ts' : 'react';
 console.log(`Creating project structure for "${projectName}"...`);
 execSync(
  `npm create vite@latest ${projectName} --template ${template} -- --no-install`,
  {
   stdio: 'inherit',
  },
 );

 // Initialize package.json with basic structure
 const packageJsonPath = path.join(projectName, 'package.json');
 const packageJson = JSON.parse(
  fs.readFileSync(packageJsonPath, 'utf8'),
 );

 // Define dependencies
 const dependencies = {
  react: '^18.2.0',
  'react-dom': '^18.2.0',
 };

 const devDependencies = {
  '@vitejs/plugin-react': '^4.0.3',
  vite: '^4.4.5',
 };

 // Add TypeScript dependencies if needed
 if (useTypeScript) {
  devDependencies['@types/react'] = '^18.2.15';
  devDependencies['@types/react-dom'] = '^18.2.7';
  devDependencies['typescript'] = '^5.0.2';
 }

 // Add selected libraries to dependencies
 if (libraries.includes('framerMotion')) {
  dependencies['framer-motion'] = '^10.12.0';
 }
 if (libraries.includes('reactRouter')) {
  dependencies['react-router-dom'] = '^6.10.0';
 }
 if (libraries.includes('reactIcons')) {
  devDependencies['react-icons'] = '^4.8.0';
 }

 // Handle Tailwind setup
 if (libraries.includes('tailwind')) {
  devDependencies['tailwindcss'] = '^3.3.0';
  devDependencies['postcss'] = '^8.4.21';
  devDependencies['autoprefixer'] = '^10.4.14';

  // Create postcss.config.js
  const postCssConfigPath = path.join(
   projectName,
   'postcss.config.js',
  );
  const postCssConfigContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
  fs.writeFileSync(postCssConfigPath, postCssConfigContent);

  // Add Tailwind directives to CSS
  const cssPath = path.join(
   projectName,
   'src',
   useTypeScript ? 'index.css' : 'index.css',
  );
  const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
  fs.writeFileSync(cssPath, tailwindDirectives);
 }

 // Handle shadcn setup
 if (libraries.includes('shadcn')) {
  console.log('\nPreparing shadcn configuration...');

  // Move shadcn dependencies to devDependencies
  devDependencies['class-variance-authority'] = '^0.7.0';
  devDependencies['clsx'] = '^2.0.0';
  devDependencies['tailwind-merge'] = '^1.14.0';
  devDependencies['tailwindcss-animate'] = '^1.0.7';

  if (!libraries.includes('tailwind')) {
   devDependencies['tailwindcss'] = '^3.3.0';
   devDependencies['postcss'] = '^8.4.21';
   devDependencies['autoprefixer'] = '^10.4.14';
  }
 }

 // Update package.json
 packageJson.dependencies = dependencies;
 packageJson.devDependencies = devDependencies;

 // Add scripts
 packageJson.scripts = {
  dev: 'vite',
  build: 'vite build',
  preview: 'vite preview',
 };

 // Add TypeScript-specific scripts if needed
 if (useTypeScript) {
  packageJson.scripts.build = 'tsc && vite build';
 }

 fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2),
 );

 console.log('\nProject structure created successfully!');
 console.log('\nTo complete setup:');
 console.log(`1. cd ${projectName}`);
 console.log('2. npm install');
 if (libraries.includes('shadcn')) {
  console.log(
   '3. Run "npx shadcn@latest init" to initialize shadcn',
  );
  console.log('4. Follow the prompts to configure shadcn');
  console.log(
   '5. Use "npx shadcn-ui@latest add <component>" to add components',
  );
 }
}

export { setupProject };
