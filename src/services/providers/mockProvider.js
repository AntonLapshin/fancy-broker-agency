import { IDataProvider } from "services/dataService";

const mockDataUrl =
  "https://raw.githubusercontent.com/AntonLapshin/fancy-broker-agency/master/src/services/providers/mockData.json";

export default class MockProvider extends IDataProvider {
  data = {};

  async getAllContacts() {
    const json = await fetch(mockDataUrl).then(response => response.json());
    this.data = json;
    return this.data;
  }

  async getContact(id) {
    const data = this.data || (await this.getAllContacts());
    return data.find(item => item.guid === id);
  }
}
