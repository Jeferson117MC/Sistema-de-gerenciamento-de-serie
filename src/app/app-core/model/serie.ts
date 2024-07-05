import {Status} from "./status";

export class Serie {

  id?: number;
  titulo: string;
  dataInicio: string;
  dataConclusao: string;
  status: Status;
  sinopse: string;
  imagem?: string;
  constructor(titulo: string, dataIni: string,
              dataCon: string, desc: string,
              sta: Status, id?: number,imagem?: string) {
    this.titulo= titulo;
    this.dataInicio= dataIni;
    this.dataConclusao = dataCon;
    this.sinopse= desc;
    this.status = sta;
    this.id = id;
    this.imagem = imagem;
  }

}
