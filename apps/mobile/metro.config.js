const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch only relevant packages and shared dependencies (evita indexar apps/admin, apps/landing, .git, tools, supabase)
config.watchFolders = [
  path.resolve(workspaceRoot, 'packages/design-tokens'),
  path.resolve(workspaceRoot, 'packages/map-engine'),
  path.resolve(workspaceRoot, 'packages/types'),
  path.resolve(workspaceRoot, 'packages/validators'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 2. Resolve node_modules from mobile and monorepo root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Map monorepo workspace packages directly
config.resolver.extraNodeModules = {
  '@mallos/design-tokens': path.resolve(workspaceRoot, 'packages/design-tokens'),
  '@mallos/map-engine': path.resolve(workspaceRoot, 'packages/map-engine'),
  '@mallos/types': path.resolve(workspaceRoot, 'packages/types'),
  '@mallos/validators': path.resolve(workspaceRoot, 'packages/validators'),
};

module.exports = config;