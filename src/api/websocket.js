function websocket(req, res) {
  const { _id } = req.user;

  console.log(">>> /ws websocket hit by user", req.user.identifier);

  res.websocket(_id);
}

module.exports = { websocket };