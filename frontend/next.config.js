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
        // BACKEND_HOST: BACKEND_DOMAIN + ":8000",

        BACKEND_HOST: "http://studiuj.createosm.pl/public",
        KEY: "dcbfa94fcf2c3c32ad5e",
        CLUSTER: "eu",
    },
};
