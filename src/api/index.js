const express = require("express");

const { base } = require("./base");

const { login } = require("./login");

const { getDevice, getDevices, postDevice } = require("./devices");
const { getHome, getHomes, postHome } = require("./homes");
const { getRoom, getRooms, postRoom } = require("./rooms");
const { getUser, getUsers, postUser } = require("./users");

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

router.post("/login", login);

// =========================================

router.use(authentication);
router.use(identification);
router.use(validation);

// =========== PRIVATE ROUTES ==============

router.get("/devices", getDevices);
router.get("/devices/:deviceId", getDevice);
router.post("/devices", postDevice);

router.get("/homes", getHomes);
router.get("/homes/:homeId", getHome);
router.post("/homes", postHome);

router.get("/homes/:homeId/rooms", getRooms);
router.get("/rooms/:roomId", getRoom);
router.post("/homes/:homeId/rooms", postRoom);

router.get("/users", permitAdmin, getUsers);
router.get("/users/:userId", permitAdmin, getUser);
router.post("/users", permitAdmin, postUser);

// =========================================

router.use(unmatchedRoute);

module.exports = router;
