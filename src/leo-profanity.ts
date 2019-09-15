import util from "./module/util"
import defaultDictionary from "./dictionary/default"
let wordDictionary: { [key: string]: string[] } = {
  default: defaultDictionary
}
let words: string[] = wordDictionary["default"]

class LeoProfanity {
  /**
   * Return all profanity words
   */
  list() {
    return words
  }

  /**
   * Check the string contain profanity words or not
   * Approach, to make it fast ASAP
   *
   * @see http://stackoverflow.com/questions/26425637/javascript-split-string-with-white-space
   * @see http://stackoverflow.com/questions/6116474/how-to-find-if-an-array-contains-a-specific-string-in-javascript-jquery
   * @see http://stackoverflow.com/questions/9141951/splitting-string-by-whitespace-without-empty-elements
   */
  check(str: string) {
    if (!str) return false

    let i = 0
    let isFound = false

    str = this.sanitize(str)

    // convert into array and remove white space
    const strs = str.match(/[^ ]+/g) || []

    while (!isFound && i <= words.length - 1) {
      if (strs.includes(words[i])) isFound = true
      i++
    }

    return isFound
  }

  /**
   * Replace profanity words
   *
   * @todo improve algorithm
   * @see http://stackoverflow.com/questions/26425637/javascript-split-string-with-white-space
   */
  clean(str: string, replaceKey = "*") {
    if (!str) return ""

    const self = this
    const originalString = str
    let result = str

    const sanitizedStr = this.sanitize(originalString)
    // split by whitespace (keep delimiter)
    // (cause comma and dot already replaced by whitespace)
    const sanitizedArr = sanitizedStr.split(/(\s)/)
    // split by whitespace, comma and dot (keep delimiter)
    let resultArr = result.split(/(\s|,|\.)/)

    // loop through given string
    sanitizedArr.forEach(function(item, index) {
      if (words.includes(item)) {
        const replacementWord = self.getReplacementWord(replaceKey, item.length)
        resultArr[index] = replacementWord
      }
    })

    // combine it
    result = resultArr.join("")

    return result
  }

  /**
   * Add words to the list
   */
  add(words: string[]) {
    words.forEach(word => this.addWord(word))
    return this
  }

  /**
   * Remove words from the list
   */
  remove(words: string[]) {
    words.forEach(word => this.removeWord(word))
    return this
  }

  /**
   * Reset word list by using default dictionary (also remove word that manually add)
   */
  reset() {
    words = util.clone(this.getDictionary("default"))
    return this
  }

  /**
   * Clear word list
   */
  clearList() {
    words = []
    return this
  }

  /**
   * Remove word from the list
   */
  private removeWord(word: string) {
    const index = words.indexOf(word)
    if (index !== -1) words.splice(index, 1)
    return this
  }

  /**
   * Add word into the list
   */
  private addWord(word: string) {
    if (words.indexOf(word) === -1) words.push(word)
    return this
  }

  /**
   * Return replacement word from key
   * (private)
   *
   * @example
   * getReplacementWord('*', 3)
   * return '***'
   *
   * @example
   * getReplacementWord('-', 4)
   * return '----'
   */
  private getReplacementWord(key: string, n: number) {
    let replacementWord = ""
    for (let i = 0; i < n; i++) replacementWord += key
    return replacementWord
  }

  /**
   * Get word dictionary
   * Now, we only have default dictionary
   */
  private getDictionary(name: string) {
    if (!(name in wordDictionary)) name = "default"
    return wordDictionary[name]
  }

  /**
   * Sanitize string for this project
   * 1. Convert to lower case
   * 2. Replace comma and dot with space
   */
  private sanitize(str: string) {
    return str.toLowerCase().replace(/\.|,/g, " ")
  }
}

export default LeoProfanity
