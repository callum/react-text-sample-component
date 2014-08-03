/**
 * @jsx React.DOM
 */

"use strict";

var React = require("react");
var truncate = require("truncate");

var TextSample = React.createClass({

  propTypes: {
    text: React.PropTypes.string.isRequired,
    truncateLength: React.PropTypes.number
  },

  render: function() {
    var text = this.props.text;
    var truncateLength = this.props.truncateLength;

    if (truncateLength) {
      text = truncate(text, truncateLength, {ellipsis: null});
    }

    return this.transferPropsTo(
      <p className="text-sample">
        {text.split(" ").map(function(word, i) {
          return (
            <span key={i} className="text-sample__word">
              {word.split("").map(function(letter, j) {
                return <span key={j} className="text-sample__letter" />;
              })}
            </span>
          );
        })}
      </p>
    );
  }

});

module.exports = TextSample;
