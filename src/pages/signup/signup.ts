import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  var_formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public param_formBuilder: FormBuilder) {
    // isto abaixo instancia um formGroup com um objeto que terá os mesmos campos presentes lá no form. Este "formGroup" é do 
    // Angular e serve para fazer tratamentos e validações nos campos de um formulário.
    this.var_formGroup = this.param_formBuilder.group({
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

  signupUser() {
    console.log("enviou form");
  }

}
