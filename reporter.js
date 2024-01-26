import * as amqp from "amqplib";
const queueName = "report";
const msg = 16;
(async () => {
  const connection = await amqp.connect("amqp://localhost:5673");
  const channel = await connection.createChannel();
  await channel.assertQueue("", { durable: true });
  channel.prefetch(1);
  console.log(" [x] waiting RPC requests");
  const correlationId = generateUuid();
  console.log(" [x] Requesting fib(%d)", msg);
  channel.consume(
    queueName,
    function (msg) {
      if (msg.properties.correlationId === correlationId) {
        console.log(" [.] Got %s", msg.content.toString());
        setTimeout(function () {
          connection.close(process.exit(0));
        }, 500);
      }
    },
    { noAck: true }
  );
  channel.sendToQueue(queueName, Buffer.from(msg.toString()), {
    correlationId: correlationId,
    replyTo: queueName,
  });
})();

function generateUuid() {
  return;
  Math.random().toString() +
    Math.random().toString() +
    Math.random().toString();
}
