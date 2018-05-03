import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  var_items: CategoriaDTO[];

  constructor(
                public navCtrl: NavController, 
                public navParams: NavParams,
                public var_categoriaService: CategoriaService) {
  }

  /*
  * isto abaixo é um exemplo do que se poderia fazer como método "findAll" para pesquisar categorias: com uma função de callback (chamada 
  * neste exemplo de "f"), dentro do "subscribe" do método.
  * Mais abaixo é uma outra forma de fazer isso, mais resumida, que dá o mesmo efeito.
  ionViewDidLoad() {
    this.var_categoriaService.metodoService_findAllCategoria()
              .subscribe(this.f) // este "subscribe" indique que este método deve se inscrever na fila para aguardar respostas assincronas
  }

  // a função "f" é usada como "callback" no subscribe do "findAll" acima e ela escreve na tela o "response" que vem do backend
  f(response) {
    console.log(response);

  }
  */
  ionViewDidLoad() {
    this.var_categoriaService.metodoService_findAllCategoria()
            .subscribe(response => { // em caso de sucesso terá a resposta na var response
              this.var_items = response; 
            },
          error => {
            console.log(error);
          });
}
}
