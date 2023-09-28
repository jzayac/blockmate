import Context from "@/lib/context";
import { ICache } from "@/lib/cache";
import { IService, ICheckRequest as checkParams } from "../../type/risk";
import { ILogger } from "../../type/logger";
import { RiskDetails } from "@/model/risk";

export default class CacheService implements IService {
  private logger: ILogger;
  private service: IService;
  private cache: ICache;

  constructor(logger: ILogger, service: IService, cache: ICache) {
    this.service = service;
    this.logger = logger;
    this.cache = cache;
  }

  async riskDetails(ctx: Context, params: checkParams): Promise<RiskDetails> {
    const riskDetails = this.cache.get<RiskDetails>(params.address);

    if (riskDetails) {
      this.logger.info("get from cache");
      return riskDetails;
    }

    const response = await this.service.riskDetails(ctx, params);

    this.cache.set<RiskDetails>(params.address, response);

    return response;
  }
}
