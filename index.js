console.log('Iniciando 🚀🚀🚀') 
import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import cluster from "cluster";
import { watchFile, unwatchFile } from "fs";
import cfonts from "cfonts";
import chalk from "chalk";
import { createInterface } from "readline";
import yargs from "yargs";
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, "./package.json"));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('𝐸𝓁𝓉𝒶\nBot\nMD', {
font: 'chrome',
align: 'center',
gradient: ['red', 'magenta']})
say(`by Elta`, {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']});

var isRunning = false;
/**
* Start a js file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return
  isRunning = true;
  let args = [join(__dirname, file), ...process.argv.slice(2)]

  cluster.setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = cluster.fork()
p.on('message', data => {
console.log('╭--------- - - - ✓\n┆ ✅ Runinng\n╰-------------------- - - -', data)
switch (data) {
case 'reset':
p.process.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}})
p.on('exit', (_, code) => {
isRunning = false
console.error('⚠️ Error Inesperado ⚠️', code)
if (code === 0) return
watchFile(args[0], () => {
unwatchFile(args[0])
start(file)
})
})
let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
if (!opts['test'])
if (!rl.listenerCount()) rl.on('line', line => {
p.emit('message', line.trim())
})
//console.log(p)
}
start('main.js')