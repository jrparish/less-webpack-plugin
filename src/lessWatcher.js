const chalk = require('chalk');
const chokidar = require('chokidar');
const less = require('less');
const path = require('path');
const fs = require('fs');
const cssmin = require('cssmin');

process.stdout.write(chalk.cyan('[less-plugin] Starting less-watcher in separate process...\n'));

const {
  watch,
  entry,
  output,
  paths = [],
  minify = true
} = JSON.parse(process.argv[2]) || {};

const watcher = chokidar.watch(watch);

watcher.on('change', (changedPath) => {
  process.stdout.write(chalk.cyan(`[less-plugin] File changed: Recompiling - ${changedPath}\n`));

  const entryFile = fs.readFileSync(path.resolve(entry));

  less.render(entryFile.toString(), { paths })
    .then(({ css }) => {
      const finalCss = minify ? cssmin(css) : css;
      fs.writeFileSync(path.resolve(output), finalCss);
      process.stdout.write(chalk.green(`[less-plugin] Compilation complete.\n`));
    }, (err) => {
      process.stdout.write(chalk.red(`[less-plugin] ${err}\n`));
    });
});
