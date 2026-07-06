import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = join(root, "app/r3f-craft/page.tsx");
const componentPath = join(root, "components/r3f-craft/mobius-dot-shader.tsx");

statSync(routePath);
statSync(componentPath);

const route = readFileSync(routePath, "utf8");
const component = readFileSync(componentPath, "utf8");

assert.match(route, /MobiusDotShader/, "route must render the R3F craft component");
assert.match(route, /variant="fullscreen"/, "route must use fullscreen shader tuning");
assert.match(route, /min-h-svh/, "route must fit the local browser viewport height");
assert.match(route, /overflow-hidden/, "route must avoid scrollbars/clipping in localhost preview");
assert.match(route, /bg-black/, "route must sit on a black background");
assert.match(route, /r3f-craft\/mobius-dots|r3f-craft/, "route must identify the shader preview");

assert.match(component, /<Canvas/, "component must use @react-three/fiber Canvas");
assert.match(component, /shaderMaterial/, "component must use a shader material");
assert.match(component, /generateMobiusDotGeometry/, "component must consume generated Mobius dot geometry");
assert.match(component, /edgeSegments:\s*3/, "component must render three edge rails");
assert.match(component, /faceSamples:\s*\d+/, "component must consume the triangular-tube geometry (faceSamples), not the flat ribbon");
assert.match(component, /frameloop=\{reduce \? "demand" : "always"\}/, "component must respect reduced motion");
assert.match(component, /#a3f04b/, "component must include homebrew terminal green highlight");

console.log(JSON.stringify({ ok: true, routePath, componentPath }, null, 2));
