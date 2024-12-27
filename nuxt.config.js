export default {
    // ... autres configurations
    vite: {
        server: {
            hmr: {
                protocol: "ws",
                host: "localhost",
            },
        },
    },
};