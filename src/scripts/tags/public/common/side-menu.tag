side-menu
    .side-menu(class="{open: isOpen}")
        header
            .brand デジタル版 白鳥寮献立表
        main
            .preferences
                h3 フィードバック
                p ご指摘・ご意見などお気軽にお送りください！
                form.feedback-form(onsubmit="return false")
                    textarea(placeholder="内容は公開されます。個人情報の記載はご遠慮下さい。")
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

    .close-wall(class="{open: isOpen}" onclick="{close}")

    script(type="es6").
        const u = require('../../../utils');

        const obs = u.observable();

        this.updateFirstView = (e) => {
            e.preventDefault();
            this.firstValue = e.target.selectedOptions[0].text;
        }

        this.isOpen = false;

        obs.on('side-menu:toggle', () => {
            console.log('TOGGLE!')
            this.isOpen = !this.isOpen;
            this.update();
        });

        obs.on('side-menu:open', () => {
            this.isOpen = true;
            this.update();
        });

        obs.on('side-menu:close', () => {
            this.isOpen = false;
            this.update();
        });

        this.close = (e) => {
            e.preventDefault();
            obs.trigger('side-menu:close');
        }

    style(type="stylus").
        .side-menu
            position fixed
            top 0
            right -240px
            bottom 55px
            overflow-y auto
            width 240px
            padding-bottom 55px
            background #fff
            box-sizing border-box
            transition right .3s ease
            z-index 50
            &.open
                right 0
            header
                position relative
                width 100%
                height 120px
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
        .close-wall
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            visibility hidden
            background-color transparent
            transition visibility 0s .4s ease, background .4s ease
            z-index 10
            &.open
                visibility visible
                background-color rgba(#000, .3)
                transition background .4s ease