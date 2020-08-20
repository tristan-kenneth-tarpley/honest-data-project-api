import * as covid from "./api-schemas/covid";
import { v4 as uuidv4 } from "uuid";

export default {
  covid: {
    uid: uuidv4(),
    api: covid.covidAPI,
    name: "USA COVID-19 data",
    description: covid.description,
    source: covid.source,
    endpoint: "covid",
  },
};
