import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comment';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-get-one-blog',
  templateUrl: './get-one-blog.component.html',
  styleUrls: ['./get-one-blog.component.css']
})
export class GetOneBlogComponent implements OnInit {
   blog:Blog|null=null;
   comments:Comment[];
   
  constructor(private router:ActivatedRoute,private blogService:BlogService , private commentService:CommentService) {
    
  }




  ngOnInit(): void {
    this.router.params.subscribe(r=>{
      this.blogService.getBlog(r.id).subscribe(data=>{
        this.blog = data;
      
      });
    
 
      this.commentService.getComments(r.id).subscribe(data=>{
       this.comments= data;
      

      });
 
     })

  }

  addComment(id:String,text:string){
    debugger;
    const fd =new FormData();
     fd.append('text',text);
      this.commentService.AddComment(id,fd).subscribe(d=>{
        this.ngOnInit();
      })
  }


  time(c:string):string{

    console.log(c)
    return "";
  }

}
