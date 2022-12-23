const { authorize } = require('passport')
const messageControllers = require('./messages.controllers')

const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id 
    const { message } = req.body

    messageControllers.createMessage({ userId, conversationId, message})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                message: 'text'
            }})
        })
}

const getMessages = (req, res) => {
    const conversationId = req.params.conversation_id
    messageControllers.findMessages(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMessageById = (req, res) => {
    const messageId = req.params.message_id
    messageControllers.findMessageById(messageId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMessageById = (req, res) => {
    const messageId = req.params.message_id
    messageControllers.removeMessage(messageId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const dontPatchMessagge = (req, res) => {
    const messageId = req.params.message_id
    messageControllers.dontPatch(messageId)
        .then((req) => {
            res.status(401).json({message: 'not authorized'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    postMessage,
    getMessages,
    getMessageById,
    deleteMessageById,
    dontPatchMessagge
}




