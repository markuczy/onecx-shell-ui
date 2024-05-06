/**
 * onecx-shell-bff
 * OneCx shell Bff
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { RemoteComponent } from './remoteComponent';
import { Slot } from './slot';
import { Theme } from './theme';
import { Route } from './route';
import { Workspace } from './workspace';

export interface LoadWorkspaceConfigResponse {
  routes: Array<Route>;
  theme: Theme;
  workspace: Workspace;
  components: Array<RemoteComponent>;
  slots: Array<Slot>;
}
