import { describe, expect, it, vi } from 'vitest'
import { hello } from "./hello"

describe("Hello World", () => {

  it("called console.log", () => {
    const logger = vi.spyOn(console, "log")
    hello()
    expect(logger).toBeCalledTimes(1)
  })
})