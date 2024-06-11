module.exports = {
    apps: [
        {
            name: "bright-bridge-frontend",
            script: "npm",
            args: "run build-and-copy",
            cwd: "../frontend",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "bright-bridge-backend",
            script: "./dist/server.js",
            instances: "1",
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
