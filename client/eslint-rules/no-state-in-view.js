const noHooksInUi = {
    meta: {
        type: "problem",
        messages: { ban: "No {{name}} in UI files. Move to a hook." },
        schema: [], // <-- REQUIRED
    },

    create(ctx) {
        const f = ctx.getFilename().replace(/\\/g, "/");
        const isUi = /\.tsx$/.test(f);
        if (!isUi) return {};

        const banned = new Set([
            "useState",
            "useReducer",
            "useEffect",
            "useContext",
            "useRef",
            "useMemo",
            "useCallback",
        ]);

        return {
            ImportSpecifier(n) {
                if (n.parent.source.value === "react" && banned.has(n.imported.name)) {
                    ctx.report({
                        node: n,
                        messageId: "ban",
                        data: { name: n.imported.name },
                    });
                }
            },

            CallExpression(n) {
                const cal = n.callee;
                const name = cal.type === "Identifier" ? cal.name : null;

                if (name && banned.has(name)) {
                    ctx.report({
                        node: n,
                        messageId: "ban",
                        data: { name },
                    });
                }
            },
        };
    },
};

export const plugin = {
    rules: {
        "no-hooks-in-ui": noHooksInUi,
    },
};
