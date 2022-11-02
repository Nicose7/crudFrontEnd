import { Component, OnInit } from '@angular/core';
///import {ModalDirective} from 'angular-bootstrap-md';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import{HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Dipendente } from './dipendente';
import { DipendenteServiceService } from './dipendente-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal]
})
export class AppComponent implements OnInit{
/*stringaTest: string = "passagio da padre a figlio";
elementi = ['primo elemento'];
daFiglioaPadre(name: string){
  this.elementi.push(name);
}*/


public dipendenti!: Dipendente[];
public editDipendente!: Dipendente;
public deleteDipendente!: Dipendente;


constructor(
  private dipendenteService: DipendenteServiceService,
  config: NgbModalConfig,
  private modalService: NgbModal,
  private activeModal: NgbActiveModal){

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.getDipendenti();
  }

  openAddModal(addModal: any){
    this.modalService.open(addModal);
  }

  openUpdateModal(updateModal: any, dipendente: Dipendente){
    this.editDipendente = dipendente;
    this.modalService.open(updateModal);
  }

  openDeleteModal(deleteModal: any, dipendente: Dipendente){
    this.deleteDipendente = dipendente;
    this.modalService.open(deleteModal);
  }

  closeAddModal(){
    (document.getElementById('add-dipendente-form') as HTMLElement).click();
  }

  closeUpdateModal(){
    (document.getElementById('update-dipendente-form') as HTMLElement).click();
  }

  closeDeleteModal(){
    (document.getElementById('delete-dipendente-form') as HTMLElement).click();
  }

  public getDipendenti(): void{
    this.dipendenteService.getDipendenti().subscribe({
      next: (dipendente) => {
        this.dipendenti = dipendente;
        console.log(this.dipendenti);
      },
      error: (err) =>{
        alert(err.message);
      }
    })
  }

  public addDipendenti(addForm: NgForm): void{
    console.log("funzione attiva")
    this.closeAddModal();
    this.dipendenteService.addDipendente(addForm.value).subscribe({
      next: () => {
        this.getDipendenti();
        alert('Aggiunto con successo');
      },
      error: (err) =>{
        alert("Errore nell'aggiunta");
        console.log("Errore", err);
        addForm.reset();
      }
    })
  }

  public updateDipendenti(dipendente: Dipendente): void{
    this.dipendenteService.updateDipendente(dipendente).subscribe({
      next: () => {
        this.closeUpdateModal();
        this.getDipendenti();
      },
      error: (err) =>{
        alert(err.message);
      }
    })
  }

  public removeDipendenti(dipendenteId: number): void{
    this.dipendenteService.deleteDipendente(dipendenteId).subscribe({
      next: (res) => {
        console.log(res);
        this.closeDeleteModal();
        this.getDipendenti();
      },
      error: (err) =>{
        alert(err.message);
      }
    })
  }
  public searchDipendenti(key: string): void{
    const results: Dipendente[] = [];
    for( const dipendente of this.dipendenti){
      if(dipendente.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || dipendente.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(dipendente);
      }
    }
    this.dipendenti = results;
    if(results.length === 0 || !key){
      this.getDipendenti();
    }
  }
}
