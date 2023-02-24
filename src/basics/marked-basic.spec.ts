import { describe, expect, it } from 'vitest'
import { markedRender } from "./marked-basic"

describe("Marked basic tests", () => {

  it("generates HTML from markdown", () => {
    const actual = markedRender("*hello world*")
    const expected = `<p><em>hello world</em></p>\n`
    expect(actual).toBe(expected)
  })
})