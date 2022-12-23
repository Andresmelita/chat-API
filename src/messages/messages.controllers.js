const Messages = require('../models/messages.models')
const Conversations = require('../models/conversations.models')
const uuid = require('uuid')
const Users = require('../models/users.models')

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId : obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const findMessages = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId: conversationId
        },
        attributes: {
            exclude: ['updatedAt', 'userId']
        },
        include: {
            model: Users,
            attributes: ['firstName', 'lastName']
        }
    })
    return data
}

const findMessageById = async (id) => {
    const data = await Messages.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['updatedAt', 'userId']
        },
        include: {
            model: Users,
            attributes: ['firstName', 'lastName']
        }
    })
    return data
}

const removeMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
}

const dontPatch = async () => {
    const data = false
    return data
}



module.exports = {
    createMessage,
    findMessages,
    findMessageById,
    removeMessage,
    dontPatch
}
