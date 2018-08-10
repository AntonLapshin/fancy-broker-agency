import React from "react";
import DataService from "services/dataService";
import MockProvider from "services/providers/mockProvider";

export default React.createContext(new DataService(new MockProvider()));
