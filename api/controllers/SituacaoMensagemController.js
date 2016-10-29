/**
 * SituacaoMensagemController
 *
 * @description :: Server-side logic for managing Situacaomensagems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      data: req.param('data'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    SituacaoMensagem.create(paramObj, function situacaoMensagemCreated(err, situacaoMensagem) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/situacaoMensagem/new');
      }

      // res.json(situacaoMensagem);
      res.redirect('/situacaoMensagem/show/' + situacaoMensagem.id);

    });
  },

  show: function(req, res, next) {
    SituacaoMensagem.findOne(req.param('id'), function foundSituacaoMensagem(err, situacaoMensagem) {
      if (err) return next(err);
      if (!situacaoMensagem) return next();

      // res.json(situacaoMensagem);
      res.view({
        situacaoMensagem: situacaoMensagem
      });
    });
  },

  index: function(req, res, next) {
    SituacaoMensagem.find(function foundSituacaoMensagems(err, situacaoMensagems) {
      if (err) return next(err);
      
      res.view({
        situacaoMensagems: situacaoMensagems
      });
    });
  },

  edit: function(req, res, next) {

    SituacaoMensagem.findOne(req.param('id'), function foundSituacaoMensagem(err, situacaoMensagem) {
      if (err) return next(err);
      if (!situacaoMensagem) return next('situacaoMensagem doesn\'t exist.');

      res.view({
        situacaoMensagem: situacaoMensagem
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      data: req.param('data'),

    }

    SituacaoMensagem.update(req.param('id'), paramObj, function situacaoMensagemUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/situacaoMensagem/edit/' + req.param('id'));
      }

      res.redirect('/situacaoMensagem/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    SituacaoMensagem.findOne(req.param('id'), function foundSituacaoMensagem(err, situacaoMensagem) {
      if (err) return next(err);

      if (!situacaoMensagem) return next('SituacaoMensagem doesn\'t exist.');

      SituacaoMensagem.destroy(req.param('id'), function situacaoMensagemDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/situacaoMensagem');

    });
  }
 

};

