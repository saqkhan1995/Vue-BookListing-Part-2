const assert = require("chai").assert;
const parse5 = require("parse5");
const cheerio = require("cheerio");
const helpers = require("../helpers");

describe("BookItem.vue", () => {
  it("should show read or not read according to book.finishedReading @show-read-or-not-read", () => {
    const file = helpers.readFile("src/components/BookItem.vue");
    const nodes = helpers.parseFile(file);
    const tagName = helpers.getHtmlTag("template", nodes);
    const content = parse5.serialize(tagName[0].content);
    const $ = cheerio.load(content);

    const firstSpan = $("span");
    const secondSpan = $("span:nth-child(2n)");

    assert(
      $(firstSpan).length > 0,
      "It doesn't look like we are adding the `span` HTML element to the BookList template."
    );

    assert(
      $(secondSpan).length > 0,
      "It doesn't look like we are adding two `span` elements to the BookList template."
    );

    assert.hasAnyKeys(
      firstSpan.attr(),
      ["v-if"],
      "The BookItem template does not a span with a `v-if` directive."
    );

    assert.propertyVal(
      firstSpan.attr(),
      "v-if",
      "book.finishedReading",
      "The BookItem template does not a span with a `v-if` directive containing `book.finishedReading`."
    );

    assert(
      $(firstSpan)
        .text()
        .match(/\s*Read/gi),
      "The BookItem span with the `v-if` directive does not have a text of `Read`."
    );

    assert.hasAnyKeys(
      secondSpan.attr(),
      ["v-else"],
      "The BookItem template does not a span with a `v-else` directive."
    );

    assert(
      $(secondSpan)
        .text()
        .match(/\s*Not\s*Read/gi),
      "The BookItem span with the `v-else` directive does not have a text of `Not Read`."
    );
  });
});
