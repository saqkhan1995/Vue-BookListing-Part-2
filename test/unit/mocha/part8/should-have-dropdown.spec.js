const assert = require("chai").assert;
const parse5 = require("parse5");
const cheerio = require("cheerio");
const helpers = require("../helpers");

describe("BookForm.vue", () => {
  it("should contain a select with a `v-model` directive @book-form-will-contain-select-and-option", () => {
    const file = helpers.readFile("src/components/BookList.vue");
    const nodes = helpers.parseFile(file);
    const tagName = helpers.getHtmlTag("template", nodes);
    const content = parse5.serialize(tagName[0].content);
    const $ = cheerio.load(content);
    const select = $("select");
    const option = $("select > option");

    assert(
      select.length > 0,
      "The BookList's template does not have a <select> element."
    );

    assert.hasAnyKeys(
      select.attr(),
      ["v-model"],
      "The BookList `<select></select>` does not have a `v-model` directive containing `holding` as its value."
    );

    assert.propertyVal(
      select.attr(),
      "v-model",
      "holding",
      "The BookList `<select></select>` does not have a `v-model` directive containing `holding` as its value."
    );

    assert(
      option.length > 0,
      "The BookList's template does not have an <option> element."
    );

    assert.hasAnyKeys(
      option.attr(),
      ["v-for"],
      "The BookList `<option></option>` element does not have a `v-for` directive with `filter in filters` as its value."
    );

    assert.propertyVal(
      option.attr(),
      "v-for",
      "filter in filters",
      "The BookList `<option></option>` element does not have a `v-for` directive with `filter in filters` as its value."
    );

    assert(
      $(option)
        .text()
        .match(/\s*{{filter}}/gi),
      "The BookList `<option></option>` element does not have {{filter}} as its text."
    );
  });
});
