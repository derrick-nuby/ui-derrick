#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = require("path");
const ora_1 = __importDefault(require("ora"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const child_process_1 = require("child_process");
// Read package.json for version info
const packageJson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', 'package.json'), 'utf8'));
const UI_DERRICK_REGISTRY_URL = 'https://raw.githubusercontent.com/derrick-nuby/ui-derrick/develop/registry.json';
const UI_DERRICK_BASE_URL = 'https://raw.githubusercontent.com/derrick-nuby/ui-derrick/develop/';
const TARGET_DIR = 'components/ui';
async function fetchRegistry(url) {
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch registry from ${url}: ${response.status}`);
    }
    return response.json();
}
async function fetchFile(url) {
    const response = await (0, node_fetch_1.default)(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file from ${url}: ${response.status}`);
    }
    return response.text();
}
// Detect package manager (npm, yarn, pnpm)
function detectPackageManager() {
    try {
        // Check for yarn.lock or package-lock.json
        if ((0, fs_1.existsSync)('yarn.lock')) {
            return 'yarn';
        }
        else if ((0, fs_1.existsSync)('pnpm-lock.yaml')) {
            return 'pnpm';
        }
        else {
            return 'npm'; // Default to npm
        }
    }
    catch (error) {
        return 'npm'; // Default to npm on error
    }
}
// Install dependencies using detected package manager
function installDependencies(dependencies) {
    const packageManager = detectPackageManager();
    const spinner = (0, ora_1.default)('Installing dependencies...').start();
    try {
        const installCommand = packageManager === 'yarn'
            ? `yarn add ${dependencies.join(' ')}`
            : packageManager === 'pnpm'
                ? `pnpm add ${dependencies.join(' ')}`
                : `npm install ${dependencies.join(' ')}`;
        (0, child_process_1.execSync)(installCommand, { stdio: 'ignore' });
        spinner.succeed(`Dependencies installed successfully with ${packageManager}`);
        return true;
    }
    catch (error) {
        spinner.fail(`Failed to install dependencies: ${error}`);
        console.log('\nPlease install them manually:');
        console.log(`${packageManager === 'yarn' ? 'yarn add' : packageManager === 'pnpm' ? 'pnpm add' : 'npm install'} ${dependencies.join(' ')}`);
        return false;
    }
}
// Display the welcome banner
function displayBanner() {
    console.log(`
┌────────────────────────────────────────────┐
│                                            │
│           Derrick UI CLI            │
│                                            │
│      Beautiful, animated components        │
│          for your React projects           │
│                                            │
│              Version: ${packageJson.version}               │
│                                            │
└────────────────────────────────────────────┘
  `);
}
commander_1.program
    .name('ui-derrick')
    .description('CLI to add beautiful, reusable components from ui-derrick registry to your app')
    .version(packageJson.version);
commander_1.program
    .command('add')
    .argument('<component>', 'The component to add (e.g., accordion, text-morph)')
    .description('Add a ui-derrick component to your project')
    .action(async (component) => {
    const spinner = (0, ora_1.default)(`Adding ${component}...`).start();
    try {
        // Fetch the ui-derrick registry
        const uiDerrickRegistry = await fetchRegistry(UI_DERRICK_REGISTRY_URL);
        const componentEntry = uiDerrickRegistry.items.find((item) => item.name === component);
        if (!componentEntry) {
            spinner.fail(`Component "${component}" not found in ui-derrick registry`);
            console.log('\nRun "npx @derricknuby/ui list" to see all available components');
            process.exit(1);
        }
        // Collect all files and dependencies
        const allFiles = [];
        const allDependencies = new Set(componentEntry.dependencies || []);
        // Process all files from registry.json
        for (const file of componentEntry.files) {
            const content = file.content ||
                (await fetchFile(`${UI_DERRICK_BASE_URL}${file.path}`));
            const fileName = file.path.split('/').pop();
            allFiles.push({ path: fileName, content });
        }
        // Create target directory if it doesn't exist
        if (!(0, fs_1.existsSync)(TARGET_DIR)) {
            (0, fs_1.mkdirSync)(TARGET_DIR, { recursive: true });
        }
        // Write all files to components/ui-derrick/
        for (const { path, content } of allFiles) {
            const filePath = (0, path_1.join)(TARGET_DIR, path);
            (0, fs_1.writeFileSync)(filePath, content);
            console.log(`✓ Added ${path} to ${filePath}`);
        }
        spinner.succeed(`Component "${component}" added successfully!`);
        // Install dependencies automatically
        const depsArray = Array.from(allDependencies);
        if (depsArray.length > 0) {
            const installSuccess = installDependencies(depsArray);
            // Add usage example
            if (componentEntry.title) {
                const pascalCaseName = component
                    .split('-')
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join('');
                console.log('\nExample usage:');
                console.log('```jsx');
                console.log(`import { ${pascalCaseName} } from '@/components/ui-derrick/${component}';`);
                console.log('\n// Then in your JSX:');
                console.log(`<${pascalCaseName} />`);
                console.log('```');
            }
        }
        else {
            console.log('No additional dependencies needed.');
        }
    }
    catch (error) {
        spinner.fail(`Error: ${error.message || error}`);
        process.exit(1);
    }
});
commander_1.program
    .command('list')
    .description('List all available ui-derrick components')
    .action(async () => {
    const spinner = (0, ora_1.default)('Fetching components...').start();
    try {
        // Fetch the ui-derrick registry
        const uiDerrickRegistry = await fetchRegistry(UI_DERRICK_REGISTRY_URL);
        spinner.succeed(`Found ${uiDerrickRegistry.items.length} components`);
        console.log('\nAvailable components:');
        console.log('====================\n');
        uiDerrickRegistry.items.forEach((item) => {
            console.log(`${item.name} - ${item.title}`);
            if (item.description) {
                console.log(`  ${item.description}`);
            }
            if (item.dependencies && item.dependencies.length > 0) {
                console.log(`  Dependencies: ${item.dependencies.join(', ')}`);
            }
            console.log('');
        });
        console.log('\nTo add a component run:');
        console.log('  npx @derricknuby/ui add <component-name>');
    }
    catch (error) {
        spinner.fail(`Error: ${error.message || error}`);
        process.exit(1);
    }
});
// Add a default command if no command is provided
commander_1.program.action(() => {
    displayBanner();
    console.log('A tool for adding beautiful, animated components to your React app\n');
    console.log('Available commands:');
    console.log('  add <component>  - Add a component to your project');
    console.log('    Example: npx @derricknuby/ui add text-morph');
    console.log('\n  list             - List all available components');
    console.log('    Example: npx @derricknuby/ui list');
    console.log('\n  --help           - Show help information');
    console.log('\nDocumentation: https://github.com/derrick-nuby/ui-derrick');
});
commander_1.program.parse(process.argv);
