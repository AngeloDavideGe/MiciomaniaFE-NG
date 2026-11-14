import { Component, inject, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SpinnerIndyComponent } from '../../../../../../library/components/spinner/spinner-indy.component';
import { getIconSafe } from '../../../../../../library/functions/icons.function';
import { NAVIGATION_ICONS } from '../../../../../../library/icons/navigation-icons.constant';
import { LOCATION_ICONS } from '../../../../../../library/icons/location-icons.constant';
import { SOCIAL_ICONS } from '../../../../../../library/icons/social-icons.constant';
import { handlerFunc } from '../../../../../../library/functions/handler.function';
import { Social } from '../../../../../shared/interfaces/mn.interface';
import { MNService } from '../../../../../shared/services/mn.service';
import { AppConfigService } from '../../../../../core/api/appConfig.service';
@Component({
  selector: 'app-social-link',
  standalone: true,
  imports: [SpinnerIndyComponent],
  templateUrl: './social-link.component.html',
  styleUrl: './social-link.component.scss',
})
export class SocialLinkComponent implements OnInit {
  public readonly mnService = inject(MNService);
  private readonly appConfig = inject(AppConfigService);

  public readonly lang = this.appConfig.lang.Home.Social;
  public readonly socialIcon: SafeHtml = getIconSafe(SOCIAL_ICONS.share, {
    stroke: 'currentColor',
    size: '3.2rem',
  });
  public readonly webIcon: SafeHtml = getIconSafe(LOCATION_ICONS.globe, {
    stroke: 'currentColor',
    size: '3.2rem',
  });
  public readonly externalLinkIcon: SafeHtml = getIconSafe(
    NAVIGATION_ICONS.externalLink,
    { stroke: 'currentColor', size: '1em' },
  );

  public getSocialIcon(icon: string): SafeHtml {
    return /(?:globe|web|website)/i.test(icon) ? this.webIcon : this.socialIcon;
  }

  ngOnInit(): void {
    handlerFunc<Social[]>({
      skipCall: this.mnService.socialLoaded,
      callHttp: () => this.mnService.getSocialLinks(),
      nextCall: (data: Social[]) => this.mnService.social.set(data),
      errorCall: () => (this.mnService.socialLoaded = false),
    });

    this.mnService.socialLoaded = true;
  }

  openLink(link: string): void {
    if (link) {
      window.open(link);
    }
  }
}
