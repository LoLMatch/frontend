import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'ds-contacts-list',
  standalone: true,
  imports: [
    CommonModule,
    ContactItemComponent,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit{
  chats = [
    {
      name: "marek",
      message: "cos tam cos tam",
      isUnread: false,
      id: '1'
    },
    {
      name: "anna",
      message: "zagrajmy w grę",
      isUnread: true,
      id: '2'
    },
    {
      name: "username1",
      message: "cos tam cos tam ale takie dłuższe wwwwwwwwwwwww wwwwwwww wwwwwwwwwwwwwwwwwww wwwwwwwwww www",
      isUnread: false,
      id: '3'
    },
    {
      name: "username2",
      message: "zagrajmy w grę",
      isUnread: true,
      id: '4'
    },
    {
      name: "username3",
      message: "cos tam cos tam",
      isUnread: false,
      id: '5'
    },
    {
      name: "username4",
      message: "zagrajmy w grę",
      isUnread: true,
      id: '6'
    },
    {
      name: "username5",
      message: "cos tam cos tam",
      isUnread: false,
      id: '7'
    },
    {
      name: "username6",
      message: "zagrajmy w grę",
      isUnread: true,
      id: '8'
    },
    {
      name: "username7",
      message: "cos tam cos tam",
      isUnread: false,
      id: '9'
    },
    {
      name: "username8",
      message: "zagrajmy w grę",
      isUnread: true,
      id: '10'
    },
  ];

  filteredChats: {
    name: string;
    message: string;
    isUnread: boolean;
  }[] = this.chats;

  showScrollbar = false;

  form: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.form = this.fb.group({
      nameToFilter: [null as string],
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showScrollbar = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.showScrollbar = false;
  }

  filterChats() {
    const name: string = this.form.value.nameToFilter;

    this.filteredChats = this.chats.filter((elem) => {
      return elem.name.includes(name);
    });
  }

  goToChat(chatId: string) {
    void this.router.navigate(['/home/messages', chatId]);
  }
}
