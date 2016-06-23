var context = require.context("./tests", false, /\S+\.js$/);
context.keys().forEach(context);