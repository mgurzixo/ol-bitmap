import { defineConfig } from "vite";
import fs from "fs";

// https://stackoverflow.com/questions/73847316/import-raw-image-data-into-a-script-with-vite
/** @type {import('vite').Plugin} */
const hexLoader = {
    name: "hex-loader",
    transform(code, id) {
        const [path, query] = id.split("?");
        if (query != "raw-hex") return null;

        const data = fs.readFileSync(path);
        const hex = data.toString("hex");

        return `export default '${hex}';`;
    },
};

export default defineConfig({
    build: {
        sourcemap: true,
    },
    plugins: [hexLoader],
});
