import express from "express";
import { Request, Response } from "express";
import Service from "./service/risk.service";
import Context from "../lib/context";
import ValidateMiddleware from "./service/risk.validate";
import CacheMiddleware from "./service/risk.cache";
import ErrorMiddleware from "./service/risk.error";
import { ICheckRequest, IService } from "@/type/risk";
import { ILogger } from "../type/logger";
import { LoggerAdapter } from "../lib/logger";
import { ApiCall } from "../lib/api";
import cache from "../lib/cache";

export default (logger: ILogger) => {
  logger = new LoggerAdapter(logger, "risk service");

  // create api call for risk service
  const routing = new ApiCall(logger);

  // create risk service with dependencies
  let service: IService = new Service(logger, routing);

  // add middleware to risk service with dependencies
  service = new CacheMiddleware(logger, service, cache);
  service = new ValidateMiddleware(logger, service);

  // this service is the last middleware to catch error
  // and normalize error response
  service = new ErrorMiddleware(logger, service);

  const router = express.Router();

  // create risk service api
  router.get("/check", async (req: Request, res: Response) => {
    const params = req.query as ICheckRequest;
    const ctx: Context = Context.createFromRequest(req);

    try {
      const data = await service.riskDetails(ctx, params);

      res.status(200).json({
        data,
      });
    } catch (err) {
      res.status(err.code).json({
        error: err.message,
      });
    }
  });

  // ... other transport option like grpc, kafka, etc

  return router;
};
