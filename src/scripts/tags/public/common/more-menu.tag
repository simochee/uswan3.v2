more-menu
    .bottom-menu(class="{open: isOpen}")
        ul.bottom-nav
            li.nav-item


    .side-menu(class="{open: isOpen}")
        header
            .brand デジタル版 白鳥寮献立表
        main
            .preferences
                h3 設定
                dl
                    dt 最初に表示するページ
                    dd
                        .select-full
                            .label {firstValue || '今月の献立'}
                            select.input(onchange="{updateFirstView}")
                                option(value="#/menu") 今日からの献立
                                option(value="") 時間割
                                option(value="") おしらせ
                    dt デフォルトのクラス
                        .select
                            .label



    script(type="es6").
        const u = require('../../../utils');

        const obs = u.observable();

        this.updateFirstView = (e) => {
            e.preventDefault();
            this.firstValue = e.target.selectedOptions[0].text;
        }

        this.isOpen = false;

        obs.on('more-menu:toggle', () => {
            this.isOpen = !this.isOpen;
            this.update();
        });

        obs.on('more-menu:open', () => {
            this.isOpen = true;
            this.update();
        });

        obs.on('more-menu:close', () => {
            this.isOpen = false;
            this.update();
        });

    style(type="stylus").
        .bottom-menu
            position fixed
            left 55px
            bottom 0
            right 0
            height 55px
            background #fff
            z-index 1
            transition bottom .3s ease
            &.open
                bottom 55px
        .side-menu
            position fixed
            top 0
            right -240px
            bottom 55px
            width 240px
            background #fff
            transition right .3s ease
            &.open
                right 0
            header
                position relative
                width 100%
                height 160px
                background #ad1514
                .brand
                    height 120px
                    color #fff
                    text-align center
                    line-height 120px
                .version
                    position absolute
                    top 0
                    right 0
                    margin 5px 8px
                    color rgba(#fff, 0.4)
                    font-size 10px
            main
                position absolute
                top 120px
                left 0
                bottom 0
                right 0
                overflow-y auto
                padding-bottom 55px
                background #fff
                .menu-nav
                    padding 25px 0
                    .nav-item
                        .nav-anchor
                            display block
                            height 50px
                            padding 0 20px
                            font-size 15px
                            line-height 50px
                            color #444a5a
                            text-decoration none
                .preferences
                    margin 0 15px 0
                    h3
                        color #444
                        font-size 16px
                        font-weight bold
                    dl
                        dt
                            font-size 14px
                        dd
                            .select-full
                                position relative
                                width 100%
                                height 35px
                                .label
                                    position absolute
                                    width 100%
                                    height 35px
                                    background #fff
                                    box-sizing border-box
                                    border 1px solid  #ccc
                                    border-radius 5px
                                    line-height 35px
                                    font-size 12px
                                    text-align center
                                    z-index 1
                                    pointer-events none
                                .input
                                    position absolute
                                    display block
                                    width 100%
                                    height 35px