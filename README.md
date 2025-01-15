# 🚀 Michael Vite React Project Generator

A CLI tool to quickly scaffold React projects with Vite, including
optional support for TypeScript, Tailwind CSS, shadcn/ui, and other
popular libraries.

## ✨ Features

- 🛠️ Vite-powered React setup
- 🎨 Optional Tailwind CSS configuration
- 🔧 TypeScript support (optional)
- 📚 Integration with popular libraries:
  - shadcn/ui components
  - Framer Motion
  - React Router
  - React Icons

## 📦 Installation

```bash
npm install -g your-package-name
```

Or run directly using npx:

```bash
npx your-package-name
```

## 🚀 Quick Start

1. Run the CLI:

   ```bash
   npx your-package-name
   ```

2. Follow the interactive prompts to configure your project:

   - Project name
   - TypeScript/JavaScript
   - Libraries selection

3. Once the project is created:

   ```bash
   cd your-project-name
   npm install
   npm run dev
   ```

4. If you selected shadcn/ui:
   ```bash
   npx shadcn-ui@latest init
   ```
   Follow the prompts to complete the setup.

## 📖 Project Structure

```
your-project/
├── src/
│   ├── main.(jsx|tsx)    # Entry point
│   ├── App.(jsx|tsx)     # Root component
│   └── index.css         # Global styles
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── postcss.config.js     # PostCSS config (if using Tailwind)
└── tailwind.config.js    # Tailwind config (if selected)
```

## ⚙️ Configuration Options

### TypeScript

- Adds TypeScript dependencies
- Configures tsconfig.json
- Updates file extensions to .ts/.tsx

### Tailwind CSS

- Installs and configures Tailwind CSS
- Sets up PostCSS
- Adds base CSS directives

### shadcn/ui

- Configures required dependencies
- Prepares project for component installation
- Sets up necessary utility functions

### Additional Libraries

- **Framer Motion**: Animation library
- **React Router**: Routing solution
- **React Icons**: Icon library

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-project.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This will:

- Create a test project
- Verify project structure
- Check dependencies
- Validate configurations

## 📄 License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help:

- 📧 Email: your.email@example.com
- 🐛 Issues:
  [GitHub Issues](https://github.com/yourusername/your-project/issues)
- 💬 Discussions:
  [GitHub Discussions](https://github.com/yourusername/your-project/discussions)

---

Made with ❤️ by Michael Peter
