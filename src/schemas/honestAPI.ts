import fetch from "node-fetch";
import { endpointsKeys, APIResponse, viewTypes, dataTypes } from "../types";

export default class honestAPI {
  protected readonly endpoints: any;
  protected activeEndpoint: string;
  readonly endpointsKeys: Array<endpointsKeys>; // the first endpoint will always be the default
  readonly src: string;

  async router(route: string) {
    try {
      const endpoints = this.endpoints; // getting endpoints of the class that was instantiated
      const method = endpoints[route].bind(this); // binding the key/value pairs to instance
      const res = await method(); // fetching the data
      return res;
    } catch (e) {
      console.error(e);
      return {
        res: "error",
        message: "Endpoint not found",
        status: 404,
      };
    }
  }

  async send({
    url,
    mapToSchema,
    viewType,
    groupedBy,
  }: {
    url: string;
    mapToSchema: (data: any) => APIResponse;
    viewType: viewTypes;
    groupedBy?: string;
  }) {
    const res = await fetch(url);
    const json = await res.json();
    const mapped = mapToSchema(json);
    mapped["viewType"] = viewType;
    mapped["viewTypes"] = viewTypes;
    mapped["dataTypes"] = dataTypes;
    mapped["src"] = this.src;
    if (groupedBy) mapped["groupedBy"] = groupedBy;
    mapped["endpoints"] = this.endpointsKeys.map((key) => {
      return {
        key: key.key,
        active: key.key === this.activeEndpoint ? true : false,
      };
    });
    return mapped;
  }
}

/*
subClass Blueprint--

class ___ extends honestAPI {
    ****
    define any api specific properties (endpoints, filetypes, etc.)
    ****

    constructor(){
        super()
        this.base_url = ...
    }

    mapToSchema(data: any) {
        const returned: APIResponse = {

        }

        return returned
    }

    formUrl() { // just packs up the url
        e.g. return (this.base_url + endpoint + this.file_type)
    }

    // packs up the response
    async pack(endpoint: string){
        const res = await this.send(this.formUrl(endpoint), this.mapToSchema)
        return res
    }

    forEach endpoint:
    async currentStateData(){
        const res = await this.pack('states/current')
        return res
    }
}

*/
