// Chapter Compass data and translation check.
// Run: node tests/validate.mjs   (no dependencies; exits 1 on any problem)
//
// Checks that every data file loads, every observance has a valid date and
// both languages, every SDG number is 1-17, every issue's days exist,
// and every English interface string has a Spanish twin (and vice versa).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ["data/sdgs.js", "data/observances.js", "data/issues.js", "data/access.js", "data/chapter.js", "assets/js/i18n.js"]) {
  vm.runInContext(readFileSync(join(root, f), "utf8"), sandbox, { filename: f });
}
const CC = sandbox.window.CC;
const problems = [];
const bad = (msg) => problems.push(msg);
const bilingual = (obj, where) => {
  if (!obj || typeof obj.en !== "string" || !obj.en.trim()) bad(`${where}: missing English text`);
  if (!obj || typeof obj.es !== "string" || !obj.es.trim()) bad(`${where}: missing Spanish text`);
};
const validSdg = (n, where) => { if (!Number.isInteger(n) || n < 1 || n > 17) bad(`${where}: SDG ${n} is not 1-17`); };

// SDGs
if (CC.sdgs.length !== 17) bad(`data/sdgs.js: expected 17 goals, found ${CC.sdgs.length}`);
CC.sdgs.forEach((g, i) => { if (g.n !== i + 1) bad(`data/sdgs.js: goal at position ${i + 1} is numbered ${g.n}`); bilingual(g, `SDG ${g.n}`); });

// Observances
const ids = new Set();
for (const o of CC.observances) {
  const w = `observance "${o.id}"`;
  if (ids.has(o.id)) bad(`${w}: duplicate id`);
  ids.add(o.id);
  if (!["un", "admin"].includes(o.type)) bad(`${w}: type must be "un" or "admin"`);
  if (!(o.month >= 1 && o.month <= 12)) bad(`${w}: month must be 1-12`);
  if (o.rule) {
    if (!(o.rule.weekday >= 0 && o.rule.weekday <= 6) || !(o.rule.nth >= 1 && o.rule.nth <= 4)) bad(`${w}: rule needs weekday 0-6 and nth 1-4`);
  } else {
    const d = new Date(2027, o.month - 1, o.day);
    if (d.getMonth() !== o.month - 1) bad(`${w}: ${o.month}/${o.day} is not a real date`);
  }
  if (o.endMonth) { const e = new Date(2027, o.endMonth - 1, o.endDay); if (e.getMonth() !== o.endMonth - 1) bad(`${w}: end date is not real`); }
  bilingual(o.name, `${w} name`);
  bilingual(o.idea, `${w} idea`);
  (o.sdgs || []).forEach((n) => validSdg(n, w));
  if (o.type === "admin" && !/^https:\/\//.test(o.source || "")) bad(`${w}: chapter reminders need an https source to confirm against`);
}

// Issues
for (const iss of CC.issues) {
  const w = `issue "${iss.id}"`;
  bilingual(iss.name, `${w} name`);
  bilingual(iss.un, `${w} UN connection`);
  iss.targets.forEach((t) => { bilingual(t, `${w} target ${t.t}`); validSdg(Number(t.t.split(".")[0]), `${w} target ${t.t}`); });
  iss.prompts.forEach((p, i) => bilingual(p, `${w} prompt ${i + 1}`));
  iss.days.forEach((d) => { if (!ids.has(d)) bad(`${w}: day "${d}" isn't in data/observances.js`); });
  if (iss.partners.en.length !== iss.partners.es.length) bad(`${w}: partner lists differ in length between languages`);
}

// Access checklist
const accessIds = new Set();
for (const g of CC.access) {
  bilingual(g.group, "access group");
  for (const i of g.items) {
    if (accessIds.has(i.id)) bad(`access item "${i.id}": duplicate id`);
    accessIds.add(i.id);
    bilingual(i, `access item "${i.id}"`);
    bilingual(i.says, `access item "${i.id}" statement`);
  }
}

// Chapter config
for (const key of Object.keys(CC.chapter.localPartners || {})) {
  if (!CC.issues.some((i) => i.id === key)) bad(`data/chapter.js: localPartners key "${key}" isn't an issue id`);
}

// Translation parity
const en = Object.keys(CC.strings.en), es = Object.keys(CC.strings.es);
en.filter((k) => !(k in CC.strings.es)).forEach((k) => bad(`i18n: "${k}" has no Spanish string`));
es.filter((k) => !(k in CC.strings.en)).forEach((k) => bad(`i18n: "${k}" has no English string`));
for (const k of en) {
  const vars = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  if (k in CC.strings.es && vars(CC.strings.en[k]) !== vars(CC.strings.es[k])) bad(`i18n: "${k}" placeholders differ between languages`);
}

// Keys used in index.html must exist
const html = readFileSync(join(root, "index.html"), "utf8");
const used = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1])
  .concat([...html.matchAll(/data-i18n-attr="([^"]+)"/g)].flatMap((m) => m[1].split(";").map((p) => p.split(":")[1])));
[...new Set(used)].filter((k) => !(k in CC.strings.en)).forEach((k) => bad(`index.html uses "${k}", which isn't in i18n.js`));

if (problems.length) {
  console.error(`FAIL: ${problems.length} problem(s)\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log(`PASS: ${CC.observances.length} observances, ${CC.issues.length} issues, ${accessIds.size} access items, ${en.length} strings in 2 languages.`);
