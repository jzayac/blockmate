import Context from "./context";
import _ from "lodash";
import { ILogger } from "@/type/logger";

export class LoggerAdapter implements ILogger {
  private logger: ILogger;
  private serviceName: string;
  private context: Context;

  constructor(logger: ILogger, name: string, ctx?: Context) {
    this.logger = logger;
    this.serviceName = name;
    if (!_.isEmpty(ctx)) {
      this.context = ctx;
    } else {
      this.context = new Context();
    }
  }

  private createMessage(
    message: any[],
    methodName: string,
    level: string
  ): any {
    const data: any = {};
    if (!_.isEmpty(this.context)) {
      data.request_id = this.context.requestId();
    }
    _.assign(data, {
      service: this.serviceName,
      level: level,
      method: methodName,
      message: message,
    });
    return data;
  }

  public fatal(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "fatal");
    this.logger.log(message);
  }
  public error(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "error");
    this.logger.log(message);
  }
  public warn(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "warn");
    this.logger.log(message);
  }
  public info(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "info");
    this.logger.log(message);
  }
  public debug(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "debug");
    this.logger.log(message);
  }
  public trace(...args: any[]): void {
    const methodName = "";
    const message = this.createMessage(args, methodName, "trace");
    this.logger.log(message);
  }
}
