import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';

@NgModule({
  declarations: [
    MyApp
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp
  ],

  providers: [ // O "provider" determina o escopo do componente nele definido. Se um componente for definido aqui neste provider geral do app, então o escopo deste componetne será visível em toda a aplicação
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService
  ]

})
export class AppModule {}
