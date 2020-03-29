const express = require("express");

const { base } = require("./base");
const { login } = require("./login");
const {
  getDevice,
  getDevicesInHome,
  getDevicesInRoom,
  postDevice
} = require("./devices");
const { getHome, getHomes, postHome } = require("./homes");
const { getIdentity } = require("./getIdentity");
const {
  deleteInvitation,
  getInvitations,
  postInvitation,
  putInvitation
} = require("./invitations");
const { getRoom, getRooms, postRoom } = require("./rooms");
const {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
  putUserAdmin,
  putUserLocked
} = require("./users");

const {
  authentication,
  identification,
  permitAdmin,
  timestamp,
  unmatchedRoute,
  validation
} = require("../middleware");

const { withObjectIDMapper } = require("../utils");

const router = new express.Router();

withObjectIDMapper(router);

router.get("/", base);

router.use(timestamp);

router.post("/login", login);

router.use(authentication);
router.use(identification);
router.use(validation);

router.get("/devices/:deviceId", getDevice);

router.get("/homes", getHomes);
router.get("/homes/:homeId", getHome);
router.get("/homes/:homeId/devices", getDevicesInHome);
router.get("/homes/:homeId/rooms", getRooms);
router.post("/homes", postHome);
router.post("/homes/:homeId/rooms", postRoom);

router.get("/identity", getIdentity);

router.delete("/invitations/:invitationId", deleteInvitation);
router.get("/invitations", getInvitations);
router.post("/invitations", postInvitation);
router.put("/invitations/:invitationId", putInvitation);

router.get("/rooms/:roomId", getRoom);
router.get("/rooms/:roomId/devices", getDevicesInRoom);
router.post("/rooms/:roomId/devices", postDevice);

router.delete("/users/:userId", deleteUser);
router.get("/users", permitAdmin, getUsers);
router.get("/users/:userId", permitAdmin, getUser);
router.post("/users", permitAdmin, postUser);
router.put("/users/:userId", putUser);
router.put("/users/:userId/admin", permitAdmin, putUserAdmin);
router.put("/users/:userId/locked", permitAdmin, putUserLocked);

router.use(unmatchedRoute);

module.exports = router;
