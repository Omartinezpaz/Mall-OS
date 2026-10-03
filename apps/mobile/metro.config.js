const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// 2. Resolve node_modules from mobile and monorepo root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Monorepo node_modules resolution
// config.resolver.disableHierarchicalLookup is kept at default (false) for standard resolution

// 4. Map monorepo workspace packages directly
config.resolver.extraNodeModules = {
  '@mallos/design-tokens': path.resolve(workspaceRoot, 'packages/design-tokens'),
  '@mallos/map-engine': path.resolve(workspaceRoot, 'packages/map-engine'),
  '@mallos/types': path.resolve(workspaceRoot, 'packages/types'),
  '@mallos/validators': path.resolve(workspaceRoot, 'packages/validators'),
};

module.exports = config;