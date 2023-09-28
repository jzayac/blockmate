import Context from "../../../../src/lib/context";
import Service from "../../../../src/risk/service/risk.service";
import {
  IApiCall,
} from "../../../../src/type/risk";
import { IAddressRiskResponse } from "../../../../src/type/api";

class ApiCallMock implements IApiCall {
  async getAddressRisks(address: string): Promise<IAddressRiskResponse> {
    if (address === "0x123") {
      throw new Error("error");
    } else if (address === "0x12345") {
      return {
        case_id: "8ff41152-b4c1-4267-bc8d-8a87c0b50a8e",
        request_datetime: "2023-09-26T13:37:38Z",
        response_datetime: "2023-09-26T13:37:38Z",
        chain: "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67",
        address: "",
        name: "",
        category_name: "",
        risk: 0,
        details: {
          own_categories: ["1", "2", "3"],
          source_of_funds_categories: ["5", "2", "3"],
        },
      };
    }

    return {
      case_id: "8ff41152-b4c1-4267-bc8d-8a87c0b50a8e",
      request_datetime: "2023-09-26T13:37:38Z",
      response_datetime: "2023-09-26T13:37:38Z",
      chain: "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67",
      address: "",
      name: "",
      category_name: "",
      risk: 0,
      details: {
        own_categories: [],
        source_of_funds_categories: [],
      },
    };
  }
}

describe("risk service ", () => {
  it("shiuld get empty arrays ", async () => {
    const ctx = new Context();
    const service = new Service(console, new ApiCallMock());
    const params = {
      address: "0x1234",
    };
    const result = await service.riskDetails(ctx, params);

    expect(result).toEqual({
      own_categories: [],
      source_of_funds_categories: [],
    });
  });

  it("shiuld get with some data", async () => {
    const ctx = new Context();
    const service = new Service(console, new ApiCallMock());
    const params = {
      address: "0x12345",
    };
    const result = await service.riskDetails(ctx, params);

    expect(result).toEqual({
      own_categories: ["1", "2", "3"],
      source_of_funds_categories: ["5", "2", "3"],
    });
  });

  it("shiuld get error", async () => {
    const ctx = new Context();
    console.error = () => {};
    const service = new Service(console, new ApiCallMock());
    const params = {
      address: "0x123",
    };

    try {
      await service.riskDetails(ctx, params);
      throw new Error("this should not happen");
    } catch (err) {
      expect(err).toEqual(new Error("error"));
    }
  });
});
