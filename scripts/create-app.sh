#!/bin/bash

# =============================================================================
# Lumes - Create New App Script
# =============================================================================
# Usage: ./scripts/create-app.sh <app-name>
# Example: ./scripts/create-app.sh meu-projeto
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if app name was provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: App name is required${NC}"
    echo "Usage: ./scripts/create-app.sh <app-name>"
    echo "Example: ./scripts/create-app.sh meu-projeto"
    exit 1
fi

APP_NAME=$1
APP_DIR="apps/$APP_NAME"

# Check if directory already exists
if [ -d "$APP_DIR" ]; then
    echo -e "${RED}Error: Directory $APP_DIR already exists${NC}"
    exit 1
fi

echo -e "${BLUE}Creating new Lumes app: ${GREEN}$APP_NAME${NC}"
echo ""

# Create app directory
mkdir -p "$APP_DIR"

# Create package.json
cat > "$APP_DIR/package.json" << EOF
{
  "name": "$APP_NAME",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@lumes/ui": "workspace:*",
    "@lumes/validators": "workspace:*",
    "next": "16.0.1",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.1",
    "jest": "^30.2.0",
    "jest-environment-jsdom": "^30.2.0",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0"
  }
}
EOF

# Create tsconfig.json
cat > "$APP_DIR/tsconfig.json" << EOF
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@lumes/analytics": ["../../packages/analytics/index.ts"],
      "@lumes/analytics/*": ["../../packages/analytics/*"],
      "@lumes/email": ["../../packages/email/index.ts"],
      "@lumes/email/*": ["../../packages/email/*"],
      "@lumes/logger": ["../../packages/logger/index.ts"],
      "@lumes/logger/*": ["../../packages/logger/*"],
      "@lumes/mercadopago": ["../../packages/mercadopago/index.ts"],
      "@lumes/mercadopago/*": ["../../packages/mercadopago/*"],
      "@lumes/meta-conversions-api": ["../../packages/meta-conversions-api/index.ts"],
      "@lumes/meta-conversions-api/*": ["../../packages/meta-conversions-api/*"],
      "@lumes/sheets": ["../../packages/sheets/index.ts"],
      "@lumes/sheets/*": ["../../packages/sheets/*"],
      "@lumes/storage": ["../../packages/storage/index.ts"],
      "@lumes/storage/*": ["../../packages/storage/*"],
      "@lumes/stripe": ["../../packages/stripe/index.ts"],
      "@lumes/stripe/*": ["../../packages/stripe/*"],
      "@lumes/tracking": ["../../packages/tracking/index.ts"],
      "@lumes/tracking/*": ["../../packages/tracking/*"],
      "@lumes/ui": ["../../packages/ui/index.ts"],
      "@lumes/ui/*": ["../../packages/ui/*"],
      "@lumes/validators": ["../../packages/validators/index.ts"],
      "@lumes/validators/*": ["../../packages/validators/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.ts
cat > "$APP_DIR/next.config.ts" << EOF
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
EOF

# Create postcss.config.mjs
cat > "$APP_DIR/postcss.config.mjs" << EOF
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
EOF

# Create jest.config.ts
cat > "$APP_DIR/jest.config.ts" << 'EOF'
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
EOF

# Create jest.setup.ts
cat > "$APP_DIR/jest.setup.ts" << EOF
import "@testing-library/jest-dom";
EOF

# Create .env.example
cat > "$APP_DIR/.env.example" << EOF
# =============================================================================
# $APP_NAME - Environment Variables
# =============================================================================
# Copy this file to .env.local and fill in your values

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Add your environment variables below
EOF

# Create src directory structure
mkdir -p "$APP_DIR/src/app"
mkdir -p "$APP_DIR/src/components"

# Create layout.tsx
cat > "$APP_DIR/src/app/layout.tsx" << EOF
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$APP_NAME",
  description: "Created with Lumes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
EOF

# Create page.tsx
cat > "$APP_DIR/src/app/page.tsx" << EOF
import { Button } from "@lumes/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">$APP_NAME</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to your new Lumes app!
      </p>
      <Button>Get Started</Button>
    </main>
  );
}
EOF

# Create globals.css
cat > "$APP_DIR/src/app/globals.css" << EOF
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
EOF

# Create next-env.d.ts
cat > "$APP_DIR/next-env.d.ts" << EOF
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
EOF

echo -e "${GREEN}✓ Created package.json${NC}"
echo -e "${GREEN}✓ Created tsconfig.json${NC}"
echo -e "${GREEN}✓ Created next.config.ts${NC}"
echo -e "${GREEN}✓ Created postcss.config.mjs${NC}"
echo -e "${GREEN}✓ Created jest.config.ts${NC}"
echo -e "${GREEN}✓ Created .env.example${NC}"
echo -e "${GREEN}✓ Created src/app/layout.tsx${NC}"
echo -e "${GREEN}✓ Created src/app/page.tsx${NC}"
echo -e "${GREEN}✓ Created src/app/globals.css${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. cd $APP_DIR"
echo "  2. cp .env.example .env.local"
echo "  3. pnpm install (from root)"
echo "  4. pnpm dev --filter=$APP_NAME"
echo ""
echo -e "${YELLOW}To add scripts to root package.json:${NC}"
echo "  \"dev:$APP_NAME\": \"turbo dev --filter=$APP_NAME\","
echo "  \"build:$APP_NAME\": \"turbo build --filter=$APP_NAME\""
echo ""
echo -e "${GREEN}Done! App created at $APP_DIR${NC}"
