import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-uzdaviniai',
  templateUrl: './uzdaviniai.component.html',
  styleUrls: ['./uzdaviniai.component.css']
})
export class UzdaviniaiComponent implements OnInit {

  @ViewChild('answerInput') answerInputElement: ElementRef;
  @Output() restartRootComponent = new EventEmitter(); // skirtas pagrindiniam (root) komponentui perkrauti
  uzdaviniai = [];  // visi uždaviniai - objektu masyvas
  timeObservable: Observable<number>;  // stebimas objektas, grąžinantis skaičius
  private subscription: Subscription;  // objektas, skirtas panaikinti prenumeratai
  count: number = 10; // pasirenkamas laiko intervalas žaidimo sunkumui nustatyti
  time: number = 0; // laikas, rodomas vartotojui
  uzdNr: number = 0; // dabar sprendžiamo uždavinio numeris masyve
  gameEnd: boolean = false; // pažymi, kada baigiasi žaidimas
  gameAtStart: boolean = true; // pažymi žaidimo pradžią (kai true - žaidimas dar neprasidėjęs)
  visoSprestaUzd: number = 0; // sprestų uždavinių skaitiklis
  teisingiUzd: number = 0; // teisingai išspręstų uždavinių skaitiklis
  visoUzd: number = 0; // bendras (esamas) uždavinių kiekis 
  atsakymas: string; // atsakymo reikšmė iš inputo susieta per ngModel
  buttonValue = "Pradėti"; // Pradėti ir Baigti mygtuko tekstas
  readOnly: boolean = false; // skirtas išjungti atsakymo inputui kol laukiama
  teisingas = false; // skirtas nustatyti atsakymo spalvai 
  neteisingas = false; // skirtas nustatyti atsakymo spalvai
  _visoUzdaviniu: number = 10;
  progBar: number = 0; // skirtas nustatyti progressBar reikšmę, nurodo pradinį uždavinių kiekį
  inputRedBorder: boolean = false; // keičia inputo border color
  // perkrauti: boolean = false; // skirtas pagrindiniam (root) komponentui perkrauti
  dlImtis: number = 9; // skirtas nustatyti, kiek uždavinių iš daugybos lentelės bus sugeneruota;
  public innerWidth: any;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    // this.uzdaviniai = this.dataService.uzdaviniai;
    // ------------------------------------------------
    // do{
    //   this.uzdaviniai.push(this.dataService.uzdavinioGeneratorius());
    // }
    // while(this.uzdaviniai.length != 30);
    // ------------------------------------------------
    // this.uzdaviniuMasyvoGeneratorius(this._visoUzdaviniu);
    // console.log(this.uzdaviniai);
    // this.visoUzd = this.uzdaviniai.length;
    // this._visoUzdaviniu = this.uzdaviniai.length;
    
