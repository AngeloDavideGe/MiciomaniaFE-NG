import { Component, effect, input, signal } from '@angular/core';
import { ProfilePost } from '../../interfaces/profilo.interface';
import { ILang } from '../../../../../../core/interfaces/lang.interface';
import { User } from '../../../../../../shared/interfaces/users.interface';
import { DateFormatPipe } from '../../../../../../../library/pipes/date-format.pipe';
import { CardIndyComponent } from '../../../../../../../library/components/card/card-indy.component';
import { iCard } from '../../../../../../../library/interfaces/card.interface';

@Component({
  selector: 'app-posts-user',
  standalone: true,
  imports: [DateFormatPipe, CardIndyComponent],
  templateUrl: './posts-user.component.html',
  styleUrl: './posts-user.component.scss',
})
export class PostsUserComponent {
  public user = input.required<User>();
  public lang = input.required<ILang['Profilo']>();
  public posts = input.required<ProfilePost[]>();
  public currentTab = input.required<'text' | 'photo'>();

  public postsOnlyText = signal<ProfilePost[]>([]);
  public postsWithImages = signal<iCard[]>([]);

  constructor() {
    effect(() => {
      const posts: ProfilePost[] = this.posts();

      let withImg: iCard[] = [];
      let withoutImg: ProfilePost[] = [];

      posts.forEach((post: ProfilePost) => {
        if (post.immaginePost) {
          withImg.push({
            urlPic: post.immaginePost,
            descrizione: `${post.idUtente} : ${post.testo}`,
          });
        } else {
          withoutImg.push(post);
        }
      });

      this.postsOnlyText.set(withoutImg);
      this.postsWithImages.set(withImg);
    });
  }
}
