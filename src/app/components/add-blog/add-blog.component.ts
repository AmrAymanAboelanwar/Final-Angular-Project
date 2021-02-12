import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from "jquery";
import { User } from 'src/app/models/user';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  imageURL: string;
  selectedFile:File;
  addForm:FormGroup;
  user:User;
  constructor(private fb:FormBuilder , private blogService:BlogService) { 
    this.user=JSON.parse(localStorage.getItem('user')||'');
   
    this.addForm=this.fb.group({
      title:[''],
      body:[''],
     });

  }

  ngOnInit(): void {
  
  
    

  }

  onFileSelect(event:any) {
    this.selectedFile =<File> event.target.files[0];
  

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile )
  }


 onSubmit(){
  

  const fd=new FormData();
  fd.append('img' , this.selectedFile,this.selectedFile.name)
  fd.append('title' , this.addForm.value.title)
  fd.append('body' , this.addForm.value.body)
   this.blogService.addBlog(fd).subscribe(data=>{
     console.log(data);
   })
  console.log(this.selectedFile.arrayBuffer.length)
}

// onFileSelect(event:any) {
// this.selectedFile = <File>event.target.files[0];
// }



}
