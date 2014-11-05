!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.ReactTextSampleComponent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var React = window.React;
var truncate = require("truncate");

var TextSample = React.createClass({displayName: 'TextSample',

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
      React.createElement("p", {className: "text-sample"}, 
        text.split(" ").map(function(word, i) {
          return (
            React.createElement("span", {key: i, className: "text-sample__word"}, 
              word.split("").map(function(letter, j) {
                return React.createElement("span", {key: j, className: "text-sample__letter"});
              })
            )
          );
        })
      )
    );
  }

});

module.exports = TextSample;

},{"truncate":2}],2:[function(require,module,exports){
/*global module:true*/
/*jslint nomen:true*/
/**
 * @module Utility
 */
(function (context, undefined) {
    'use strict';

    var DEFAULT_TRUNCATE_SYMBOL = '...',
        URL_REGEX               = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g; // Simple regexp

    function __appendEllipsis(string, options, content){
        if(content.length === string.length || !options.ellipsis){return content;}
        content += options.ellipsis;
        return content;
    }
    /**
     * Truncate HTML string and keep tag safe.
     *
     * @method truncate
     * @param {String} string string needs to be truncated
     * @param {Number} maxLength length of truncated string
     * @param {Object} options (optional)
     * @param {Boolean} [options.keepImageTag] flag to specify if keep image tag, false by default
     * @param {Boolean|String} [options.ellipsis] omission symbol for truncated string, '...' by default
     * @return {String} truncated string
     */
    function truncate(string, maxLength, options) {
        var content = '',         // truncated text storage
            matches = true,
            remainingLength = maxLength,
            result,
            index;

        options          = options || {};
        options.ellipsis = (typeof options.ellipsis === "undefined") ? DEFAULT_TRUNCATE_SYMBOL : options.ellipsis;

        if(!string || string.length === 0){
            return '';
        }

        matches = true;
        while(matches){
            URL_REGEX.lastIndex = content.length;
            matches = URL_REGEX.exec(string);

            if(!matches || (matches.index - content.length) >= remainingLength){
                content += string.substring(content.length, maxLength);
                return __appendEllipsis(string, options, content, maxLength);
            }

            result  = matches[0];
            index   = matches.index;
            content += string.substring(content.length, index + result.length);
            remainingLength -= index + result.length;

            if(remainingLength <= 0){
                break;
            }
        }

        return __appendEllipsis(string, options, content, maxLength);
    }

    if ('undefined' !== typeof module && module.exports) {
        module.exports = truncate;
    } else {
        context.truncate = truncate;
    }
}(String));

},{}]},{},[1])(1)
});