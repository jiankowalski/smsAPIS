2/**
 * MensagemController
 *
 * @description :: Server-side logic for managing Mensagems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  new: function(req,res){
    
  },

  create: function(req, res) {

    var paramObj = {

      mensagem: req.param('mensagem'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    Mensagem.create(paramObj, function mensagemCreated(err, mensagem) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/mensagem/new');
      }

      // res.json(mensagem);
      res.redirect('/mensagem/show/' + mensagem.id);

    });
  },

  show: function(req, res, next) {
    Mensagem.findOne(req.param('id'), function foundMensagem(err, mensagem) {
      if (err) return next(err);
      if (!mensagem) return next();

      if(req.wantsJSON) {
        res.json(mensagem); 
      } else {
        res.view({
          mensagem: mensagem
        });
      }
    });
  },

  index: function(req, res, next) {
    Mensagem.find(function foundMensagems(err, mensagems) {
      if (err) return next(err);
      if(req.wantsJSON) {
        res.json(mensagems); 
      } else {
        res.view({
          mensagems: mensagems
        });
      }
    });
  },

  edit: function(req, res, next) {

    Mensagem.findOne(req.param('id'), function foundMensagem(err, mensagem) {
      if (err) return next(err);
      if (!mensagem) return next('mensagem doesn\'t exist.');

      res.view({
        mensagem: mensagem
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      mensagem: req.param('mensagem'),

    }

    Mensagem.update(req.param('id'), paramObj, function mensagemUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/mensagem/edit/' + req.param('id'));
      }

      res.redirect('/mensagem/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    Mensagem.findOne(req.param('id'), function foundMensagem(err, mensagem) {
      if (err) return next(err);

      if (!mensagem) return next('Mensagem doesn\'t exist.');

      Mensagem.destroy(req.param('id'), function mensagemDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/mensagem');

    });
  }
 

};

