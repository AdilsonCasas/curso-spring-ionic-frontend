import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  attr_formGroup: FormGroup;
  attr_estados: EstadoDTO[];
  attr_cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public param_formBuilder: FormBuilder,
              public param_estadoService: EstadoService,
              public param_cidadeService: CidadeService) {
    // isto abaixo instancia um formGroup com um objeto que terá os mesmos campos presentes lá no form. Este "formGroup" é do 
    // Angular e serve para fazer tratamentos e validações nos campos de um formulário.
    this.attr_formGroup = this.param_formBuilder.group({
      // os campos do form terão cada um deles, um valor inicial e uma lista de "validators" no formato [ "", [ lista_validators] ]
      // por exemplo: no campo nome, lá no backend, estão definidas as seguintes validações
      //          @NotEmpty(message="Preenchimento do Nome do Cliente é obrigatório.")
	    //          @Length(min=5, max=120, message="O tamanho do Nome do Cliente deve estar entre 5 e 120 caracteres.")
      //          private String nome;
      //    ou seja, o campo nome não pode ser vazio e deve ter no mín 5 e no máx 120 carateres
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],  // preenchimento obrigatório, e com tam min=5, max=120
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.param_estadoService.metodoService_findAllEstado()
          .subscribe(response => {
            this.attr_estados = response;
            this.attr_formGroup.controls.estadoId.setValue(this.attr_estados[0].id);
            this.updateCidades();
          },
          error => {});
  }


  updateCidades() {
    let var_estadoId = this.attr_formGroup.value.estadoId;
    this.param_cidadeService.metodoService_findAllCidade(var_estadoId)
          .subscribe(response => {
            this.attr_cidades = response;
            this.attr_formGroup.controls.cidadeId.setValue(null);
          },
          error => {});
  }

  signupUser() {
    console.log("enviou form");
  }

}
