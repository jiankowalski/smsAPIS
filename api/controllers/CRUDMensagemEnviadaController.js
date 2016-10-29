/**
 * MensagemEnviadaController
 *
 * @description :: Server-side logic for managing Mensagemenviadas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  'new': function(req,res){
    Pessoa.find(function(err, pessoas) {
        if (err) {return res.serverError(err);}
        return res.view({pessoas: pessoas});
    });  
  },

  create: function(req, res) {

    var paramObj = {

      mensagem: req.param('mensagem'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    MensagemEnviada.create(paramObj, function mensagemEnviadaCreated(err, mensagemEnviada) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/mensagemEnviada/new');
      }

      // res.json(mensagemEnviada);
      res.redirect('/crudmensagemEnviada/show/' + mensagemEnviada.id);

    });
  },

  show: function(req, res, next) {
    MensagemEnviada.findOne(req.param('id'), function foundMensagemEnviada(err, mensagemEnviada) {
      if (err) return next(err);
      if (!mensagemEnviada) return next();

      // res.json(mensagemEnviada);
      res.view({
        mensagemEnviada: mensagemEnviada
      });
    });
  },

  index: function(req, res, next) {
    MensagemEnviada.find(function foundMensagemEnviadas(err, mensagemEnviadas) {
      if (err) return next(err);
      
      res.view({
        mensagemEnviadas: mensagemEnviadas
      });
    });
  },

  edit: function(req, res, next) {

    MensagemEnviada.findOne(req.param('id'), function foundMensagemEnviada(err, mensagemEnviada) {
      if (err) return next(err);
      if (!mensagemEnviada) return next('mensagemEnviada doesn\'t exist.');

      res.view({
        mensagemEnviada: mensagemEnviada
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      mensagem: req.param('mensagem'),

    }

    MensagemEnviada.update(req.param('id'), paramObj, function mensagemEnviadaUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/crudmensagemEnviada/edit/' + req.param('id'));
      }

      res.redirect('/crudmensagemEnviada/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    MensagemEnviada.findOne(req.param('id'), function foundMensagemEnviada(err, mensagemEnviada) {
      if (err) return next(err);

      if (!mensagemEnviada) return next('MensagemEnviada doesn\'t exist.');

      MensagemEnviada.destroy(req.param('id'), function mensagemEnviadaDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/crudmensagemEnviada');

    });
  }
 

};

