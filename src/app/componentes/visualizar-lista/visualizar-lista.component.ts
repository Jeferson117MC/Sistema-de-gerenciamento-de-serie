import { Component, OnInit } from '@angular/core';
import {SerieService} from "../../app-core/servicos/serie-service.service";
import {Serie} from "../../app-core/model/serie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var $ : any;


@Component({
  selector: 'app-visualizar-lista',
  templateUrl: './visualizar-lista.component.html',
  styleUrls: ['./visualizar-lista.component.css']
})
export class VisualizarListaComponent implements OnInit {

  i: number =0;
  series: Serie [] =[];
  form: FormGroup;

  constructor(private serieService: SerieService,
              private fb: FormBuilder) {

    this.series = serieService.pupularTabelaTeste();
    this.form = this.fb.group({
      tituloSerie: ['', Validators.required, Validators.minLength(5)],
      dataInicioSerie: ['', Validators.required],
      dataConclusaoSerie: ['',],
      statusSerie: ['', Validators.required],
      sinopseSerie: ['', Validators.required, Validators.maxLength(100)],

    })
  }

  addSerie(){
    this.serieService.addSerie("TAREFA " + this.i);
    this.i ++;
  }
  openModal(){
    $('#add-serie').modal('show');
  }
  closeModal(){
    $('#add-serie').modal('hide');
  }
  ngOnInit(): void {
  }

  salvarFormSerie() {
    console.log("DADOS DA SERIE NOVA:", this.form.value)
  }
}
