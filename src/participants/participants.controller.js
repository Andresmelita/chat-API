const Participants = require('../models/participants.models')
const Users = require('../models/users.models')
const uuid = require('uuid')

const findParticipantConversations = async (userId, conversationId) => {
    const data = await Participants.findOne({
        where: {
            userId: userId,
            conversationId: conversationId
        },
    })
    return data
}

const findParticipantofOneConversation = async (conversationId) => {
    const data = await Participants.findAll({
        where: {
            conversationId: conversationId,
        },
        attributes: {
            exclude: ['userId', 'updatedAt' ]
        },
        include: {
            model: Users,
            attributes: ['id', 'firstName', 'lastName']
        }
    })
    return data
}

const createNewParticipant = async (obj) => {
    const data = await Participants.create({
        id: uuid.v4(),
        UserId : obj.userId,
        conversationId: obj.conversationId,
    })
    return data
}

module.exports = {
    findParticipantConversations,
    findParticipantofOneConversation,
    createNewParticipant
}
