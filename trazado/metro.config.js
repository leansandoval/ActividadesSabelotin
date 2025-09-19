const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Usa el transformer para SVG
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  // Quita 'svg' de assetExts y agrégalo a sourceExts
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts.push('svg');

  return config;
})();
