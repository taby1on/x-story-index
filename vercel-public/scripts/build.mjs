import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const project = resolve(here, "..");
const repository = resolve(project, "..");
const dist = resolve(project, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "data"), { recursive: true });
await cp(resolve(project, "public"), dist, { recursive: true });
await cp(resolve(repository, "public/data"), resolve(dist, "data"), { recursive: true });
await cp(resolve(repository, "public/og.png"), resolve(dist, "og.png"));
await cp(resolve(repository, "public/favicon.png"), resolve(dist, "favicon.png"));
