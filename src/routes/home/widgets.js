import React from "react";
import { MapWidget, CustomerMarker, ValueWidget } from "components";
import calcMean from "helpers/math/mean";
import calcStd from "helpers/math/std";
import randomDelay from "helpers/randomDelay";
import urls, { goto } from "routes";

const createLabel = props => <CustomerMarker {...props} />;

export default [
  {
    id: 0,
    component: MapWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      items: contacts.map(contact => ({
        id: contact.guid,
        label: createLabel({ balance: contact.balance, isSelected: false }),
        lat: +contact.latitude,
        lng: +contact.longitude
      })),
      clickHandler: id => goto(urls.contact.replace(":id", id))
    }))
  },
  {
    id: 1,
    component: ValueWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      title: "Customer count",
      value: contacts.length.toString()
    }))
  },
  {
    id: 2,
    component: ValueWidget,
    apiMethod: "getAllContacts",
    getProps: randomDelay(contacts => ({
      title: "Average age",
      value: (~~calcMean(contacts.map(contact => contact.age))).toString()
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
