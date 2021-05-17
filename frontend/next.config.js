// module.exports = {
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ["@svgr/webpack"],
//         });
//
//         return config;
//     },
//     env: {
//         BACKEND_HOST: "http://localhost:8000",
//     },
// };

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    env: {
        BACKEND_HOST: "http://studiuj.createosm.pl/public",
    },
};

