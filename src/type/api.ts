import { RiskDetails } from "@/model/risk";

export type IAddressRiskResponse = {
  case_id: String;
  request_datetime: String;
  response_datetime: String;
  chain: String;
  address: String;
  name: String;
  category_name: String;
  risk: number;
  details: RiskDetails;
};
