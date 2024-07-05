import { Component, OnInit } from '@angular/core';
import {SerieService} from "../../app-core/servicos/serie-service.service";
import {Serie} from "../../app-core/model/serie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-lista',
  templateUrl: './visualizar-lista.component.html',
  styleUrls: ['./visualizar-lista.component.css']
})
export class VisualizarListaComponent implements OnInit {

  i: number = 0;
  series: any [] = [];
  serieVisualizar: any;
  form: FormGroup;

  constructor(private serieService: SerieService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      tituloSerie: ['', Validators.required],
      dataInicioSerie: ['', Validators.required],
      dataConclusaoSerie: ['',],
      statusSerie: ['', Validators.required],
      sinopseSerie: ['', Validators.required],
      id: [0],
      imagem: ['']
    })
  }
  openModal() {
    $('#add-serie').modal('show');
  }

  closeModal() {
    $('#add-serie').modal('hide');
  }

  salvarFormSerie() {
    console.log(this.form)
    if (this.form.valid) {
      const novaSerie: Serie = new Serie(
        this.form.value.tituloSerie,
        this.form.value.dataInicioSerie,
        this.form.value.dataConclusaoSerie,
        this.form.value.sinopseSerie,
        this.form.value.statusSerie,
        undefined,
        this.form.value.imagem
      );
      console.log('dados da nova serie: ', novaSerie);
      this.serieService.adicionarSerie(novaSerie).then(reposta => {
        if (reposta > 0) {
          Swal.fire('Sucesso', 'Serie salva com sucesso!', 'success');
          this.form.reset();
          this.closeModal();
          this.listarSeries();
        }
      }).catch(respostaError => {
        Swal.fire('Não foi dessa vez', 'Não foi possível salvar a serie, ' +
          'tente novamente', 'error');
        console.log(respostaError);
      })
    } else {
      console.log("CAMPOS INVALIDOS ENCONTRADOS.");
      console.log("DADOS DOS CAMPOS: ", this.form.value);
      Swal.fire('Cuidado', 'Alguns campos do formulário não estão ' +
        'corretos.', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  isCampoValido(inputNome: string): boolean {
    const campo: any = this.form.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }

  marcarTodosComoClicados() {
    Object.values(this.form.controls).forEach(campo => {
      campo.markAsTouched();
    });
  }

  listarSeries() {
    this.serieService.buscarSerie().then(resposta => {
      this.series = resposta;
    });
  }

  setSerieAtual(serie: Serie) {
    this.serieVisualizar = serie;
  }

  excluirSerie(id: number) {
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar serie!',
        confirmButtonColor: '#3085d6'
      }).then((tipoBotao) => {
      if (tipoBotao.isConfirmed) {
        this.serieService.removerSerie(id).then(() => {
          Swal.fire('Deletado!', 'A serie foi excluida.', 'success');
          this.listarSeries();
        });
      }
    }).catch(error => {
      console.log(error);
      Swal.fire('ERRO!', 'A serie não foi deletada.', 'error')
    });
  }

  submitForm() {
    if (this.form.value.id > 0) {
      this.editarFormSerie();
    } else {
      this.salvarFormSerie();
    }
  }

  carregarDadosSerie(serieEditar: Serie) {
    this.form.patchValue({
      tituloSerie: serieEditar.titulo,
      dataInicioSerie: serieEditar.dataInicio,
      dataConclusaoSerie: serieEditar.dataConclusao,
      statusSerie: serieEditar.status,
      sinopseSerie: serieEditar.sinopse,
      id: serieEditar.id,
      imagem: serieEditar.imagem
    });
    this.openModal();
  }

  editarFormSerie() {
    if (this.form.valid) {
      const editarSerie: Serie = new Serie(
        this.form.value.tituloSerie,
        this.form.value.dataInicioSerie,
        this.form.value.dataConclusaoSerie,
        this.form.value.sinopseSerie,
        this.form.value.statusSerie,
        this.form.value.id,
        this.form.value.imagem
      );
      this.serieService.atualizarSerie(this.form.value.id, editarSerie)
        .then(reposta => {
          if (reposta === 1) {
            Swal.fire('Sucesso!', 'Serie editada com sucesso.', 'success');
            this.form.reset();
            this.closeModal();
            this.listarSeries();
          } else {
            Swal.fire('Atenção', 'Nenhuma serie encontrada, ou nenhuma alteração' +
              ' necessária', 'info');
          }
        }).catch(error => {
        Swal.fire('Cuidado!', 'Não foi possível editar a serie.', 'error');
      });
    } else {
      Swal.fire('Cuidado!', 'Alguns campos estão incorretos', 'warning');
      this.marcarTodosComoClicados();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.form.patchValue({imagem: loadEvent?.target?.result});
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
  }
}
