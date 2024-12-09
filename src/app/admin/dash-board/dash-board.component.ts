import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule, FormsModule, AddUserComponent, EditUserComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css',
})
export class DashBoardComponent {
  users: User[] | any[] = [];
  allUsers: User[] = [];
  searchText: string = '';
  addUser: boolean = false;
  editUser: boolean = false;
  selectedUser: User = {} as User;
  newUser: User = {} as User;

  constructor(private adminService: AdminService, private router: Router) {

    // get all user details
    this.adminService.getAllUsers().subscribe((res) => {
      if (res) {
        this.users = res.users;
        this.allUsers = res.users;
        console.log('');
        
      }
    });
  }

  

  onSearch() {
    if (!this.searchText.trim()) {
      this.users = this.allUsers;
    } else {
      this.users = this.allUsers.filter((user) =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // to open the add user modal
  onAddUser() {
    this.addUser = true;
  }

  // to close the add user modal
  onClose() {
    this.addUser = false;
  }

  onCloseEdit() {
    this.editUser = false;
    window.location.reload();
  }

  // edit user 
  onEditUser(user: User) {
    this.editUser = true;
    this.selectedUser = user;
  }

  // delete user
  onDelete(user: any) {
    this.adminService.deleteUser(user._id).subscribe((res) => {
      if (res) {
        this.users = this.users.filter((u) => u._id !== user._id);
      }
    });
  }

  // admin logout
  onLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/login']);
  }
}
