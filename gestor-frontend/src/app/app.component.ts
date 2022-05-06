import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestorService } from './shared/api/gestor.service';
import { Gestor } from './shared/models/gestor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  dadosGestor!: Gestor[];
  exibirFormulario: boolean = false;
  isEditando: boolean = false;

  formGestor = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', [ Validators.required, Validators.pattern("[a-zÀ-ú ]*") ]),
    dataNascimento: new FormControl('', [ Validators.required ]),
    matricula: new FormControl('', [ Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$") ]),
    setor: new FormControl('', [ Validators.required ])
  });
  
  constructor(
    private gestorService: GestorService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
   this.atualizarGestores();
  }

  private atualizarGestores() {
    this.gestorService.obterListaGestores()
      .subscribe(gestores => this.dadosGestor = gestores);
  }

  exibirFormularioGestor() {
    this.limparCampos();
    this.exibirFormulario = true;
  }

  exibirListagemGestor(){
    this.isEditando = false;
    this.exibirFormulario = false;
  }
  cadastrarGestor(){
  
    const gestor: Gestor = this.obterDadosFormulario();

    this.gestorService.cadastrarGestor(gestor)
        .subscribe(res => {
          this.atualizarGestores();
          this.limparCampos();
          this.exibirFormulario = false;

          this._snackBar.open('Gestor ' + gestor.nome + ' Cadastrado com sucesso!', 'OK', { duration: 3000 } );
        }, erro => alert('Erro ao cadastrar'));
  }

    private obterDadosFormulario(): Gestor {
      return {
        id: this.formGestor.get('id')?.value,
        nome: this.formGestor.get('nome')?.value,
        dataNascimento: this.formGestor.get('dataNascimento')?.value,
        matricula: this.formGestor.get('matricula')?.value,
        setor: this.formGestor.get('setor')?.value
      };
    }

  salvarGestor(event: SubmitEvent) {
    event.preventDefault();

    if(!this.formGestor.valid){
      this._snackBar.open('Favor preencher todos os campos', 'OK', { duration: 1500 });
      return;
    }

    if (this.isEditando){
      this.salvarAlteracaoGestor();
      return;
    }
    this.cadastrarGestor();
  }

  salvarAlteracaoGestor() {
    const gestor = this.obterDadosFormulario();

    this.gestorService.alterarGestor(gestor)
      .subscribe(gestor => {
        this._snackBar.open('Gestor ' + gestor.nome + ' Alterado com sucesso ', 'OK', { duration: 3000 } );
        this.atualizarGestores();
        this.exibirFormulario = false;
        this.isEditando = false;
      }, erro => alert('Erro ao cadastrar'));
  }

  limparCampos() {
    this.formGestor.reset();
  }

  excluirGestor(id: number){
    this.gestorService.excluirGestor(id)
      .subscribe(_ => {
        this.atualizarGestores();
        this._snackBar.open('Gestor excluido com sucesso!','OK', { duration: 3000 });
      }, error => alert('Erro ao excluir'));

  }

  editarDadosGestor(gestor: Gestor) {
    this.isEditando = true
    this.exibirFormulario = true;
    this.formGestor.patchValue({
      'id': gestor.id,
      'nome': gestor.nome,
      'matricula': gestor.matricula,
      'dataNascimento': gestor.dataNascimento,
      'setor': gestor.setor
      });
  }
}
