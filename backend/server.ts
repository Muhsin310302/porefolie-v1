// server.ts

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { setup } from './db/setup';
import { initializeDB } from "./db/db";
import { projectSchema, Project, ProjectWithTimestamps } from './shema'; // Sørg for riktig importsti
import { v4 as uuidv4 } from 'uuid'; // Importer uuidv4 for å generere unike IDer

const app = new Hono();
app.use("/*", cors()); // Aktiverer CORS på alle ruter

const initializeServer = async () => {
  try {
    const db = await initializeDB(); // Initialiserer databaseforbindelsen én gang
    await setup(); // Kjør tabelloppsett eller andre nødvendige init-funksjoner
    console.log("Database setup og tabeller opprettet.");

    // GET /projects - Hent alle prosjekter
    app.get("/projects", async (c) => {
      try {
        const projects = await db.all('SELECT * FROM projects'); // Direkte databasekall
        return c.json({ success: true, data: projects });
      } catch (error) {
        console.error("Feil ved henting av prosjekter:", error);
        return c.json({ success: false, error: "Kunne ikke hente prosjekter" }, 500);
      }
    });

    // POST /projects - Legg til et nytt prosjekt med validering
    app.post("/projects", async (c) => {
      try {
        const newProjectData = await c.req.json();
        console.log("Mottatt nytt prosjektdata:", newProjectData); // Debugging log

        const validation = projectSchema.safeParse(newProjectData);

        if (!validation.success) {
          console.log("Validering feilet:", validation.error.errors); // Logg valideringsfeil
          return c.json(
            {
              success: false,
              error: "Invalid project data",
              details: validation.error.errors,
            },
            400
          );
        }

        // Ekstraher validerte data
        const validData = validation.data;
        console.log("Validerte data:", validData); // Logg validerte data

        // Generer ID og tidsstempler
        const now = new Date().toISOString();
        const newProject: ProjectWithTimestamps = {
          ...validData,
          id: validData.id || uuidv4(),
          created_at: now,
          updated_at: now,
        };
        console.log("Prosjekt med tidsstempler:", newProject); // Logg prosjektobjektet

        // Lagre i databasen
        await db.run(
          `INSERT INTO projects (id, title, description, link, published_at, public, status, tags, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newProject.id,
            newProject.title,
            newProject.description,
            newProject.link,
            newProject.publishedAt || null,
            newProject.public ? 1 : 0,
            newProject.status,
            newProject.tags ? JSON.stringify(newProject.tags) : null,
            newProject.created_at,
            newProject.updated_at,
          ]
        );
        console.log("Prosjekt innsatt vellykket."); // Bekreftelseslogg

        return c.json({ success: true, data: newProject });
      } catch (error) {
        console.error("Feil ved opprettelse av prosjekt:", error);
        return c.json({ success: false, error: "Kunne ikke opprette prosjekt" }, 500);
      }
    });

    // PUT /projects/:id - Oppdater et eksisterende prosjekt med validering
    app.put("/projects/:id", async (c) => {
      const { id } = c.req.param();
      try {
        const updates = await c.req.json();
        console.log(`Mottatte oppdateringer for prosjekt ${id}:`, updates); // Debugging log

        const validation = projectSchema.safeParse(updates);

        if (!validation.success) {
          console.log("Validering feilet:", validation.error.errors); // Logg valideringsfeil
          return c.json(
            {
              success: false,
              error: "Invalid project data",
              details: validation.error.errors,
            },
            400
          );
        }

        const validData = validation.data;
        console.log("Validerte oppdateringer:", validData); // Logg validerte data

        // Oppdater tidsstempel
        const updated_at = new Date().toISOString();
        console.log("Oppdatert tidsstempel:", updated_at); // Logg tidsstempel

        // Oppdater i databasen
        const result = await db.run(
          `UPDATE projects SET title = ?, description = ?, link = ?, published_at = ?, public = ?, status = ?, tags = ?, updated_at = ? WHERE id = ?`,
          [
            validData.title,
            validData.description,
            validData.link,
            validData.publishedAt || null,
            validData.public ? 1 : 0,
            validData.status,
            validData.tags ? JSON.stringify(validData.tags) : null,
            updated_at,
            id,
          ]
        );
        const changes = result?.changes ?? 0;
        console.log(`Antall rader oppdatert: ${changes}`); // Logg antall endringer

        if (changes > 0) {
          // Hent det oppdaterte prosjektet
          const updatedProject = await db.get('SELECT * FROM projects WHERE id = ?', id);
          console.log("Oppdatert prosjekt:", updatedProject); // Logg oppdatert prosjekt
          return c.json({ success: true, data: updatedProject });
        }
        return c.json({ success: false, error: "Project not found" }, 404);
      } catch (error) {
        console.error("Feil ved oppdatering av prosjekt:", error);
        return c.json({ success: false, error: "Could not update project" }, 500);
      }
    });

    // DELETE /projects/:id - Slett et prosjekt
    app.delete("/projects/:id", async (c) => {
      const { id } = c.req.param();
      try {
        console.log(`Forsøker å slette prosjekt med id: ${id}`); // Debugging log
        const result = await db.run(`DELETE FROM projects WHERE id = ?`, id);
        const changes = result?.changes ?? 0;
        console.log(`Antall rader slettet: ${changes}`); // Logg antall endringer

        if (changes > 0) {
          return c.json({ success: true, message: "Project deleted" });
        }
        return c.json({ success: false, error: "Project not found" }, 404);
      } catch (error) {
        console.error("Feil ved sletting av prosjekt:", error);
        return c.json({ success: false, error: "Could not delete project" }, 500);
      }
    });

    // Sett opp og start serveren
    const port = 3999;
    serve({ fetch: app.fetch, port });
    console.log(`Server kjører på port ${port}`);
  } catch (error) {
    console.error("Kunne ikke sette opp serveren:", error);
  }
};

// Start serveren ved å kalle initializeServer
initializeServer();
