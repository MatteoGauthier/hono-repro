import { ChatGroq } from "@langchain/groq"
import { Hono } from "hono"
import { logger } from "hono/logger"

type Bindings = {
  GROQ_API_KEY: string
}

declare module "hono" {
  interface ContextVariableMap {
    model: ChatGroq
  }
}

const app = new Hono<{ Bindings: Bindings }>()

// Add the logger middleware
app.use("*", logger())

app.get("/ping", (c) => c.text("pong"))

app.get("/context", (c) => {
  const cfContext = c.req.raw.cf
  if (!cfContext) {
    return c.json({ error: "No cfContext provided" }, 400)
  }
  return c.json({ cfContext })
})

export default app
