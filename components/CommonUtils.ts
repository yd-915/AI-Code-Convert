const PRODUCT = "AICodeConvert";
export const OPTIONS = {
    ASK: 'ask',
    TRANSLATE: 'translate',
    CONVERT: 'convert',
    OPTIMIZE: 'optimize',
    EXPLAIN: 'explain',
    DEBUG: 'debug',
    HELPER: 'ask',
};

export const TITLES = {
    ASK: 'AI Code Assistant',
    TRANSLATE: 'AI Code Translator',
    CONVERT: 'AI Code Converter',
    OPTIMIZE: 'AI Code Optimize',
    EXPLAIN: 'AI Code Explain',
    DEBUG: 'AI Code Debug',
    HELPER: 'AI Code Helper',
};

export const HEAD_METAS = {
    ASK: {
        title : TITLES.ASK,
        description: "Use Free " + TITLES.ASK + " Online With " + PRODUCT,
        canonical: "assistant/ai-code-assistant"
    },
    TRANSLATE: {
        title: TITLES.TRANSLATE,
        description: "Use Free " + TITLES.TRANSLATE + " Online With " + PRODUCT,
        canonical: "translator/ai-code-translator"
    },
    CONVERT: {
        title: TITLES.CONVERT,
        description: "Use Free " + TITLES.CONVERT + " Online With " + PRODUCT,
        canonical: "converter/ai-code-converter"
    },
    OPTIMIZE: {
        title: TITLES.OPTIMIZE,
        description: "Use Free " + TITLES.OPTIMIZE + " Online With " + PRODUCT,
        canonical: "optimize/ai-code-optimize"
    },
    EXPLAIN: {
        title: TITLES.EXPLAIN,
        description: "Use Free " + TITLES.EXPLAIN + " Online With " + PRODUCT,
        canonical: "explain/ai-code-explain"
    },
    DEBUG: {
        title: TITLES.DEBUG,
        description: "Use Free " + TITLES.DEBUG + " Online With " + PRODUCT,
        canonical: "debug/ai-code-debug"
    },
    HELPER: {
        title: TITLES.HELPER,
        description: "Use Free " + TITLES.HELPER + " Online With " + PRODUCT,
        canonical: "helper/ai-code-helper"
    },
};

export const FEATURES = Object.entries(HEAD_METAS).map(([key, value]) => value);