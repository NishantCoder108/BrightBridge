module.exports = {
  apps: [
    {
      name: "bright-bridge-app",
      script: "./dist/server.js", // Path to your server file
      instances: "1", // You can set the number of instances here
      autorestart: true, // Restart the app if it crashes
      watch: false, // Set to true if you want PM2 to watch for file changes
     
      env: {
        NODE_ENV: "development", // Environment variables for development
      },
      env_production: {
        NODE_ENV: "production", // Environment variables for production
      },
    },
  ],
};

