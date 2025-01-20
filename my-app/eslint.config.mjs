import antfu from "@antfu/eslint-config";

export default antfu({
    type: "app",
    formatters: true,
    typescript: true,
    stylistic: {
        indent: 4,
        semi: true,
        quotes: "double",
    },
    rules: {
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": ["error", {
            internalPattern: ["@/*"],
        }],
        "unicorn/filename-case": ["error", {
            case: "snakeCase",
            ignore: ["README.md"],
        }],
    },
    ignores: ["drizzle.config.ts"],
});
