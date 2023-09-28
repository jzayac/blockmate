import Context from "../../../../src/lib/context";
import ValidateMiddleware from "../../../../src/risk/service/risk.validate";
import {
  IService,
  ICheckRequest as checkParams,
} from "../../../../src/type/risk";
import { RiskDetails } from "../../../../src/model/risk";

class ServiceMock implements IService {
  async riskDetails(_ctx: Context, _params: checkParams): Promise<RiskDetails> {
    return {
      own_categories: ["1", "2", "3"],
      source_of_funds_categories: ["5", "2", "3"],
    };
  }
}

describe("risk validate middleware ", () => {
  it("params should be valid", async () => {
    const ctx = new Context();
    const validate = new ValidateMiddleware(console, new ServiceMock());
    const params = {
      address: "0x1234",
    };
    const result = await validate.riskDetails(ctx, params);

    expect(result).toEqual({
      own_categories: ["1", "2", "3"],
      source_of_funds_categories: ["5", "2", "3"],
    });
  });

  it("shiuld get error", async () => {
    const ctx = new Context();
    console.warn = () => {};
    const validate = new ValidateMiddleware(console, new ServiceMock());
    const params = {
      address: 123,
    };

    try {
      // @ts-ignore
      await validate.riskDetails(ctx, params);
      throw new Error("this should not happen");
    } catch (err) {
      expect(err.message).toEqual("validation error");
    }
  });
});
