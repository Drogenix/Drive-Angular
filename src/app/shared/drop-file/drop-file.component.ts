import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {UserDriveService} from "../../services/user-drive-service/user-drive.service";
import {Image} from "../../models/image";

@Component({
  selector: 'app-drop-file',
  templateUrl: './drop-file.component.html',
  styleUrls: ['./drop-file.component.css']
})
export class DropFileComponent{

  @Output() uploadedImages = new EventEmitter<Array<Image>>();

  constructor(private userDriveService:UserDriveService) { }

  // @ts-ignore
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  // @ts-ignore
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  // @ts-ignore
  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    const images = new Array<Image>();

    for(let i = 0; i < files.length; i++)
    {
      this.userDriveService.uploadImage(files[i]).subscribe(image => {
        images.push(image);

        if(files.length === images.length)
        {
          this.uploadedImages.emit(images);
        }
      })
    }
  }

}
