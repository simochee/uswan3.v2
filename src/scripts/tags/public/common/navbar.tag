navbar

    nav.navbar(class="{hide: !isShow}")
        ul.navbar-nav(class="{open: isOpen}")
            li.nav-item
                a.nav-anchor(href="#/search" onclick="{close}")
                    .icon.ion-android-search
                    .label 検索
            li.nav-item
                a.nav-anchor(href="#/archive" onclick="{close}")
                    .icon.ion-ios-bookmarks-outline
                    .label 過去の献立
            li.nav-item
                a.nav-anchor(href="#/timetable" onclick="{close}")
                    .icon.ion-ios-calendar-outline
                    .label 時間割
            li.nav-item
                span.nav-anchor
                    .icon.ion-ios-grid-view-outline
                    .label 準備中
            li.nav-item
                a.nav-anchor(href="//www.ube-k.ac.jp/hakucho-domitory/" target="_blank" onclick="{close}")
                    .icon.ion-ios-home-outline
                    .label 白鳥寮
            li.nav-item
                a.nav-anchor(href="twitter://user?screen_name=uswan2_" onclick="{close}")
                    .icon.ion-social-twitter-outline
                    .label Twitter
        .nav-large
            a.nav-large-wrapper(href="#/menu" onclick="{close}")
                .icon.ion-coffee
                .label 献立表
        .nav-more
            a.nav-anchor(href="#" class="{open: isOpen}" onclick="{toggleMoreMenu}")
                .navicon.ion-navicon
                .closer.ion-android-close

    side-menu

    curfew
            
    script(type="es6").
        const u = require('../../../utils');
        const obs = u.observable();
    
        this.isOpen = false;
        this.isShow = true;
        this.toggleMoreMenu = (e) => {
            e.preventDefault();
            this.isOpen = !this.isOpen;
            this.isShow = true;
            obs.trigger('side-menu:toggle');
        }

        this.close = (e) => {
            obs.trigger('side-menu:close');
        }

        obs.on('side-menu:close', () => {
            this.isOpen = false;
            this.update();
        });

        obs.on('navbar:show', () => {
            this.isShow = true;
            this.update();
        });
        obs.on('navbar:hide', () => {
            this.isShow = false;
            this.update();
        });

    style(type="stylus").
        .navbar
            position fixed
            bottom 0
            left 0
            width 100%
            height 0
            padding 0 60px 0 110px
            box-sizing border-box
            z-index 100
            user-select none
            &.hide
                display none
            .navbar-nav
                height 110px
                margin 0 -60px 0 -55px
                padding 0 60px 0 55px
                background #fff
                transform translateY(-55px)
                transition transform .3s ease
                &.open
                    transform translateY(-110px)
                .nav-item
                    float left
                    width 33.333%
                    height 55px
                    text-align center
                    .nav-anchor
                        display block
                        padding 5px 0
                        text-decoration none
                        color #222
                        -webkit-tap-highlight-color: rgba(0,0,0,0); 
                        .icon
                            line-height 30px
                            font-size 25px
                        .label
                            line-height 15px
                            font-size 10px
            .nav-large
                $size = 110px
                position absolute
                bottom 0
                left 0
                width $size
                height $size
                background #fff
                border-radius 100%
                border-bottom-left-radius 0
                .nav-large-wrapper
                    position relative
                    display block
                    width ($size - 14)
                    height ($size - 14)
                    margin 5px
                    border-radius 100%
                    border 2px solid  #222
                    color #222
                    -webkit-tap-highlight-color: rgba(0,0,0,0); 
                    .icon
                        font-size 40px
                        text-align center
                        line-height 80px
                    .label
                        position absolute
                        bottom 5px
                        left 0
                        width 100%
                        height 35px
                        text-align center
                        font-size 12px
                        line-height 35px
            .nav-more
                position absolute
                bottom 0
                right 0
                overflow hidden
                width 60px
                height 55px
                font-size 36px
                .nav-anchor
                    position relative
                    display block
                    color #222
                    -webkit-tap-highlight-color: rgba(0,0,0,0); 
                    & > div
                        position absolute
                        width 60px
                        height 55px
                        text-align center
                        line-height 55px
                        transition all .3s ease
                    .navicon
                        opacity 1
                        transform translateY(0)
                    .closer
                        opacity 0
                        transform translateY(12px)
                    &.open
                        .navicon
                            opacity 0
                            transform translateY(-12px)
                        .closer
                            opacity 1
                            transform translateY(0)
