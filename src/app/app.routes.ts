import { Route } from '@angular/router';
import { InitializationErrorPageComponent } from './shared/components/initialization-error-page.component';

export const appRoutes: Route[] = [
  {
    path: 'shell-initialization-error-page',
    data: {
      message: '',
    },
    component: InitializationErrorPageComponent,
    title: 'Initialization Error',
  },
];
