import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile, writeFile } from "node:fs/promises";
import path from "path";

const app = new Hono();

app.use("/*", cors());

app.get("/", async (c) => {
    const html = await readFile(path.join(__dirname, "./index.html"), "utf-8");
    return c.html(html);
});

app.get("/style.css", async (c) => {
    const css = await readFile(path.join(__dirname, "./style.css"), "utf-8");
    return c.body(css, 200, { "Content-Type": "text/css" });
});

app.get("/main.js", async (c) => {
    const js = await readFile(path.join(__dirname, "./main.js"), "utf-8");
    return c.body(js, 200, { "Content-Type": "application/javascript" });
});


app.get("/json", async (c) => {
    const data = await readFile("./data.json", "utf-8");
    return c.json(JSON.parse(data));
});


app.post("/projects", async (c) => {
    const newProject = await c.req.json();
    const data = await readFile("./data.json", "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.projects.push(newProject);
    await writeFile("./data.json", JSON.stringify(jsonData, null, 2), "utf-8");
    return c.json({ message: "Project added successfully", project: newProject });
});

const port = 3999;
serve({ fetch: app.fetch, port });
console.log(`Server running on port ${port}`);
