import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
//import { Subscriber } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
              public navCtrl: NavController, 
              public var_menuController: MenuController,
              public var_auth: AuthService) {
  }

  ionViewWillEnter() { // evento gerado quando "vai entrar" na página "HomePage"
    this.var_menuController.swipeEnable(false);
  }

  ionViewDidLeave() { // evento gerado quando "saiu" da página "HomePage" pelo "click" no button Entrar.
    this.var_menuController.swipeEnable(true);
  }

  login() {
    console.log(this.creds);
    this.var_auth.authenticate(this.creds) // teste com "pp890645@gmail.com" e senha 123
            .subscribe(response => {
              console.log("antes response");
              this.var_auth.succesfulLogin(response.headers.get('Authorization'));
                this.navCtrl.setRoot('CategoriasPage');
              },
              error => {});
  }

}
