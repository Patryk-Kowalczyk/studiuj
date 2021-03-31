module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    env: {
        BACKEND_HOST: "http://createosm.pl/studiuj/public",
    },
};
