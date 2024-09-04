/**
 * onecx-shell-bff
 * Backend-For-Frontend (BFF) service for OneCX Shell. This API provides base configuration information for frontends.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: tkit_dev@1000kit.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProblemDetailInvalidParam } from './problemDetailInvalidParam';
import { ProblemDetailParam } from './problemDetailParam';

export interface ProblemDetailResponse {
  errorCode?: string;
  detail?: string;
  params?: Array<ProblemDetailParam>;
  invalidParams?: Array<ProblemDetailInvalidParam>;
}
