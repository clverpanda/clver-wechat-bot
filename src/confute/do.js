const ConfuteDo = async (msg, config) => {
    if (!config.confute || msg.self()) return;
    const contact = msg.from();
    const text = msg.text();
    const room = msg.room();
    if (room) {
      const topic = await room.topic();
      if (!config.confute_contact.includes(topic)) return;
      room.say(`反${text}`);
    } else {
      const name = contact.name();
      if (!config.confute_contact.includes(name)) return;
      contact.say(`反${text}`);
    }
}

module.exports = ConfuteDo;