    // this.uzdNr = this.rand(0, this.uzdaviniai.length - 1);
  }

  private createTimeObservable() {
    this.timeObservable = new Observable((observer) => {
      let count: number = this.count;
      setInterval(() => {
        if (count < 0) {
          observer.complete();
        } else {
          observer.next(count);
          count--;
        }
      }, 1000);
    });
  }

  gameActivator() {
    
    if (this.gameAtStart) {
      // this.uzdaviniuMasyvoGeneratorius(this._visoUzdaviniu); // skirtas dirbti su nurodytu uždavinių kiekiu
      this.uzdaviniuMasyvoGeneratoriusDL(this.dlImtis);
      this.visoUzd = this.uzdaviniai.length;
      this._visoUzdaviniu = this.uzdaviniai.length;
      this.uzdNr = this.rand(0, this.uzdaviniai.length - 1);
      this.buttonValue = "Baigti";
      this.startTimeCount();
      this.gameEnd = false;
      this.visoSprestaUzd = 0;
      this.teisingiUzd = 0;
      this.progBar = this.visoUzd * 100 / this._visoUzdaviniu;
      setTimeout(()=>this.answerInputElement.nativeElement.focus());
    }
    else {
      this.subscription.unsubscribe();
      this.gameAtStart = true;
      this.buttonValue = "Pradėti";
      this.gameEnd = true;
      this.time = 0;
      this.uzdNr = this.rand(0, this.uzdaviniai.length - 1);
      this.answerInputElement.nativeElement.value = '';
      // window.location.reload();
      // this.restartRootComponent.emit(false);
      // this.uzdaviniuMasyvoGeneratorius();
      
       
    }
    // this.answerInputElement.nativeElement.focus();
  }

  startTimeCount() {
    // this.uzdNr = 0;
    console.log("gameAtStart = ", this.gameAtStart);
    console.log("gameEnd = ", this.gameEnd);
    console.log("uzdNr = ", this.uzdNr);

    this.gameAtStart = false;
    const observer = {
      next: (count: number) => {
        console.log(count);
        this.time = count;
      },
      complete: () => {
        this.pateiktiAtsakyma(null);
        // if (!this.gameEnd) {
        //   this.startTimeCount();
        // }
      }
    }
    this.createTimeObservable();
    this.subscription = this.timeObservable.subscribe(observer);

  }

  // pateiktiAtsakyma(answer): any {
  //   console.log("Atsakymas = ", answer);
  //   this.visoSprestaUzd++;

  //   if(this.uzdaviniai[this.uzdNr].atsakymas == answer){
  //     this.teisingiUzd++;
  //     setTimeout
  //   }
  //   if(this.uzdNr < this.visoUzd-1){
  //     this.uzdNr++;
  //   } else {
  //     this.gameEnd = true;
  //     this.gameAtStart = true;
  //   }
  //   if(answer  != -1){
  //     this.subscription.unsubscribe();
  //     if(!this.gameEnd){
  //       this.startTimeCount();
  //     }
  //   }
  //   this.atsakymas = undefined;
  // }

  // pateiktiAtsakymasuUzdelsimu(answer){
  //   setTimeout(this.pateiktiAtsakyma(answer), 2000);
  // }

  pateiktiAtsakyma(answer): any {
    console.log("Atsakymas = ", answer);
    this.readOnly = true;
    this.visoSprestaUzd++;
    this.time = this.count;

    if (this.uzdaviniai[this.uzdNr].atsakymas == answer) {
      this.teisingas = true;
      this.teisingiUzd++;
     
      
     
      setTimeout(() => {
        // if (this.uzdNr < this.visoUzd - 1) {
        //   console.log("uzdNr =", this.uzdNr, "visoUzd =", this.visoUzd);
          
        //   this.uzdNr++;
        // }
        this.uzdaviniai.splice(this.uzdNr, 1);
      this.visoUzd = this.uzdaviniai.length;
      console.log(this.uzdaviniai);
        
      this.progBar = this.visoUzd * 100 / this._visoUzdaviniu;
      console.log("ProgBar ", this.progBar);
        
         
        if(this.visoUzd > 0){
          this.uzdNr = this.rand(0, this.visoUzd - 1)
        }
        else {
          this.gameEnd = true;
          this.gameAtStart = true;
          this.time = 0;
          this.buttonValue = "Pradėti"
        }
        this.atsakymas = null;
        this.teisingas = false;
        this.readOnly = false;

        if (!this.gameEnd) {
          this.startTimeCount();
        }
      }, 2000);
    } else {
      this.readOnly = true;
      this.neteisingas = true;

      // if (answer != -1) {
      //   this.subscription.unsubscribe();
      // }
      if(answer == null) {
        this.atsakymas = "?";
      }
      setTimeout(() => {
        // if (this.uzdNr < this.visoUzd - 1) {
        //   this.uzdNr++;
        // }       
        // else {
        //   this.gameEnd = true;
        //   this.gameAtStart = true;
        // }
        this.uzdNr = this.rand(0, this.visoUzd - 1);
        this.atsakymas = null;
        this.neteisingas = false;
        this.readOnly = false;
        setTimeout(()=>this.answerInputElement.nativeElement.focus());

        if (!this.gameEnd) {
          this.startTimeCount();
        }
      }, 2000);

    }
    // if (answer != -1) {
            this.subscription.unsubscribe();
          // }
  }

  setTimer(time: number) {
    console.log("Timer time:", time);
    this.count = time;
  }

  // skirta apsaugoti nuo netinkamų simbolių įvedimo į inputą (8 - backspace, 0 - null, tarp 48-57 - skaičiai, tarp 96-105 - numpad)
  invalidChars(evt){
    console.log(evt);
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || (evt.which > 57 && evt.which < 96) || evt.which > 105)
    {
        evt.preventDefault();  // sustabdo evento veikimą
    }
    
  }

  setDaugyba(daugybaIki: number){
    this.dlImtis = daugybaIki;
    console.log("daugyba bus IKI: ", this.dlImtis);
  }
//-----------------  Skirtas pasiimti reikšmę iš komponento, kai reikia nurodyti uždavinių kiekį 
  // setAmount(visoUzdaviniu: number) {
  //   this._visoUzdaviniu = visoUzdaviniu;
  //   console.log("this._visoUzdaviniu", this._visoUzdaviniu);
    
  // }

  rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
//-----------------  Skirtas veikti, kai reikia nurodyti daugybos lentelės apimtį 
  uzdaviniuMasyvoGeneratoriusDL(intEnd: number = 9, intStart: number = 2, ){
    let uzdKiekis = 8 * intStart;
    console.log("Uždavinių kiekis = ", uzdKiekis );
    
    this.uzdaviniai = this.dataService.uzdavinioGeneratoriusDL(intStart, intEnd);
    console.log(this.uzdaviniai);
    
  }
//-----------------  Skirtas veikti, kai reikia nurodyti uždavinių kiekį
  // uzdaviniuMasyvoGeneratorius(uzdKiekis: number = 30, intStart: number = 2, intEnd: number = 9){

  //   function arUzdaviniaiVienodi(uzd1, uzd2) {
  //     return uzd1.uzdavinys === uzd2.uzdavinys;
  //   }
   
  //   do{
  //     let naujasUzdavinys = this.dataService.uzdavinioGeneratorius(intStart, intEnd);
  //     let kartojasi = false;
  //     for(let uzdavinys of this.uzdaviniai) {
  //       if(arUzdaviniaiVienodi(uzdavinys, naujasUzdavinys)){
  //         kartojasi = true;
  //         break;
  //       }
  //     }
  //     if(!kartojasi){
  //       this.uzdaviniai.push(naujasUzdavinys);
  //     }

  //   }
  //   while(this.uzdaviniai.length < uzdKiekis)
  // }

}
