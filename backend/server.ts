import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile, writeFile } from "node:fs/promises";
import path from "path";

const app = new Hono();


app.use("/*", cors());


app.get("/projects", async (c) => {
    try {
        const data = await readFile(path.join(__dirname, "./data.json"), "utf-8");
        return c.json(JSON.parse(data));
    } catch (err) {
        return c.json({ error: "Failed to read data" }, 500);
    }
});


app.post("/projects", async (c) => {
    try {
        const newProject = await c.req.json(); 
        const data = await readFile(path.join(__dirname, "./data.json"), "utf-8");
        const jsonData = JSON.parse(data);
        
        jsonData.projects.push(newProject);

        await writeFile(path.join(__dirname, "./data.json"), JSON.stringify(jsonData, null, 2), "utf-8");

        return c.json({ message: "Project added", project: newProject });
    } catch (err) {
        return c.json({ error: "Failed to save project" }, 500);
    }
});

const port = 3999;
serve({ fetch: app.fetch, port });
console.log(`Server is running on port ${port}`);
