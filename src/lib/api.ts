import axios, { AxiosResponse } from "axios";
import { BadRequestError, InternalError } from "./error";
import { IAddressRiskResponse } from "@/type/api";
import { ILogger } from "@/type/logger";

interface TokenRespose {
  token: string;
}

class ApiToken {
  private static instance: ApiToken;
  private static token: string;

  public static getInstance(): ApiToken {
    if (!ApiToken.instance) {
      ApiToken.instance = new ApiToken();
    }

    return ApiToken.instance;
  }

  public async getToken(): Promise<String> {
    const url = `https://api.blockmate.io/v1/auth`;
    const xApiKey = process.env.X_API_KEY;

    const headers = {
      accept: "application/json",
      "X-API-KEY": xApiKey,
    };

    if (ApiToken.token) {
      const payload = ApiToken.token.split(".")[1];
      const expiration = JSON.parse(
        Buffer.from(payload, "base64").toString()
      ).exp;

      const now = new Date();
      const expirationDate = new Date(expiration * 1000);
      const diff = (expirationDate.getTime() - now.getTime()) / 1000;
      if (diff > 300) {
        console.log("token is still valid");
        return ApiToken.token;
      }
    }

    let response: AxiosResponse<TokenRespose>;
    try {
      response = await axios.get(url, { headers });
    } catch (err) {
      if (err.response.status === 400) {
        throw new BadRequestError("bad request");
      }
      if (err.response.status === 401) {
        throw new BadRequestError("unauthorized");
      } else {
        throw new InternalError("internal error");
      }
    }

    if (response.status !== 200) {
      throw new InternalError(`Error calling ${url}`);
    }

    ApiToken.token = response.data.token;

    return ApiToken.token;
  }
}

export class ApiCall {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async getAddressRisks(address: string) {
    const url = `https://api.blockmate.io/v1/risk/score/details?chain=${address}`;

    const token = await ApiToken.getInstance().getToken();

    const headers = {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    };

    let response: AxiosResponse<IAddressRiskResponse>;
    try {
      response = await axios.get(url, { headers });
    } catch (err) {
      if (err.response.status === 400) {
        throw new BadRequestError("bad request");
      }
      if (err.response.status === 401) {
        throw new BadRequestError("unauthorized");
      } else {
        throw new InternalError("internal error");
      }
    }

    return response.data;
  }
}
