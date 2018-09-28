export const console = (function(console) {
  let log = console.log;
  let info = console.info;
  let debug = console.debug;
  let warn = console.warn;
  let error = console.error;

  console.history = [];
  console.store = function(type: string, lines: IArguments) {
    console.history = console.history.concat(
      Array.from(lines).map((line) => `[${new Date().toTimeString().slice(0, 7)}] ${type}: ${line}`),
    );
  };

  console.log = function() { console.store('log', arguments); log.apply(this, arguments); };
  console.info = function() { console.store('info', arguments); info.apply(this, arguments); };
  console.debug = function() { console.store('debug', arguments); debug.apply(this, arguments); };
  console.warn = function() { console.store('warn', arguments); warn.apply(this, arguments); };
  console.error = function() { console.store('error', arguments); error.apply(this, arguments); };

  return console;
}(window.console));

//Then redefine the old console
window.console = console;
