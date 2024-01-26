import * as amqp from "amqplib";

const queueName = "report";

const fibonacci = (number) => {
  if (number == 0 || number == 1) {
    return number;
  }
  return fibonacci(number - 1) + fibonacci(number - 2);
};

(async () => {
  const connection = await amqp.connect("amqp://localhost:5673");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { exclusive: true });
  await channel.prefetch(1);
  await channel.consume(queueName, function reply(msg) {
    const n = parseInt(msg.content.toString());
    console.log(" [.] msg:(%d)", n);
    const response = fibonacci(n);
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(response.toString()),
      {
        correlationId: msg.properties.correlationId,
      }
    );
    channel.ack(msg);
  });
})();
