import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('mask-anim', [
            state('void', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 0.8
            })),
            transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
        ])
    ]
})
export class AppMainComponent {

    menuClick: boolean;

    userMenuClick: boolean;

    topbarUserMenuActive: boolean;

    menuActive: boolean;

    menuHoverActive: boolean;

    configDialogActive: boolean;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent) {}

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    onWrapperClick() {
        if (!this.menuClick) {
            this.menuActive = false;

            if (this.app.horizontal) {
                this.menuService.reset();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        this.userMenuClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event: Event) {
        this.menuClick = true;

        if (!this.app.horizontal || this.isMobile()) {
            this.menuActive = !this.menuActive;

            if (this.menuActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        event.preventDefault();
    }

    onTopbarUserMenuClick(event) {
        this.userMenuClick = true;

        if (event.target.nodeName === 'A' || event.target.parentNode.nodeName === 'A') {
            this.topbarUserMenuActive = false;
        }
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    isMobile() {
        return window.innerWidth <= 1024;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }
}
