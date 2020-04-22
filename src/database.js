const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

class Database {
  get devices() {
    if (!this.db) {
      throw new Error("No connection to the database");
    }

    return this.db.collection("devices");
  }

  get homes() {
    if (!this.db) {
      throw new Error("No connection to the database");
    }

    return this.db.collection("homes");
  }

  get invitations() {
    if (!this.db) {
      throw new Error("No connection to the database");
    }

    return this.db.collection("invitations");
  }

  get rooms() {
    if (!this.db) {
      throw new Error("No connection to the database");
    }

    return this.db.collection("rooms");
  }

  get users() {
    if (!this.db) {
      throw new Error("No connection to the database");
    }

    return this.db.collection("users");
  }

  /**
   * Connect to the MongoDB server at the given URL.
   *
   * @param {string} url     - URL of the MongoDB server to connect to
   * @param {string} dbName  - name of the database to connect to
   * @param {any}    options - connection options
   */
  async connect(url, dbName, options = {}) {
    if (!url) {
      throw new Error("Connection URL cannot be null or undefined");
    }

    if (!dbName) {
      throw new Error("Database name cannot be null or undefined");
    }

    this.url = url;
    this.dbName = dbName;

    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      ...options
    });

    if (!this.client) {
      throw new Error("No client has been instantiated");
    }

    try {
      await this.client.connect();
    } catch (error) {
      throw new Error("Could not connect to the database");
    }

    this.db = this.client.db(dbName);
  }

  /**
   * Close the connection to the MongoDB server.
   *
   * If an instance of the MongoMemoryServer is running, shut it down.
   */
  async close() {
    await this.client.close();

    if (this.server) {
      await this.server.stop();
    }
  }

  /**
   * Create a new instance of the MongoMemoryServer and return its url to connect to and the database name.
   */
  async launchMemoryServer() {
    this.server = new MongoMemoryServer();

    const url = await this.server.getUri();
    const dbName = await this.server.getDbName();

    return [url, dbName];
  }
}

module.exports = new Database();
