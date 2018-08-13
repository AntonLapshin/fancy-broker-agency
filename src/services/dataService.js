import throttle from "lodash/throttle";
import config from "constants/config";
import PubSub from "helpers/pubsub";

export class IDataProvider {
  getAllContacts;
  getContact;
}

const instanceErrorMessage = "A provider instance is required";

export default class DataService extends IDataProvider {
  pubsub = new PubSub();

  constructor(provider) {
    super();
    if (!provider) {
      this.pubsub.fire("error", instanceErrorMessage);
      return;
    }
    this.provider = provider;
  }

  inProgress = {};

  async callProvider(methodName, ...params) {
    if (!this.provider) {
      this.pubsub.fire("error", instanceErrorMessage);
      return null;
    }
    const { inProgress, provider, pubsub } = this;
    inProgress[methodName] =
      inProgress[methodName] || provider[methodName](...params);
    pubsub.fire("requested", { methodName });
    let result;
    try {
      result = await inProgress[methodName];
      pubsub.fire("received", { methodName, result });
    } catch (e) {
      inProgress[methodName] = null;
      pubsub.fire("error", e.message);
    }
    inProgress[methodName] = null;
    return result;
  }

  /**
   * Gets all contacts
   *
   * returns {Promise<Array>} a set of contacts
   */
  getAllContacts = throttle(
    () => this.callProvider("getAllContacts"),
    config.throttleDuration
  );

  /**
   * Gets a contact by id
   *
   * param {string} id
   * returns {Promise<Object>} a contact with the certain id
   */
  getContact = throttle(
    id => this.callProvider("getContact", id),
    config.throttleDuration
  );
}
