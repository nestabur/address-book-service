var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.contactDs;

dataSource.discoverAndBuildModels('contact', {schema: 'public'},
    function(err, models) {
  if (err) throw err;

  models.Contact.find(function(err, contacts) {
    if (err) return console.log(err);

    dataSource.disconnect();
  });
});
