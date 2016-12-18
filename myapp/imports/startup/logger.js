// Initialize Logger:
this.log = new Logger();

// Initialize LoggerConsole and enable with default settings:
(new LoggerConsole(log)).enable();

// Initialize LoggerConsole and enable with custom formatting:
(new LoggerConsole(log, {
  format: function (opts) {
    return ((Meteor.isServer) ? '[SERVER]' : "[CLIENT]") + ' [' + opts.level + '] - ' + opts.message;
  }
})).enable();