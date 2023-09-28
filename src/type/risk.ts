import * as joi from "types-joi";
import Context from "@/lib/context";
import { InterfaceFrom } from "types-joi";
import { RiskDetails } from "@/model/risk";
import { IAddressRiskResponse } from "@/type/api";

export interface IService {
  riskDetails(ctx: Context, params: ICheckRequest): Promise<RiskDetails>;
}

export interface IApiCall {
  getAddressRisks(address: string): Promise<IAddressRiskResponse>;
}

const checkRequest = {
  address: joi.string().required(),
};

export const checkRequestSchema = joi.object({ ...checkRequest }).required();
export type ICheckRequest = InterfaceFrom<typeof checkRequestSchema>;
