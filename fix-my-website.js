import fs from 'fs';
import path from 'path';

console.log("🛠️  Starting the Acrossa Website Auto-Fixer...");

// 1. Force the correct index.html with the Tailwind CDN fallback
const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acrossa - Remote Operations</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-[#FFF2DF] text-[#3E2522] m-0 p-0">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

// 2. Force the correct Tailwind Config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

// 3. Force the correct PostCSS Config
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

// 4. Force the correct CSS file (killing Vite's dark mode)
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #FFF2DF !important;
  color: #3E2522 !important;
  margin: 0;
  padding: 0;
}`;

// 5. Force the correct main.jsx
const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

try {
  // Write files to the root directory
  fs.writeFileSync(path.join(process.cwd(), 'index.html'), htmlContent);
  fs.writeFileSync(path.join(process.cwd(), 'tailwind.config.js'), tailwindConfig);
  fs.writeFileSync(path.join(process.cwd(), 'postcss.config.js'), postcssConfig);
  console.log("✅ Root configuration files fixed.");

  // Write files to the src directory
  const srcPath = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath);
  }
  fs.writeFileSync(path.join(srcPath, 'index.css'), indexCss);
  fs.writeFileSync(path.join(srcPath, 'main.jsx'), mainJsx);
  
  // Delete the problematic App.css if it exists
  const appCssPath = path.join(srcPath, 'App.css');
  if (fs.existsSync(appCssPath)) {
    fs.unlinkSync(appCssPath);
    console.log("🗑️ Deleted conflicting App.css file.");
  }

  console.log("✅ Source files fixed.");
  console.log("🎉 ALL DONE! Go to your terminal, stop the server, and run 'npm run dev' again.");

} catch (error) {
  console.error("❌ Error fixing files:", error);
}