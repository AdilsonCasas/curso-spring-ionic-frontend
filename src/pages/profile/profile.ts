import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage_keysService } from '../../services/storage_keys.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  attr_email: string;

  constructor(
              public param_navCtrl: NavController,
              public param_navParams: NavParams,
              public param_storage_keyService: Storage_keysService) {
  }

  ionViewDidLoad() {
    let var_localUser = this.param_storage_keyService.getLocalUser();
    if(var_localUser && var_localUser.email) { // se var_localUser não é null "e" possui o campo email (conteúdo)
      this.attr_email = var_localUser.email;
    }
  }

}
