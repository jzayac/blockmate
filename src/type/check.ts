import * as joi from "types-joi";
import Context from "@/lib/context";
import { InterfaceFrom } from "types-joi";
import { RiskDetails } from "../model/risk";

export interface IService {
  check(ctx: Context, productIds: ISearchRequest): Promise<RiskDetails>;
}

export interface IApiCall {
  getProductById(ctx: Context, productId: string): Promise<IProductListResponse>;
}

const checkRequest = {
  address: joi.string().required(),
};

export const checkRequestSchema = joi.object({ ...checkRequest }).required();
export type ISearchRequest = InterfaceFrom<typeof checkRequestSchema>;

const productListResponse = joi.object({
  positionId: joi.string().required(),
  x: joi.number().required(),
  y: joi.number().required(),
  z: joi.number().required(),
  productId: joi.string().required(),
  quantity: joi.number().required(),
});

export const productListResponseSchema = joi.array().items(productListResponse).required();
export type IProductListResponse = InterfaceFrom<typeof productListResponseSchema>;
