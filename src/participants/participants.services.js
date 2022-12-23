const participantsControllers = require('./participants.controller')

const getAllParticipants = (req, res) => {
    const conversationId = req.params.conversation_id
    participantsControllers.findParticipantofOneConversation(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postParticipant = (req, res) => {
    const { userId } = req.body
    const conversationId = req.params.conversation_id
    participantsControllers.createNewParticipant({conversationId, userId})
    .then(data => {
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message, fields: {
            userId: "string"
        }})
    })
}

module.exports = {
    getAllParticipants,
    postParticipant
}