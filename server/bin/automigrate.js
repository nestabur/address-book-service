var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var contacts = [
  {
    email: 'foo@bar.com',
    first_name: 'Stefan',
    last_name: 'Müller'
  },
  {
    email: 'baz@qux.com',
    first_name: 'Franz',
    last_name: 'Binggeli'
  }
];
var dataSource = app.dataSources.contactDs;

dataSource.automigrate('Contact', function(err) {
  if (err) console.log(err);

  var Contact = app.models.Contact;
  var count = contacts.length;

  contacts.forEach(function(contact) {
    Contact.create(contact, function(err, record) {
      if (err) return console.log(err);

      console.log('Record created:', record);

      count--;

      if (count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});


dataSource.automigrate('User', function(err) {
  if (err) throw err;

  console.log('User model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('AccessToken', function(err) {
  if (err) throw err;

  console.log('AccessToken model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('ACL', function(err) {
  if (err) throw err;

  console.log('ACL model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('RoleMapping', function(err) {
  if (err) throw err;

  console.log('RoleMapping model migrated');
  //dataSource.disconnect();
});
dataSource.automigrate('Role', function(err) {
  if (err) throw err;

  console.log('Role model migrated');
  dataSource.disconnect();
});
