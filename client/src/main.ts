import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import 'hammerjs';

import { AppModule } from './app/app.module';

declare var module: any;

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

if (module.hot) {
    module.hot.accept();
}
