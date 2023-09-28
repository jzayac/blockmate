import Context from "../../lib/context";

import {
  IService,
  ICheckRequest as checkParams,
  checkRequestSchema,
} from "../../type/risk";
import { BadRequestError } from "../../lib/error";
import { ILogger } from "../../type/logger";

export default class ValidateService implements IService {
  private logger: ILogger;
  private service: IService;

  constructor(logger: ILogger, service: IService) {
    this.service = service;
    this.logger = logger;
  }

  async riskDetails(ctx: Context, params: checkParams) {
    this.logger.info("validating position request" );
    const { error } = checkRequestSchema.validate(params);

    if (error) {
      this.logger.warn(JSON.stringify(error));
      throw new BadRequestError("validation error", error);
    }
    return await this.service.riskDetails(ctx, params);
  }
}
