export class CSSLinker {
 loadedCSS: Record<string, boolean> = {};

 async loadAndAppendCSS(moduleMetaURL: string, path: string) {
  const url = new URL(path, moduleMetaURL);
  if (this.loadedCSS[url.href]) return;
  const cssModule = await import(url.href, {
   assert: { type: "css" },
  });

  let outputCSS = ``;
  const rules = cssModule.default.cssRules;
  for (const rule of rules) {
   outputCSS += rule.cssText;
  }

  const style = document.createElement("style");
  style.innerText = outputCSS;

  document.head.appendChild(style);
 }
}
