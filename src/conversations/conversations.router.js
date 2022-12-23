const router = require('express').Router()
const conversationServices = require('./conversations.services')
const messageServices = require('../messages/messages.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantsServices = require('../participants/participants.services')
const participantValidate = require('../middlewares/participantValidate.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)   //mostrar conversaciones
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)     //crear conversación

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)   //mostrar conversación específica
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)   //editar conversación
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConvesation)  //eliminar conversación

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.getMessages)  //mostrar mensajes de la conversación
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.postMessage) //escribir mensajes en la conversación

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.getMessageById)        //mostrar mensaje específico
    .patch(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.dontPatchMessagge)   //Edición no permitida (aviso)
    .delete(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.deleteMessageById)  //eliminar mensaje específico

//? ***********************************************   Retos opcionales   **********************************************
router.route('/:conversation_id/participants')
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, participantsServices.getAllParticipants)  //muestra los participantes de la conversación
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, participantsServices.postParticipant)

module.exports = router