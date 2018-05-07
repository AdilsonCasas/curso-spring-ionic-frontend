import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { AuthInterceptorProvider } from '../interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error.interceptor';
import { AuthService } from '../services/auth.service';
import { Storage_keysService } from '../services/storage_keys.service';
import { ClienteService } from '../services/domain/cliente.service';

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
    CategoriaService,
    AuthInterceptorProvider, /* Este provider de autorização de vir obrigatoriamente ANTES do errorprovider pois esta relação é lida sequencialmente e autorização deve vir antes do seu respectivo tratametno de erro */
    ErrorInterceptorProvider,
    AuthService,
    Storage_keysService,
    ClienteService
  ]

})
export class AppModule {}
