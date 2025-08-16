# UI Derrick - Custom Shadcn/UI Component Registry

A comprehensive component registry featuring reusable React components built on top of [shadcn/ui](https://ui.shadcn.com). Share and distribute your custom components just like the official shadcn/ui library.

🌐 **Live Demo**: [https://ui.derrick.rw](https://ui.derrick.rw)

## ✨ Features

- 🎯 **Easy Installation**: Install components with `npx shadcn add`
- 🔍 **Search Functionality**: Built-in search capabilities
- 🌳 **Tree Components**: Advanced organization unit tree with lazy loading
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Fully Customizable**: Built with Tailwind CSS
- 🚀 **TypeScript Support**: Full type safety
- 📚 **Well Documented**: Comprehensive examples and API docs

## 🚀 Quick Start

### Install a Component

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
npx shadcn@latest add https://ui.derrick.rw/r/organisation-unit-tree.json
```

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
