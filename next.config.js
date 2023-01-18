module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_ROOT_URL: process.env.EMAIL_ROOT_URL
  }
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}