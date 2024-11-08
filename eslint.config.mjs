// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.js', '**/*.vue'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,          // Import Prettier rules
      'prettier/prettier': ['warn', { 'endOfLine': 'off' }]    // Flag Prettier issues as ESLint errors
    },
    
  }
)
