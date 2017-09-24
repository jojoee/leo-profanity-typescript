import util from "./../../src/module/util"

describe("clone", function() {
  it("should clone reference types", function() {
    const src = [1, "two", {}]
    const result = util.clone(src)
    expect(src).not.toBe(result)
    expect(src).toEqual(result)
  })

  it("should clone primitive types", function() {
    const data = 1
    expect(data).toEqual(util.clone(data))

    const data2 = 2.1
    expect(data2).toEqual(util.clone(data2))

    const data3 = "this is string"
    expect(data3).toEqual(util.clone(data3))
  })
})
