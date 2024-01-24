import * as amqp from 'amqplib'

const queueName = 'report' 
const msg = 'whatever'
const reporter = async () => {
    const connection = await amqp.connect()
    const channel = await connection.createChannel()

}