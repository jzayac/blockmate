import Context from "../../lib/context";
import * as Err from "../../lib/error";
import { ILogger } from "../../type/logger";
import { IService, ICheckRequest as checkParams } from "@/type/risk";
import { RiskDetails } from "@/model/risk";

export default class ErrorService implements IService {
  private logger: ILogger;
  private service: IService;
  // allow

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async riskDetails(ctx: Context, params: checkParams): Promise<RiskDetails> {
    try {
      return await this.service.riskDetails(ctx, params);
    } catch (err) {
      if (!(err instanceof Err.BaseError)) {
        this.logger.error("unhandled error", err);
        throw new Err.InternalError("unknown error");
      } else {
        this.logger.error(err.message, err);
      }

      throw err;
    }
  }
}
