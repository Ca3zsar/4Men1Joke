import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
@Component({
  selector: 'app-file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"]
})
export class FileUploadComponent {

    acceptedTypes : string[] = ['image/png', 'image/jpeg', 'image/gif'];

    fileName = '';
    imgSrc : string = '';
    uploadSub?: Subscription | null;

    constructor(private http: HttpClient) {}

    onFileSelected(event : any) {
        const file:File = event.target.files[0];
      
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            const reader = new FileReader();
            reader.readAsDataURL(file); // toBase64
            reader.onload = () => {
              this.imgSrc = reader.result as string; // base64 Image src
            };
            formData.append("thumbnail", file);

            // const upload$ = this.http.post("/api/thumbnail-upload", formData, {
            //     reportProgress: true,
            //     observe: 'events'
            // })
            // .pipe(
            //     finalize(() => this.reset())
            // );
          
            // this.uploadSub = upload$.subscribe(event => {
            //   if (event.type == HttpEventType.UploadProgress) {
            //     event.total = event.total || file.size;
            //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            //   }
            // })
        }
    }

  cancelUpload() {
    this.uploadSub!.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadSub = null;
  }
}