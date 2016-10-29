/**
 * PessoaController
 *
 * @description :: Server-side logic for managing Pessoas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  'new': function(req,res){    
    req.session.flash = {
    }
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      nome: req.param('nome'),

      numero: req.param('numero'),

      email: req.param('email'),

      facebook: req.param('facebook'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    Pessoa.create(paramObj, function pessoaCreated(err, pessoa) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/pessoa/new');
      }

      // res.json(pessoa);
      res.redirect('/pessoa/show/' + pessoa.id);

    });
  },

  show: function(req, res, next) {
    Pessoa.findOne(req.param('id'), function foundPessoa(err, pessoa) {
      if (err) return next(err);
      if (!pessoa) return next();

      // res.json(pessoa);
      res.view({
        pessoa: pessoa
      });
    });
  },

  index: function(req, res, next) {
    Pessoa.find(function foundPessoas(err, pessoas) {
      if (err) return next(err);
      
      res.view({
        pessoas: pessoas
      });
    });
  },

  edit: function(req, res, next) {

    Pessoa.findOne(req.param('id'), function foundPessoa(err, pessoa) {
      if (err) return next(err);
      if (!pessoa) return next('pessoa doesn\'t exist.');

      res.view({
        pessoa: pessoa
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      nome: req.param('nome'),

      numero: req.param('numero'),

      email: req.param('email'),

      facebook: req.param('facebook'),

    }

    Pessoa.update(req.param('id'), paramObj, function pessoaUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/pessoa/edit/' + req.param('id'));
      }

      res.redirect('/pessoa/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    Pessoa.findOne(req.param('id'), function foundPessoa(err, pessoa) {
      if (err) return next(err);

      if (!pessoa) return next('Pessoa doesn\'t exist.');

      Pessoa.destroy(req.param('id'), function pessoaDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/pessoa');

    });
  },
  recupera: function (res,req) {
    res.json(null)
    res.json({ nome,numero,facebook,email })
  }


};

