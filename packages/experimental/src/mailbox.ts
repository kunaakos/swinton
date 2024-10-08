import { Mailbox } from 'src/types/mailbox'
import { Message } from 'src/types/message'
import { MessageList } from 'src/types/system'

import { cloneMessage } from 'src/util/cloneMessage'

export const initMailbox = (): Mailbox => {
    const storedMessages: MessageList = []

    const hasMessages = () => Boolean(storedMessages.length)
    const isEmpty = () => !Boolean(storedMessages.length)

    const deliver = (messages: MessageList) => {
        storedMessages.push(...messages.map(cloneMessage))
    }

    const getOldest = (): Message => {
        if (!storedMessages.length || !storedMessages[0])
            throw new Error('No message in mailbox.')
        return cloneMessage(storedMessages[0])
    }

    const deleteOldest = () => {
        storedMessages.shift()
    }

    const getAll = (): MessageList => {
        return [...storedMessages.map(cloneMessage)]
    }

    const deleteAll = () => {
        storedMessages.splice(0, storedMessages.length)
    }

    return {
        hasMessages,
        isEmpty,
        deliver,
        getOldest,
        deleteOldest,
        getAll,
        deleteAll,
    }
}
