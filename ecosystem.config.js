module.exports = {
    apps: [
        {
            name: "gobi-portfolio",
            script: "npm",
            args: "start -- -p 1011",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
