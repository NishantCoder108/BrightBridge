module.exports = {
    apps: [
        {
            name: "bright-bridge-backend", // This is the PM2 app name
            script: "./dist/server.js",
            instances: "1", //it depends , how many instances you want e.g. max or 1 or4 instances anything
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
