/**
 * SituacaoMensagem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    data : { type: 'date' },

    // Add a reference to MensagemEnviada
    mensagemEnviada: {
      model: 'mensagemEnviada'
    },

    // Add a reference 
    status: {
      model: 'status'
    }
  }
};