const express = require("express");

const { base } = require("./base");

const { login, validateLogin } = require("./login");

const {
  getDevice,
  getDevices,
  postDevice,
  validateGetDevice,
  validateGetDevices,
  validatePostDevice
} = require("./devices");

const {
  getHome,
  getHomes,
  postHome,
  validateGetHome,
  validateGetHomes,
  validatePostHome
} = require("./homes");

const {
  getRoom,
  getRooms,
  postRoom,
  validateGetRoom,
  validateGetRooms,
  validatePostRoom
} = require("./rooms");

const {
  getUser,
  getUsers,
  postUser,
  validateGetUser,
  validateGetUsers,
  validatePostUser
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

// =========== PUBLIC ROUTES ===============

router.post("/login", validateLogin, login);

// =========================================

router.use(authentication);
router.use(identification);
router.use(validation);

// =========== PRIVATE ROUTES ==============

router.get("/devices", validateGetDevices, getDevices);
router.get("/devices/:deviceId", validateGetDevice, getDevice);
router.post("/devices", validatePostDevice, postDevice);

router.get("/homes", validateGetHomes, getHomes);
router.get("/homes/:homeId", validateGetHome, getHome);
router.post("/homes", validatePostHome, postHome);

router.get("/homes/:homeId/rooms", validateGetRooms, getRooms);
router.get("/rooms/:roomId", validateGetRoom, getRoom);
router.post("/homes/:homeId/rooms", validatePostRoom, postRoom);

router.get("/users", permitAdmin, validateGetUsers, getUsers);
router.get("/users/:userId", permitAdmin, validateGetUser, getUser);
router.post("/users", permitAdmin, validatePostUser, postUser);

// =========================================

router.use(unmatchedRoute);

module.exports = router;
