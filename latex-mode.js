// Monaco custom language: minimal LaTeX resume commands highlighting

function registerLatexMode(monaco){
  monaco.languages.register({ id: "resumetex" });

  monaco.languages.setMonarchTokensProvider("resumetex", {
    tokenizer: {
      root: [
        [/\\(name|email|phone|linkedin|section)\b/, "keyword"],
        [/\\item\b/, "type.identifier"],
        [/%.*$/, "comment"],
        [/[{}]/, "delimiter.bracket"],
        [/\d+/, "number"],
      ]
    }
  });

  monaco.editor.defineTheme("eduskill-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "4B7BFF", fontStyle: "bold" },
      { token: "type.identifier", foreground: "30E7FF" },
      { token: "comment", foreground: "7f8c8d" }
    ],
    colors: {
      "editor.background": "#070b1a",
      "editorLineNumber.foreground": "#5e6aa3",
      "editorLineNumber.activeForeground": "#eaf0ff",
      "editorCursor.foreground": "#30E7FF",
      "editor.selectionBackground": "#23306b"
    }
  });
}
