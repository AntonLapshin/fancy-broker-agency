import { throttle } from "lodash";
import config from "constants/config";
import PubSub from "helpers/pubsub";

export class IDataProvider {
  getAllContacts;
  getContact;
}

export default class DataService extends IDataProvider {
  pubsub = new PubSub();

  constructor(provider) {
    super();
    if (!provider) {
      this.pubsub.fire("error", "A provider instance is required");
    }
    this.provider = provider;
  }

  inProgress = {};

  async callProvider(methodName, ...params) {
    this.inProgress[methodName] =
      this.inProgress[methodName] || this.provider[methodName](...params);
    let result;
    try {
      result = await this.inProgress[methodName];
    } catch (e) {
      this.inProgress[methodName] = null;
      this.pubsub.fire("error", e.message);
    }
    this.inProgress[methodName] = null;
    return result;
  }

  getAllContacts = throttle(
    () => this.callProvider("getAllContacts"),
    config.throttleDuration
  );

  getAllContact = throttle(
    id => this.callProvider("getAllContacts", id),
    config.throttleDuration
  );
}
