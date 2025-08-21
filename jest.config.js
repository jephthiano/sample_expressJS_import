export default {
transform: {}, // Prevents Jest from attempting to transpile ES Modules with Babel by default
// You might need to add other configurations here depending on your project,
// such as moduleNameMapper for specific module aliases or paths.

setupFiles: ["<rootDir>/jest.setup.js"], // ✅ auto-load .env
};