let editor; // Monaco editor instance
const STORAGE_KEY = "eduskillpath_resume_tex";

const templateSelect = document.getElementById("templateSelect");
const resumePreview = document.getElementById("resumePreview");

const btnSave = document.getElementById("btnSave");
const btnReset = document.getElementById("btnReset");
const btnDownload = document.getElementById("btnDownload");

function escapeHTML(str){
  return str.replace(/[&<>"']/g, m => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[m]));
}

function extractBraces(cmd){
  const start = cmd.indexOf("{");
  const end = cmd.lastIndexOf("}");
  return (start !== -1 && end !== -1) ? cmd.slice(start+1, end) : "";
}

function parseResumeTex(text){
  const lines = text.split("\n");

  let name = "";
  let email = "";
  let phone = "";
  let linkedin = "";

  // sections: [{title, items:[], paras:[]}]
  const sections = [];
  let current = null;

  function ensureSection(title){
    current = { title, items: [], paras: [] };
    sections.push(current);
  }

  for(const raw of lines){
    const line = raw.trim();
    if(!line) continue;

    if(line.startsWith("%")) continue;

    if(line.startsWith("\\name{")) { name = extractBraces(line); continue; }
    if(line.startsWith("\\email{")) { email = extractBraces(line); continue; }
    if(line.startsWith("\\phone{")) { phone = extractBraces(line); continue; }
    if(line.startsWith("\\linkedin{")) { linkedin = extractBraces(line); continue; }

    if(line.startsWith("\\section{")){
      const title = extractBraces(line);
      ensureSection(title);
      continue;
    }

    if(line.startsWith("\\item")){
      if(!current) ensureSection("Details");
      const itemText = line.replace("\\item", "").trim();
      if(itemText) current.items.push(itemText);
      continue;
    }

    // plain paragraph
    if(!current) ensureSection("Details");
    current.paras.push(line);
  }

  return { name, email, phone, linkedin, sections };
}

function renderPreview(text){
  const data = parseResumeTex(text);

  const metaParts = [];
  if(data.email) metaParts.push(`📧 ${escapeHTML(data.email)}`);
  if(data.phone) metaParts.push(`📞 ${escapeHTML(data.phone)}`);
  if(data.linkedin) metaParts.push(`🔗 ${escapeHTML(data.linkedin)}`);

  let html = `
    <div class="r-name">${escapeHTML(data.name || "Your Name")}</div>
    <div class="r-meta">${metaParts.join(" | ")}</div>
  `;

  for(const sec of data.sections){
    html += `<div class="r-sec"><h3>${escapeHTML(sec.title)}</h3>`;

    if(sec.paras.length){
      for(const p of sec.paras){
        html += `<div class="r-para">${escapeHTML(p)}</div>`;
      }
    }

    if(sec.items.length){
      html += `<ul>`;
      for(const it of sec.items){
        html += `<li>${escapeHTML(it)}</li>`;
      }
      html += `</ul>`;
    }

    html += `</div>`;
  }

  resumePreview.innerHTML = html;
}

// --- Save / Load ---
function saveToLocal(){
  localStorage.setItem(STORAGE_KEY, editor.getValue());
}

function loadFromLocal(){
  return localStorage.getItem(STORAGE_KEY);
}

// --- Monaco init ---
require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs" }
});

require(["vs/editor/editor.main"], function(){
  // register language + theme
  registerLatexMode(monaco);

  editor = monaco.editor.create(document.getElementById("editor"), {
    value: "",
    language: "resumetex",
    theme: "eduskill-dark",
    fontSize: 14,
    minimap: { enabled: false },
    wordWrap: "on",
    automaticLayout: true
  });

  // load saved, else template
  const saved = loadFromLocal();
  if(saved && saved.trim().length > 0){
    editor.setValue(saved);
  } else {
    editor.setValue(TEMPLATES.t1);
  }

  renderPreview(editor.getValue());

  // live render + autosave
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue();
    renderPreview(value);

    // autosave
    clearTimeout(window.__saveTimer);
    window.__saveTimer = setTimeout(saveToLocal, 500);
  });
});

// Template change
templateSelect.addEventListener("change", () => {
  const key = templateSelect.value;
  editor.setValue(TEMPLATES[key]);
  renderPreview(editor.getValue());
  saveToLocal();
});

// Save button
btnSave.addEventListener("click", () => {
  saveToLocal();
  alert("Saved ✅ (stored in your browser)");
});

// Reset button
btnReset.addEventListener("click", () => {
  if(confirm("Reset to Template 1?")){
    templateSelect.value = "t1";
    editor.setValue(TEMPLATES.t1);
    renderPreview(editor.getValue());
    saveToLocal();
  }
});

// Download PDF
btnDownload.addEventListener("click", () => {
  window.print();
});
