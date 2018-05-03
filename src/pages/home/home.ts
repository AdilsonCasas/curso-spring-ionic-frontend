import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public var_menuController: MenuController) {

  }

  ionViewWillEnter() { // evento gerado quando "vai entrar" na página "HomePage"
    this.var_menuController.swipeEnable(false);
  }
  ionViewDidLeave() { // evento gerado quando "saiu" da página "HomePage" pelo "click" no button Entrar.
    this.var_menuController.swipeEnable(true);
  }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
