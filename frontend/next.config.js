const BACKEND_DOMAIN = "http://localhost";

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    BACKEND_DOMAIN,
    BACKEND_HOST: "http://studiuj.createosm.pl/public",

    // BACKEND_HOST: BACKEND_DOMAIN + ":8000",
    STRIPE_PK:
      "pk_test_51IxWnfJCwDX6iN8JWVFsJBYWNpmuJF1u5f1hxBS31Stc38VxfsbeU4yi3ftlAyHwSoZBdQ5lrRh21WsUIqESvV5s00xvJ53GP9",
    PUSHER_KEY: "dcbfa94fcf2c3c32ad5e",
    CLUSTER: "eu",
  },
};
