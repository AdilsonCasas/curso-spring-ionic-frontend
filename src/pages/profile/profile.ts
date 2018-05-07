import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage_keysService } from '../../services/storage_keys.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

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

  attr_ClienteDTO: ClienteDTO;

  constructor(public param_navCtrl: NavController,
              public param_navParams: NavParams,
              public param_storage_keyService: Storage_keysService,
              public param_clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let var_localUser = this.param_storage_keyService.getLocalUser();
    if(var_localUser && var_localUser.email) { // se var_localUser não é null "e" possui o campo email (conteúdo)
      this.param_clienteService.findByEmal(var_localUser.email)
            .subscribe(response => {
              this.attr_ClienteDTO = response;
              this.getImageIfExists();
            },
            error => { // neste momento este "error" já foi interceptado e tratado pelo 'ErrorInterceptor', aqui é a continuação do processo após a ação do intercept
                    switch(error.status) {
                      case 403:
                        this.param_navCtrl.setRoot('HomePage');
                      break;
                    }
            });
    }
    else { // este 'else' significa que deu algum problema na autenticação/busca do usr por email
      this.param_navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.param_clienteService.getImageFromBucket(this.attr_ClienteDTO.id)
          .subscribe( response => {
            this.attr_ClienteDTO.imageUrl = `${API_CONFIG.bucketBaseUrl}/ClientProfile${this.attr_ClienteDTO.id}.jpg`;
          },
          error => {});
  }
}
