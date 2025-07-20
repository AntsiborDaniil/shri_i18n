import path from "node:path";

import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        "formatjs",
                        {
                            idInterpolationPattern:
                                "[sha512:contenthash:base64:6]",
                            ast: false,
                            removeDefaultMessage:
                                process.env.NODE_ENV === "production",
                        },
                    ],
                ],
            },
        }),
        svgr({ include: "**/*.svg" }),
        // visualizer(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    i18n: ["i18next", "react-i18next"],
                },
            },
        },
    },
});
