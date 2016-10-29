/**
 * Pessoa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nome : { type: 'string' },

    numero : { type: 'integer' },

    email : { type: 'email' },

    facebook : { type: 'string' },

    // Add a reference 
    mensagensEnviadas: {
      collection: 'mensagemEnviada',
      via: 'pessoa'
    }
  }
};