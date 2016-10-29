/**
 * MensagemEnviada.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // Add a reference 
    pessoa: {
      model: 'pessoa'
    },
    //add ref a situacaoMensagem
    situacaoMensagem: {
      collection: 'situacaoMensagem',
      via: 'mensagemEnviada'
    },

    // Add a reference 
    mensagem: {
      model: 'mensagem'
    }
  }
};
