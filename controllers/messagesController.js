const messageModel = require("../model/messageModel")

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from,to,message} = req.body
        const data = await messageModel.create(
            {
                message: {
                    text: message
                },
                users: [from, to],
                sender: from
            }
        )
        if(data) {
            return res.json({
                msg: "messages add succes"
            })
        } else {
            return res.json({
                msg: "failed to add"
            })
        }
    } catch (error) {
        next(error)
    }
}
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const {from, to} = req.body
        const messages = messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({updateAt: 1})
        const projectMessages = (await messages).map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
    }
}
