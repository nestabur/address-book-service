var loopback = require('loopback');

module.exports = function(Contact) {
// Set group owner
  Contact.beforeRemote('create', function(ctx, contact, next) {
    var body = ctx.req.body;

    if (ctx.req.accessToken) {
      body.user_id = ctx.req.accessToken.userId;
    } else {
      // Do not allow setting the user id for unauthenticated users
      delete body.user_id;
    }

    next();
  });
  Contact.beforeRemote('update', function(ctx, contact, next) {
    var body = ctx.req.body;

    if (ctx.req.accessToken) {
      body.user_id = ctx.req.accessToken.userId;
    } else {
      // Do not allow setting the user id for unauthenticated users
      delete body.user_id;
    }

    next();
  });
  Contact.beforeRemote('upsert', function(ctx, contact, next) {
    var body = ctx.req.body;

    if (ctx.req.accessToken) {
      body.user_id = ctx.req.accessToken.userId;
    } else {
      // Do not allow setting the user id for unauthenticated users
      delete body.user_id;
    }

    next();
  });

  Contact.beforeRemote('find', function(ctx, contact, next) {
    var body = ctx.req.body;

    if (ctx.req.accessToken) {
      ctx.args.filter = {
        where: {
          user_id: ctx.req.accessToken.userId
        }
      };

    }

    next();
  });



 Contact.myContacts = function(cb) {
     var ctx = loopback.getCurrentContext();
    // Get the current access token
    var accessToken = ctx.get('accessToken');

    Contact.find({
      where: {
        user_id: accessToken.userId
      }
    }, cb);
  };
  Contact.remoteMethod('myContacts', {
    returns: {arg: 'contacts', type: 'array'},
    http: {path:'/my-contacts', verb: 'get'}
  });
};
