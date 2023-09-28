import riskRouter from "./risk";

type ILogger = any;

export default (logger: ILogger) =>  {
  const risk = riskRouter(logger);

  return {
    risk,
  };
};
