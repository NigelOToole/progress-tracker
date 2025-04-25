const isProduction = process.env.NODE_ENV === "production";
const plugins = [
  require('postcss-import'),
  require('postcss-custom-media'),
  require('postcss-preset-env')({
    stage: 1
  }),
];

module.exports = {
  map: isProduction ? false : { annotation: true, inline: false },
  plugins
}
