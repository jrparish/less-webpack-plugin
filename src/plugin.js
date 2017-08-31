const { fork } = require('child_process');
const path = require('path');

function apply(options, compiler) {
  fork(path.resolve(__dirname, 'lessWatcher.js'), [JSON.stringify(options)]);
}

module.exports = function LessWebpackPlugin(options = {}) {
  return {
    apply: apply.bind(this, options)
  };
}
