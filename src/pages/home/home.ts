import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  attr_CredenciaisDTO: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
              public param_navCtrl: NavController, 
              public param_menuController: MenuController,
              public param_auth: AuthService) {
  }

  ionViewWillEnter() { // evento gerado quando "vai entrar" na página "HomePage"
    this.param_menuController.swipeEnable(false);
  }

  ionViewDidLeave() { // evento gerado quando "saiu" da página "HomePage" pelo "click" no button Entrar.
    this.param_menuController.swipeEnable(true);
  }

  login() {
    console.log(this.attr_CredenciaisDTO);
    this.param_auth.authenticate(this.attr_CredenciaisDTO) // teste com "pp890645@gmail.com" e senha 123
            .subscribe(response => {
              this.param_auth.succesfulLogin(response.headers.get('Authorization'));
                this.param_navCtrl.setRoot('CategoriasPage');
              },
              error => {});
  }

}
