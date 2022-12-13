import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Image} from "../../models/image";
import {environment} from "../../../environments/environment.prod";
import {UserDriveService} from "../../services/user-drive-service/user-drive.service";
import {animate, group, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-drive',
  templateUrl: './user-drive.component.html',
  styleUrls: ['./user-drive.component.css'],
  animations: [
    trigger('fileAnimation', [
      transition(':leave', [
        style({opacity:1, width:'*', height:'*'}),
          animate('1s', keyframes([
            style({opacity:0, offset:0.5}),
            style({width:0, height:0, offset:1}),
          ]))
      ]),
      transition(':enter', [
        style({opacity:0, position:'relative', top:'20px'}),

        animate('0.8s', keyframes([
          style({opacity:1, top:0, offset:1}),
        ]))
      ])
    ]),
    trigger('notification', [
      transition(':enter',[
      style({
        opacity:0,
        width:'100%',
      }),
      animate('0.8s', keyframes([
        style({opacity:1, offset:1})
      ]))
      ]),
      transition(':leave',[
        style({
          opacity:1,
          left:'*',
          width:'100%'
        }),
        group([
          animate('0.8s', keyframes([
            style({opacity:0, top:'100%', offset:1})
          ]))
        ])
      ])
    ])
  ]
})
export class UserDriveComponent implements OnInit {

  isShowingNotification:boolean = false;

  notificationMessage:string;

  files: Image[] = []

  selectedImage: number;

  apiUrl: string;

  constructor(private route:ActivatedRoute, private userDriveService:UserDriveService) { }

  ngOnInit(): void {
    this.apiUrl = environment.apiUrl + 'api/images/'

     this.route.data.subscribe(({data})=>
      {
        if(data != null)
        {
          this.files = data;
        }
      })
  }

  onFilesSelected(event:any) {
    const images = event.target.files;

    for(let i = 0; i < images.length; i++)
    {
      this.userDriveService.uploadImage(images[i]).subscribe(file => {

        this.files.push(file);

        console.log("File uploaded!");

          this.setNotificationMessage(images.length)
          this.showNotification()
      })
    }
  }

  addUploadedImages(images:Array<Image>) {
    console.log('Start')
    if(this.files != null)
    {
      console.log(images.length)
      for(let i = 0; i < images.length; i++)
      {
        this.files.push(images[i]);
      }
      this.setNotificationMessage(images.length)
      this.showNotification()
    }
  }

  deleteImage(index:number) {
     const fileId = this.files[index].id;

     this.userDriveService.deleteImage(fileId).subscribe(() => {

     this.files.splice(index,1);

     this.notificationMessage = "Файл удалён";

     this.showNotification()
   });
  }

  setNotificationMessage(imagesAmount:number) {
    if(imagesAmount>1) {
      this.notificationMessage = "Файлов загружено: " + imagesAmount;
    }
    else
    {
      this.notificationMessage = "Файл загружен";
    }
  }

  showNotification() {
    this.isShowingNotification = true;

    setTimeout(()=> this.isShowingNotification = false, 3000);
  }

  saveFile(fileIndex:number) {
    let fileName = this.files[fileIndex].name;

    this.userDriveService.getImage(this.apiUrl+this.files[fileIndex].url).subscribe(file =>
    {
      const fileToSave = new Blob([file], { type: "text/plain" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileToSave);
      link.download = fileName;
      link.click();
      link.remove();

    })

  }

}
