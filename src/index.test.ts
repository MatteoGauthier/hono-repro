import { describe, expect, it } from "vitest"
import app from "./index"

describe("context", () => {
  it("it should return the context", async () => {
    const req = new Request(`http://localhost/context`, {
      cf: {
        timezone: "Europe/Paris",
      },
    })

    const res = await app.request(req, {})
    console.log(await res.json())
    expect(res.status).toBe(200)


    const data = await res.json()
    expect(data).toEqual({
      cfContext: {
        timezone: "Europe/Paris",
      },
    })
  })
})
