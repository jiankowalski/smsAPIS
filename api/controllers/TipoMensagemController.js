/**
 * TipoMensagemController
 *
 * @description :: Server-side logic for managing Tipomensagems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      descricao: req.param('descricao'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    TipoMensagem.create(paramObj, function tipoMensagemCreated(err, tipoMensagem) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/tipoMensagem/new');
      }

      // res.json(tipoMensagem);
      res.redirect('/tipoMensagem/show/' + tipoMensagem.id);

    });
  },

  show: function(req, res, next) {
    TipoMensagem.findOne(req.param('id'), function foundTipoMensagem(err, tipoMensagem) {
      if (err) return next(err);
      if (!tipoMensagem) return next();

      // res.json(tipoMensagem);
      res.view({
        tipoMensagem: tipoMensagem
      });
    });
  },

  index: function(req, res, next) {
    TipoMensagem.find(function foundTipoMensagems(err, tipoMensagems) {
      if (err) return next(err);
      
      res.view({
        tipoMensagems: tipoMensagems
      });
    });
  },

  edit: function(req, res, next) {

    TipoMensagem.findOne(req.param('id'), function foundTipoMensagem(err, tipoMensagem) {
      if (err) return next(err);
      if (!tipoMensagem) return next('tipoMensagem doesn\'t exist.');

      res.view({
        tipoMensagem: tipoMensagem
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      descricao: req.param('descricao'),

    }

    TipoMensagem.update(req.param('id'), paramObj, function tipoMensagemUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/tipoMensagem/edit/' + req.param('id'));
      }

      res.redirect('/tipoMensagem/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    TipoMensagem.findOne(req.param('id'), function foundTipoMensagem(err, tipoMensagem) {
      if (err) return next(err);

      if (!tipoMensagem) return next('TipoMensagem doesn\'t exist.');

      TipoMensagem.destroy(req.param('id'), function tipoMensagemDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/tipoMensagem');

    });
  }
 

};

