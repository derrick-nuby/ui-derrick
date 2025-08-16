# UI Derrick CLI

A command-line interface for easily adding beautiful, reusable components from the ui-derrick registry to your React project.

## Installation

You can use the CLI directly with npx:

```bash
npx @derricknuby/ui@latest <command>
```

Or install it globally:

```bash
npm install -g @derricknuby/ui
ui-derrick <command>
```

## Usage

### List available components

To see all available components:

```bash
npx @derricknuby/ui@latest list
```

This will display a list of all available components along with descriptions and required dependencies.

### Add a component

To add a specific component to your project:

```bash
npx @derricknuby/ui@latest add <component-name>
```

For example:

```bash
npx @derricknuby/ui@latest add organisation-unit-tree
```

This will:

1. Check if shadcn/ui is initialized in your project
2. Create the appropriate `components/ui` directory (if it doesn't exist)
3. Download and add the component files
4. Automatically install any required dependencies using your preferred package manager (npm, yarn, or pnpm)
5. Install any required shadcn/ui components

The CLI automatically detects which package manager you're using based on lock files in your project.

## Prerequisites

Before using the CLI, make sure you have shadcn/ui initialized in your project:

```bash
npx shadcn@latest init
```

## Available Components

UI Derrick offers a variety of beautiful and reusable components, including:

- **OrganisationUnitTree**: A powerful tree component for displaying hierarchical organization structures with search, selection, lazy loading, and filtering capabilities
- **And more components coming soon!**

### Component Features

**OrganisationUnitTree:**

- Single/multi selection modes
- Lazy loading support
- Search and filtering
- Level restrictions
- Keyboard navigation
- Selection statistics
- Responsive design

For the complete list, run `npx @derricknuby/ui@latest list`.

## Dependencies

Components are built on top of shadcn/ui and may require additional packages like `lucide-react`. When you add a component, the CLI will automatically install the required dependencies and shadcn/ui components.

## Example Usage

After adding a component, you can use it in your project:

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

## Documentation

- Website: [https://ui.derrick.rw](https://ui.derrick.rw)
- Registry: [https://github.com/derrick-nuby/ui-derrick](https://github.com/derrick-nuby/ui-derrick)
- Shadcn/UI: [https://ui.shadcn.com](https://ui.shadcn.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to the [ui-derrick repository](https://github.com/derrick-nuby/ui-derrick).

## License

[MIT](LICENSE)
