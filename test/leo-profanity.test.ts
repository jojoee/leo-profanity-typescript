import LeoProfanity from "./../src/leo-profanity"
const filter = new LeoProfanity()

describe("Profanity filter", () => {
  it("LeoProfanity is instantiable", () => {
    expect(filter).toBeInstanceOf(LeoProfanity)
  })
})

describe("list", () => {
  it("should contain boob word", () => {
    const expected = ["boob"]
    expect(filter.list()).toEqual(expect.arrayContaining(expected))
  })
})

describe("check", () => {
  it("should return false if param is empty string", () => {
    expect(filter.check("")).toBeFalsy()
  })

  it("should return false if string not contain profanity word", () => {
    expect(filter.check("I have 2 eyes")).toBeFalsy()
  })

  it("should return true if string contain profanity word", () => {
    // normal case
    expect(filter.check("I have boob, etc.")).toBeTruthy()

    // first & last
    expect(filter.check("2g1c")).toBeTruthy()
    expect(filter.check("zoophilia")).toBeTruthy()
    expect(filter.check("lorem 2g1c ipsum")).toBeTruthy()
    expect(filter.check("lorem zoophilia ipsum")).toBeTruthy()
  })

  it("should detect case sensitive", () => {
    expect(filter.check("I have BoOb")).toBeTruthy()
  })

  it("should detect dot and comma", () => {
    expect(filter.check("I have BoOb,")).toBeTruthy()
    expect(filter.check("I have BoOb.")).toBeTruthy()
  })

  it("should detect multi occurrence", () => {
    expect(filter.check("I have boob,boob, ass, and etc.")).toBeTruthy()
  })

  it("should not detect unspaced-word", () => {
    expect(filter.check("Buy classic watches online")).toBeFalsy()
  })
})

describe("clean", () => {
  it("should return empty string if param is empty string", () => {
    expect(filter.clean("")).toEqual("")
  })

  it("should return original string if string not contain profanity word", () => {
    expect(filter.clean("I have 2 eyes")).toEqual("I have 2 eyes")
  })

  it("should replace profanity word with *", () => {
    // normal case
    expect(filter.clean("I have boob, etc.")).toEqual("I have ****, etc.")

    // first & last
    expect(filter.clean("2g1c")).toEqual("****")
    expect(filter.clean("zoophilia")).toEqual("*********")
    expect(filter.clean("lorem 2g1c ipsum")).toEqual("lorem **** ipsum")
    expect(filter.clean("lorem zoophilia ipsum")).toEqual(
      "lorem ********* ipsum"
    )
  })

  it("should detect case sensitive", () => {
    expect(filter.clean("I have BoOb")).toEqual("I have ****")
  })

  it("should detect dot and comma", () => {
    expect(filter.clean("I have BoOb,")).toEqual("I have ****,")
    expect(filter.clean("I have BoOb.")).toEqual("I have ****.")
  })

  it("should detect multi occurrence", () => {
    expect(filter.clean("I have boob,boob, ass, and etc.")).toEqual(
      "I have ****,****, ***, and etc."
    )
  })

  it("should not detect unspaced-word", () => {
    expect(filter.clean("Buy classic watches online")).toEqual(
      "Buy classic watches online"
    )
  })

  it("should replace profanity word with + (custom replacement-character)", () => {
    expect(filter.clean("I have boob", "+")).toEqual("I have ++++")
  })

  it("should detect multi-length-space and multi-space", () => {
    expect(filter.clean("I  hav   ,e BoOb,  ")).toEqual("I  hav   ,e ****,  ")
    expect(filter.clean(",I h  a.   v e BoOb.")).toEqual(",I h  a.   v e ****.")
  })
})

describe("add", () => {
  it("should contain new words by given array of string", () => {
    const words = ["b@@b", "b##b"]
    filter.add(words)
    expect(filter.list()).toEqual(expect.arrayContaining(words))
  })

  it("should not add if we already have", () => {
    // check duplication
    const numberOfCurrentWords = filter.list().length
    filter.add(["b@@b", "b##b"])
    expect(filter.list().length).toEqual(numberOfCurrentWords)
  })
})

describe("remove", () => {
  it("should remove words by given array of string", () => {
    const words = ["boob", "boobs"]
    filter.remove(words)
    expect(filter.list()).not.toBe(expect.arrayContaining(words))
  })
})

describe("reset", () => {
  it("should reset words by using default dictionary", () => {
    // reset
    filter.reset()

    // prepare data to test by adding new 2 bad words
    const numberOfCurrentWords = filter.list().length
    const words = ["badword1", "badword2"]

    filter.add(words)
    expect(filter.list().length).toEqual(numberOfCurrentWords + words.length)

    // reset
    filter.reset()
    expect(filter.list().length).toEqual(numberOfCurrentWords)
  })
})

describe("clearList", () => {
  it("should remove words in the list", () => {
    filter.clearList()
    expect(filter.list().length).toBe(0)
  })
})
