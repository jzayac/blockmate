import _ from 'lodash';
import { Request } from 'express';

interface IContext {
  [name: string]: any;
}

const TRACE_ID = 'traceId';

export default class Context {
  private reqContext: IContext;

  constructor() {
    this.reqContext = {};
  }

  public getByKey(key: string): any {
    return _.cloneDeep(this.reqContext[key]);

  }

  public get(): IContext {
    return _.cloneDeep(this);
  }

  public set(key: string, value: any): void {
    this.reqContext[key] = value;
  }

  public requestId(): string {
    return this.reqContext[TRACE_ID];
  }

  public static createFromRequest(req: Request): Context {
    const ctx = new Context();
    let traceId = req.headers[TRACE_ID];
    if (_.isEmpty(traceId)) {
      traceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    ctx.set(TRACE_ID, traceId);
    console.log(ctx.requestId());
    return ctx;
  }
}
