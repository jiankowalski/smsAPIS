/**
 * StatusController
 *
 * @description :: Server-side logic for managing Statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      status: req.param('status'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    Status.create(paramObj, function statusCreated(err, status) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/status/new');
      }

      // res.json(status);
      res.redirect('/status/show/' + status.id);

    });
  },

  show: function(req, res, next) {
    Status.findOne(req.param('id'), function foundStatus(err, status) {
      if (err) return next(err);
      if (!status) return next();

      // res.json(status);
      res.view({
        status: status
      });
    });
  },

  index: function(req, res, next) {
    Status.find(function foundStatuss(err, statuss) {
      if (err) return next(err);
      
      res.view({
        statuss: statuss
      });
    });
  },

  edit: function(req, res, next) {

    Status.findOne(req.param('id'), function foundStatus(err, status) {
      if (err) return next(err);
      if (!status) return next('status doesn\'t exist.');

      res.view({
        status: status
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      status: req.param('status'),

    }

    Status.update(req.param('id'), paramObj, function statusUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/status/edit/' + req.param('id'));
      }

      res.redirect('/status/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    Status.findOne(req.param('id'), function foundStatus(err, status) {
      if (err) return next(err);

      if (!status) return next('Status doesn\'t exist.');

      Status.destroy(req.param('id'), function statusDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/status');

    });
  }
 

};

