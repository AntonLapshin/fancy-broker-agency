import React from "react";
import { MapWidget, CustomerMarker, ValueWidget } from "components";
import calcMean from "helpers/math/mean";
import calcStd from "helpers/math/std";
import randomDelay from "helpers/randomDelay";

const createLabel = props => <CustomerMarker {...props} />;

export default [
  {
    id: 0,
    component: MapWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      items: contacts.map(contact => ({
        id: contact.guid,
        label: createLabel(contact.balance, false),
        lat: contact.latitude,
        lng: contact.longitude
      }))
    }))
  },
  {
    id: 1,
    component: ValueWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      title: "Customer count",
      value: contacts.length
    }))
  },
  {
    id: 2,
    component: ValueWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      title: "Average age",
      value: ~~calcMean(contacts.map(contact => contact.age))
    }))
  },
  {
    id: 3,
    component: ValueWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      title: "Standard deviation",
      value:
        "$" +
        calcStd(
          contacts.map(contact =>
            parseFloat(contact.balance.substring(1).replace(",", ""))
          )
        ).toFixed(2)
    }))
  }
];
