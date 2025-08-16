"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BlogPost() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const CodeBlock = ({ children, language, id }: { children: string; language: string; id: string; }) => (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg border border-gray-700">
        <span className="text-blue-400 font-medium">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(children, id)}
          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {copiedCode === id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto border border-gray-700 border-t-0">
        <code className="text-sm leading-relaxed">{children}</code>
      </pre>
    </div>
  );

  return (
    <article className="min-h-screen bg-gray-950 text-gray-100">
      <div className="w-full h-80 md:h-96 relative overflow-hidden">
        <Image
          src="/shadcn-image.jpg"
          alt="Colorful 3D geometric shapes"
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How to Create Your Own Shadcn/UI Component Registry
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-400 mb-4">
            <span>Derrick Nuby — Software Engineer</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mb-8">
            <span>August 16, 2025</span>
            <span>•</span>
            <span>7 minutes</span>
          </div>
        </header>

        {/* Introduction */}
        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Shadcn/ui has revolutionized how developers think about UI components. Unlike traditional component libraries that come as black-box npm packages, shadcn/ui provides beautiful, accessible components that you actually own. When you install a shadcn component, the code lands directly in your project - fully customizable, no dependencies to worry about, no version conflicts.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            But here&apos;s what makes shadcn truly powerful: the <strong className="text-white">registry system</strong>. This innovative approach lets you distribute components without the traditional npm packaging friction. Instead of installing packages, you pull components directly into your codebase where you have complete control.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            The benefits are game-changing:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-green-400">🎯</span>
                Full Ownership
              </h3>
              <p className="text-gray-300 text-sm">Components become part of your codebase. Customize, modify, and extend them however you need.</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-blue-400">📦</span>
                No Dependencies
              </h3>
              <p className="text-gray-300 text-sm">No more dependency hell. No version conflicts. Just clean code in your project.</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-purple-400">⚡</span>
                Easy Distribution
              </h3>
              <p className="text-gray-300 text-sm">Share components with a simple URL. No npm publishing, no complex setup.</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-orange-400">🔧</span>
                Perfect for Teams
              </h3>
              <p className="text-gray-300 text-sm">Maintain consistency across projects while allowing customization.</p>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed">
            Ready to create your own component registry? In this guide, I&apos;ll show you how to build a registry that others can install with a simple{" "}
            <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">npx shadcn add</code>{" "}
            command - just like the official shadcn/ui components.
          </p>
        </div>

        {/* What We're Building */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What We&apos;re Building</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-6 text-lg">By the end of this tutorial, you&apos;ll have:</p>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Your own component registry hosted online</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>
                  A reusable{" "}
                  <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
                    OrganisationUnitTree
                  </code>{" "}
                  component
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Your own branded CLI tool published to npm</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>The ability for others to install your components with:</span>
              </div>
            </div>
            <CodeBlock language="bash" id="intro-code-1">
              {`# Using the official shadcn CLI
npx shadcn add https://ui.derrick.rw/r/organisation-unit-tree.json`}
            </CodeBlock>
            <p className="text-center text-gray-400 my-4">or with your branded CLI:</p>
            <CodeBlock language="bash" id="intro-code-2">
              {`# Using your custom CLI
npx @derricknuby/ui@latest add organisation-unit-tree`}
            </CodeBlock>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Prerequisites</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Node.js 18+ installed</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Basic knowledge of React and TypeScript</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>A GitHub account (for hosting)</span>
            </div>
          </div>
        </section>

        {/* Step 1 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 1: Initialize Your Next.js Project
          </h2>
          <p className="text-gray-300 mb-6">
            First, let&apos;s create a new Next.js project with shadcn/ui:
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="https://nextjs.org/docs/getting-started/installation"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Next.js Installation <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a
              href="https://ui.shadcn.com/docs/installation/next"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Initialize Shadcn <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 2: Install Required Components
          </h2>
          <p className="text-gray-300 mb-6">Install the base components we&apos;ll need:</p>
          <CodeBlock language="bash" id="step2">
            {`npx @derricknuby/ui@latest add input button badge card`}
          </CodeBlock>
        </section>

        {/* Step 3 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 3: Create the Registry Structure
          </h2>
          <p className="text-gray-300 mb-6">Create the required folder structure:</p>
          <CodeBlock language="bash" id="step3-1">
            {`# Create registry directories
mkdir -p registry/default/ui`}
          </CodeBlock>
          <p className="text-gray-300 my-6">
            Your project structure should now look like:
          </p>
          <CodeBlock language="bash" id="step3-2">
            {`my-component-registry/
├── registry/
│   └── default/
│       └── ui/
├── public/
│   └── r/ (this is auto generated)
├── src/
│   └── components/
│       └── ui/
└── registry.json (we'll create this)`}
          </CodeBlock>
        </section>

        {/* Step 4 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Step 4: Create Your Component</h2>
          <p className="text-gray-300 mb-6">
            Create the{" "}
            <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">OrganisationUnitTree</code>{" "}
            component:
          </p>
          <CodeBlock language="bash" id="step4-1">
            {`# Create the component file
touch registry/default/ui/organisation-unit-tree.tsx`}
          </CodeBlock>
          <p className="text-gray-300 my-6">
            Add the following code to{" "}
            <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
              registry/default/ui/organisation-unit-tree.tsx
            </code>
            :
          </p>
          <CodeBlock language="typescript" id="step4-2">
            {`"use client"

import type React from "react"

import { useCallback, useEffect, useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Search, Users, ChevronDown, ChevronRight, X } from 'lucide-react'
import { cn } from "@/lib/utils"

// ... continue the component`}
          </CodeBlock>
        </section>

        {/* Step 5 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 5: Create Registry Configuration
          </h2>
          <p className="text-gray-300 mb-6">
            Create <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">registry.json</code>{" "}
            in your project root:
          </p>
          <CodeBlock language="json" id="step5">
            {`{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "my-component-registry",
  "homepage": "https://ui.derrick.rw",
  "items": [
    {
      "name": "organisation-unit-tree",
      "type": "registry:ui",
      "title": "Organisation Unit Tree",
      "description": "A tree component for selecting organisation units with lazy loading support",
      "files": [
        {
          "path": "registry/default/ui/organisation-unit-tree.tsx",
          "type": "registry:ui"
        }
      ],
      "dependencies": ["lucide-react"],
      "registryDependencies": ["input", "button", "badge", "card"]
    }
  ]
}`}
          </CodeBlock>
        </section>

        {/* Step 6 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Step 6: Build the Registry</h2>
          <p className="text-gray-300 mb-6">
            Run the shadcn build command to generate the registry files:
          </p>
          <CodeBlock language="bash" id="step6">
            {`npx shadcn build`}
          </CodeBlock>
          <p className="text-gray-300 mt-6">
            This creates JSON files in the{" "}
            <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">public/r/</code> directory
            that can be consumed by the shadcn CLI.
          </p>
        </section>

        {/* Step 7 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Step 7: Deploy Your Registry</h2>
          <p className="text-gray-300 mb-6">
            Deploy your project to Vercel (or your preferred hosting):
          </p>
          <CodeBlock language="bash" id="step7">
            {`https://your-domain.vercel.app/r/organisation-unit-tree.json`}
          </CodeBlock>
        </section>

        {/* Step 8 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 8: Create Your Own CLI Tool
          </h2>
          <p className="text-gray-300 mb-6">
            Take your registry to the next level by creating your own CLI tool. This allows users to install your components with a branded command like{" "}
            <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">npx @derricknuby/ui@latest add component</code>
          </p>

          <h3 className="text-2xl font-semibold text-white mb-6">Create CLI Structure</h3>
          <CodeBlock language="bash" id="step8-1">
            {`# Create CLI directory
mkdir cli && cd cli

# Initialize package.json
npm init -y

# Install dependencies
npm install commander ora node-fetch
npm install -D typescript @types/node @types/node-fetch`}
          </CodeBlock>

          <h3 className="text-2xl font-semibold text-white mb-6">Configure package.json</h3>
          <CodeBlock language="json" id="step8-2">
            {`{
  "name": "@derricknuby/ui",
  "version": "0.1.0",
  "description": "CLI to add beautiful, reusable components from ui-derrick registry",
  "bin": {
    "ui-derrick": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  }
}`}
          </CodeBlock>

          <h3 className="text-2xl font-semibold text-white mb-6">Create CLI Source Code</h3>
          <p className="text-gray-300 mb-6">Create <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">src/index.ts</code>:</p>
          <CodeBlock language="typescript" id="step8-3">
            {`#!/usr/bin/env node
import { program } from 'commander';
import { execSync } from 'child_process';
import ora from 'ora';

program
  .name('ui-derrick')
  .description('CLI to add components from ui-derrick registry')
  .version('0.1.0');

program
  .command('add')
  .argument('<component>', 'Component to add')
  .action(async (component: string) => {
    const spinner = ora(\`Adding \${component}...\`).start();
    
    try {
      const url = \`https://ui.derrick.rw/r/\${component}.json\`;
      execSync(\`npx shadcn@latest add \${url}\`, { stdio: 'inherit' });
      spinner.succeed(\`Component "\${component}" added successfully!\`);
    } catch (error) {
      spinner.fail(\`Failed to add component: \${error}\`);
    }
  });

program.parse(process.argv);`}
          </CodeBlock>

          <h3 className="text-2xl font-semibold text-white mb-6">Build and Publish</h3>
          <CodeBlock language="bash" id="step8-4">
            {`# Build the CLI
npm run build

# Test locally
node dist/index.js --help

# Login to npm
npm login

# Publish to npm
npm publish --access public`}
          </CodeBlock>

          <p className="text-gray-300 mt-6">
            Now users can install your components using your branded CLI:
          </p>
          <CodeBlock language="bash" id="step8-5">
            {`# Install your component with your CLI
npx @derricknuby/ui@latest add organisation-unit-tree

# List available components
npx @derricknuby/ui@latest list`}
          </CodeBlock>
        </section>

        {/* Step 9 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Step 9: Test Installation from Your Registry
          </h2>
          <p className="text-gray-300 mb-6">Now anyone can install your component using either method:</p>

          <h3 className="text-xl font-semibold text-white mb-4">Option 1: Direct shadcn command</h3>
          <CodeBlock language="bash" id="step9-1">
            {`npx shadcn@latest add https://ui.derrick.rw/r/organisation-unit-tree.json`}
          </CodeBlock>

          <h3 className="text-xl font-semibold text-white mb-4">Option 2: Your branded CLI</h3>
          <CodeBlock language="bash" id="step9-2">
            {`npx @derricknuby/ui@latest add organisation-unit-tree`}
          </CodeBlock>
        </section>

        {/* Advanced Features */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Advanced Features</h2>

          <h3 className="text-2xl font-semibold text-white mb-6">Adding Multiple Components</h3>
          <p className="text-gray-300 mb-6">
            To add more components to your registry, simply:
          </p>
          <div className="space-y-4 text-gray-300 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>
                Create new component files in{" "}
                <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
                  registry/default/ui/
                </code>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>
                Add new items to your{" "}
                <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">registry.json</code>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>
                Run{" "}
                <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">npx shadcn build</code>{" "}
                again
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mb-6">v0.dev Integration</h3>
          <p className="text-gray-300 mb-6">
            Create a link to open your component in v0.dev:
          </p>
          <CodeBlock language="bash" id="advanced">
            {`https://v0.dev?registry=https://your-domain.vercel.app/r/organisation-unit-tree.json`}
          </CodeBlock>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Conclusion</h2>
          <div className="mb-8">
            <p className="text-gray-300 mb-8 text-lg">
              Congratulations! You&apos;ve built a complete component ecosystem with both a registry and a custom CLI tool. Users can now install your components with a simple command, and you can iterate and improve them over time.
            </p>

            <h4 className="text-xl font-semibold text-white mb-6">What you&apos;ve accomplished:</h4>
            <div className="space-y-4 text-gray-300 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Created a component registry with professional distribution</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Built and published your own CLI tool to npm</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Enabled easy component installation with branded commands</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Set up automatic dependency management</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✅</span>
                <span>Created a foundation for community contributions</span>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-white mb-6">
              The complete{" "}
              <code className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-sm font-mono">
                OrganisationUnitTree
              </code>{" "}
              component we built includes:
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Search functionality with real-time filtering</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Single/multi selection modes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Lazy loading support for large datasets</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Level restrictions and accessibility features</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Full keyboard navigation support</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400">•</span>
                <span>Mobile-responsive design</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-900/20 border border-blue-400/30 rounded-lg">
              <h5 className="text-blue-400 font-semibold mb-3">🚀 Ready to Use</h5>
              <p className="text-gray-300 mb-4">Your CLI is now live on npm! Try it out:</p>
              <code className="bg-gray-800 text-blue-400 px-4 py-2 rounded block">
                npx @derricknuby/ui@latest add organisation-unit-tree
              </code>
            </div>
          </div>

          <p className="text-2xl font-medium text-white text-center mb-8">
            Start building your component library ecosystem today and empower developers worldwide!
          </p>
        </section>

        {/* Resources */}
        <section className="pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Resources</h2>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://ui.shadcn.com"
              className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Shadcn/UI Documentation <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a
              href="https://ui.shadcn.com/schema/registry.json"
              className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Component Registry Schema <ExternalLink className="ml-1 h-4 w-4" />
            </a>
            <a
              href="https://github.com/derrick-nuby/ui-derrick"
              className="flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Example Registry Source <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}