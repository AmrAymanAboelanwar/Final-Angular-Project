import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

   blogs:Blog[];
   user:User;
  
  constructor(private serviceUser:UserService ,private blogService:BlogService, private router:Router,private commentService:CommentService) { 
   
    this.serviceUser.GetUserProfile().subscribe(data=>{
      debugger;
       this.user =data.result;
       this.blogs=data.Blogs;
     
       
    })

  }

  ngOnInit(): void {

    


  }

  getfollowingORfollwers(userId:String){
    this.router.navigateByUrl(`/view-user/${userId}`);
   }

   delete(id:String){
     this.blogService.deleteBlog(id).subscribe(r=>{
           console.log('deleted')
           this.ngOnInit();
     },e=>{
      console.log('not deleted')
     })
   }
}
