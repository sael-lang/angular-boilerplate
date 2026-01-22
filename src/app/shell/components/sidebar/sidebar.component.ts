import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { NavMode, ShellService } from '@app/shell/services/shell.service';
import { webSidebarMenuItems } from '@core/constants';
import { CredentialsService } from '@auth';
import { NavMenuItem } from '@core/interfaces';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit {
  version: string = environment.version;
  year: number = new Date().getFullYear();
  sidebarItems: NavMenuItem[] = [];
  sidebarExtendedItem = -1;
  navExpanded = true;

  // purely display (no functional impact)
  userName = 'Alex Rivera';
  userRole = 'Executive Admin';
  userInitials = 'AR';

  constructor(
    private readonly _router: Router,
    private readonly _credentialsService: CredentialsService,
    public shellService: ShellService,
  ) {
    this.sidebarItems = webSidebarMenuItems;

    // Try to derive display name/role from credentials if available (safe fallback)
    try {
      const creds: any = (this._credentialsService as any)?.credentials;
      const fullName: string | undefined = creds?.username || creds?.email || creds?.name;
      const role: string | undefined = Array.isArray(creds?.roles) ? creds.roles?.[0] : creds?.role;

      if (fullName) this.userName = String(fullName);
      if (role) this.userRole = String(role);

      const initials = this.userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join('');

      if (initials) this.userInitials = initials;
    } catch {
      // ignore - keep defaults
    }
  }

  ngOnInit(): void {
    this.shellService.activeNavTab(this.sidebarItems, this.sidebarExtendedItem);

    this._router.events
      .pipe(untilDestroyed(this))
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.shellService.activeNavTab(this.sidebarItems, this.sidebarExtendedItem);
      });

    this.shellService.navMode$.pipe(untilDestroyed(this)).subscribe((mode) => {
      /**
       * Change the second condition to mode === NavMode.Locked to make navbar by default collapsed
       */
      this.navExpanded = mode === NavMode.Free;
    });
  }

  toggleSidebar(isEnterEvent: boolean): void {
    this.shellService.navMode$.pipe(untilDestroyed(this)).subscribe((mode) => {
      if (isEnterEvent) {
        this.navExpanded = true;
      } else if (!isEnterEvent && mode === NavMode.Free) {
        this.navExpanded = false;
      }
    });
  }

  activateSidebarItem(index: number): void {
    const item = this.sidebarItems[index];
    if (item.disabled) return;

    if (index !== this.sidebarExtendedItem) {
      this.sidebarExtendedItem = index;
    } else {
      this.sidebarExtendedItem = -1; // Toggle the same item
    }

    this.shellService.activateNavItem(index, this.sidebarItems);
  }

  activateSidebarSubItem(index: number, subItem: NavMenuItem): void {
    this.shellService.activateNavSubItem(index, subItem, this.sidebarItems);
  }

  faIconClass(icon?: string): string {
    if (!icon) {
      return '';
    }

    const normalized = icon.trim().replace(/\s+/g, ' ');
    if (!normalized) {
      return '';
    }

    const hasExplicitStyle = /(fa-(solid|regular|brands))\b/.test(normalized);
    if (hasExplicitStyle || !normalized.startsWith('fa-')) {
      return normalized;
    }

    return `fa-solid ${normalized}`;
  }
}
