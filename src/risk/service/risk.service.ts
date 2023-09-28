import Context from "../../lib/context";
import { ILogger } from "@/type/logger";
import { IService, ICheckRequest as checkParams, IApiCall } from "@/type/risk";
import { RiskDetails } from "@/model/risk";

export default class SearchService implements IService {
  private logger: ILogger;
  private routing: IApiCall;

  constructor(logger: ILogger, routing: IApiCall) {
    this.logger = logger;
    this.routing = routing;
  }

  async riskDetails(ctx: Context, params: checkParams): Promise<RiskDetails> {
    try {
      const response = await this.routing.getAddressRisks(params.address);
      return response.details;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
