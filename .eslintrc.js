module.exports = {
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': 'off',
  },
}
