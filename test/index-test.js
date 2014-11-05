"use strict";

var test = require("tape");
var ReactTestUtils = require("react/addons").addons.TestUtils;
var TextSample = require("../");

function getElements(props) {
  var component = ReactTestUtils.renderIntoDocument(TextSample(props));
  return {
    words: ReactTestUtils.scryRenderedDOMComponentsWithClass(
      component, "text-sample__word"),
    letters: ReactTestUtils.scryRenderedDOMComponentsWithClass(
      component, "text-sample__letter")
  };
}

test("show text", function(t) {
  t.plan(2);

  var elements = getElements({
    text: "some text"
  });

  t.equal(elements.words.length, 2);
  t.equal(elements.letters.length, 8);
});

test("truncate text", function(t) {
  t.plan(2);

  var elements = getElements({
    text: "some more text",
    truncateLength: 9
  });

  t.equal(elements.words.length, 2);
  t.equal(elements.letters.length, 8);
});
