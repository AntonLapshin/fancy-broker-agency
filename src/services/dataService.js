import { throttle } from "lodash";
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
    this.inProgress[methodName] =
      this.inProgress[methodName] || this.provider[methodName](...params);
    this.pubsub.fire("requested", { methodName });
    let result;
    try {
      result = await this.inProgress[methodName];
      this.pubsub.fire("received", { methodName, result });
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
