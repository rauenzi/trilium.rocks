import {HLJSApi, HLJSPlugin} from "highlight.js";


declare const hljs: HLJSApi;


// Custom highlight.js plugin to highlight the `api` globals for Trilium
const highlightTriliumApi: HLJSPlugin = {
    "after:highlight": (result) => {
        result.value = result.value.replaceAll(/([^A-Za-z0-9])api\./g, function(match, prefix) {
            return `${prefix}<span class="hljs-variable language_">api</span>.`;
        });
    }
};

// Custom highlight.js plugin to highlight JQuery function usage
const highlightJQuery: HLJSPlugin = {
    "after:highlight": (result) => {
        result.value = result.value.replaceAll(/([^A-Za-z0-9.])\$\((.+)\)/g, function(match, prefix, variable) {
            return `${prefix}<span class="hljs-variable language_">$(</span>${variable}<span class="hljs-variable language_">)</span>`;
        });
        // TODO: add highlighting for static calls like $.ajax
    }
};


/**
 * Let's highlight some codeblocks!
 */
export default function addHljs() {
    const codeblocks = document.querySelectorAll(`.ck-content pre`);
    if (!codeblocks.length) return; // If there are none, don't add dependency

    // Add the hightlight.js styles from the child note of this script
    // TODO: make this a mapping
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "api/notes/cVaK9ZJwx5Hs/download";
    document.head.append(link);

    // Add the highlight.js script too
    // TODO: make this a mappin as well
    const script = document.createElement("script");
    script.src = "api/notes/6PVElIem02b5/download";
    script.addEventListener("load", () => {
        // This registers the JS Frontend and JS Backend types as javascript aliases for highlighting purposes
        hljs.registerAliases(["application-javascript-env-frontend", "application-javascript-env-backend"], {languageName: "javascript"});

        // Add our custom plugins and highlight all on page
        hljs.addPlugin(highlightTriliumApi);
        hljs.addPlugin(highlightJQuery);
        hljs.highlightAll();
    });
    document.head.append(script);
}