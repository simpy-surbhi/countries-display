import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Config } from "./config";
import { objectToUrlParams } from "./lib";

class APIClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create();
  }

  public async get<T>(
    path: string,
    queryStringData?: { [key: string]: string | number }
  ) {
    await this.setHeaders("GET");

    const url = `${path}${objectToUrlParams(queryStringData)}`;
    const response = await this.api.get<T>(`${Config.API_BASE_URL}${url}`);
    return this.getResponse(response);
  }

  private getResponse<T>(response: AxiosResponse<T>) {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  }

  private async setHeaders(method: "GET") {
    const headers: any = {};

    if (["GET"].includes(method)) {
      headers.Accept = "application/json";
    }

    this.api.defaults.headers = headers;
  }
}

const singleton = new APIClient();

export { singleton as ApiClient };
