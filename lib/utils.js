"use babel";
import _s from 'underscore.string';

module.exports = {
  getRangeForQueryAtCursor: function (editor) {
    let queryEndRegex = /^.*\;$/;
    let currentCursorRow = editor.getCursorBufferPosition().row;
    let range = [[0], [editor.getLastBufferRow() + 1]];
    editor.scanInBufferRange(queryEndRegex, [[currentCursorRow], [editor.getLastBufferRow() + 1]],
      function (endMatch) {
        range[1] = [endMatch.range.start.row + 1];
        return endMatch.stop();
      });
    editor.backwardsScanInBufferRange(queryEndRegex, [[0], [currentCursorRow]],
      function (startMatch) {
        range[0] = [startMatch.range.start.row + 1];
        return startMatch.stop();
      });
    return range;
  },

  nullToEmpty(str) {
    return str ? str : '';
  },

  escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  trimRight(str) {
    var tail = str.length;
    while (/[\s\uFEFF\u00A0]/.test(str[tail - 1])) {
      tail--;
    }
    return str.slice(0, tail);
  }


};


