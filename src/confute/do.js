const ConfuteDo = async (msg, config) => {
    if (!config.confute || msg.self()) return 0;
    const contact = msg.from();
    const text = msg.text();
    const room = msg.room();
    if (room) {
      const topic = await room.topic();
      if (!config.confute_contact.includes(topic)) return 0;
      room.say(`反${text}`);
    } else {
      const name = contact.name();
      if (!config.confute_contact.includes(name)) return 0;
      contact.say(`反${text}`);
    }
    return 1;
}

module.exports = ConfuteDo;