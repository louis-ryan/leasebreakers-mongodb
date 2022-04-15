module.exports = {
    env: {
        MONGO_URI: process.env.MONGO_URI
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