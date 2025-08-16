# UI Derrick - Custom Shadcn/UI Component Registry

[![npm version](https://badge.fury.io/js/%40derricknuby%2Fui.svg)](https://www.npmjs.com/package/@derricknuby/ui)
[![npm downloads](https://img.shields.io/npm/dm/@derricknuby/ui.svg)](https://www.npmjs.com/package/@derricknuby/ui)
[![GitHub license](https://img.shields.io/github/license/derrick-nuby/ui-derrick.svg)](https://github.com/derrick-nuby/ui-derrick/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/derrick-nuby/ui-derrick.svg)](https://github.com/derrick-nuby/ui-derrick/stargazers)

A comprehensive component registry featuring reusable React components built on top of [shadcn/ui](https://ui.shadcn.com). Share and distribute your custom components just like the official shadcn/ui library.

🌐 **Live Demo**: [https://ui.derrick.rw](https://ui.derrick.rw)  
📦 **npm Package**: [@derricknuby/ui](https://www.npmjs.com/package/@derricknuby/ui)

## ✨ Features

- 🎯 **Easy Installation**: Install components with `npx shadcn add` or our custom CLI
- 🔧 **Custom CLI Tool**: Use `npx @derricknuby/ui@latest` for branded experience
- 🔍 **Search Functionality**: Built-in search capabilities
- 🌳 **Tree Components**: Advanced organization unit tree with lazy loading
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Fully Customizable**: Built with Tailwind CSS
- 🚀 **TypeScript Support**: Full type safety
- 📚 **Well Documented**: Comprehensive examples and API docs

## 🚀 Quick Start

### Option 1: Use Our Custom CLI (Recommended)

```bash
# Install any component with our branded CLI
npx @derricknuby/ui@latest add organisation-unit-tree

# List all available components
npx @derricknuby/ui@latest list
```

### Option 2: Direct shadcn Installation

```bash
npx shadcn@latest add https://ui.derrick.rw/r/organisation-unit-tree.json
```

### Use the Component

```tsx
import { OrganizationTree } from "@/components/ui/organisation-unit-tree";

const data = [
  {
    id: "1",
    name: "Root Organization",
    children: [{ id: "2", name: "Department A", parentId: "1" }],
  },
];

export default function App() {
  return (
    <OrganizationTree
      data={data}
      onSelectionChange={(nodes, ids) => console.log("Selected:", ids)}
      showControls={true}
      showStats={true}
    />
  );
}
```

## 📦 Available Components

### OrganisationUnitTree

A powerful tree component for displaying hierarchical organization structures.

**Features:**

- Single/multi selection modes
- Lazy loading support
- Search and filtering
- Level restrictions
- Keyboard navigation
- Selection statistics
- Responsive design

**Installation:**

```bash
# Option 1: Use our custom CLI
npx @derricknuby/ui@latest add organisation-unit-tree

# Option 2: Direct shadcn command
npx shadcn@latest add https://ui.derrick.rw/r/organisation-unit-tree.json
```

## 🔧 Custom CLI Tool

We've created a custom CLI tool for better developer experience:

```bash
# Install components with our branded CLI
npx @derricknuby/ui@latest add <component-name>

# List all available components
npx @derricknuby/ui@latest list

# Get help
npx @derricknuby/ui@latest --help
```

**CLI Features:**

- 🎯 **Automatic Setup**: Checks for shadcn/ui initialization
- 📦 **Dependency Management**: Installs required packages automatically
- 🔗 **Registry Dependencies**: Handles shadcn/ui component dependencies
- 🎨 **Branded Experience**: Clean, professional CLI interface
- ⚡ **Fast Installation**: Direct integration with your project

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/derrick-nuby/ui-derrick.git
cd ui-derrick

# Install dependencies
npm install

# Run development server
npm run dev
```

### Building the Registry

```bash
# Build registry files
npx shadcn build

# This generates files in public/r/ directory
```

### Project Structure

```text
ui-derrick/
├── registry/                  # Component source files
│   └── default/
│       └── ui/
│           └── organisation-unit-tree.tsx
├── public/
│   └── r/                    # Generated registry files
├── src/
│   ├── app/                  # Next.js app directory
│   ├── components/           # UI components
│   └── lib/                  # Utilities
├── registry.json             # Registry configuration
└── README.md
```

## 📖 Documentation

Visit our [blog post](https://ui.derrick.rw) for a complete guide on:

- Creating your own component registry
- Adding new components
- Deployment strategies
- Best practices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components based on [shadcn/ui](https://ui.shadcn.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)

## 📬 Contact

### Derrick Nuby

- Website: [https://ui.derrick.rw](https://ui.derrick.rw)
- GitHub: [@derrick-nuby](https://github.com/derrick-nuby)

---

⭐ If this project helped you, please consider giving it a star!
