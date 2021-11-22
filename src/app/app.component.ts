import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  display: boolean = true; 
  title = 'isspreskuzdavini';

  reloadComponent(event: boolean){
    console.log("Eventas: ", event);
    
    this.display = event;
    // this.returnComponent();
  }

  returnComponent(){
    this.display = true;
  }
}
