function websocket(req, res) {
  const { _id } = req.user;

  res.websocket(_id);
}

module.exports = { websocket };