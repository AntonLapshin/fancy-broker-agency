import React from "react";
import DataService from "services/dataService";
import MockProvider from "services/providers/mockProvider";

// WTF? This should work but it doesn't
// export default React.createContext(new DataService(new MockProvider()));

export const DataServiceContext = React.createContext();
export const dataService = new DataService(new MockProvider());