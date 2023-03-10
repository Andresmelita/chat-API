const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')


const initModels = () => {
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    // users - messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    // users - conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    // users - participants (pivot table)
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    // conversations - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    // conversations - participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels