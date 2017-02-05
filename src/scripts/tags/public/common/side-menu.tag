side-menu
    .side-menu(class="{open: isOpen}")
        header
            .brand デジタル版 白鳥寮献立表
        main
            .feedback
                h3 インフォメーション
                p 白鳥寮のインフォメーションです
                ul.informations
                    li
                        .input-group
                            .input
                                input(type="text" value="山口県宇部市常盤台2丁目12番1号")
                            .button
                                button.btn(type="button" onclick="{toggleAddressOption}")
                                    span.ion-android-arrow-dropdown
                            .button
                                button.btn(type="button")
                                    span.ion-ios-copy-outline
                        .address-option
                            
                h3 フィードバック
                p ご指摘・ご意見などお気軽にお送りください！
                form.feedback-form(class="{error: this.count < 0}" onsubmit="{sendFeedback}")
                    textarea.textarea(placeholder="{limit ? 'ご意見ありがとうございました！' : '内容は公開されます。個人情報の記載はご遠慮下さい'}" disabled="{limit}" onkeyup="{letterCount}" onfocus="{hideNavbar}" onblur="{showNavbar}")
                    button.submit(type="submit" disabled="{limit: limit, error: this.count < 0}") 送信
                    .count {this.count}
                //- h3 設定
                //- dl
                //-     dt 最初に表示するページ
                //-     dd
                //-         .select-full
                //-             .label {firstValue || '今月の献立'}
                //-             select.input(onchange="{updateFirstView}")
                //-                 option(value="#/menu") 今日からの献立
                //-                 option(value="") 時間割
                //-                 option(value="") おしらせ
                //-     dt デフォルトのクラス
                //-         .select
                //-             .label

    .close-wall(class="{open: isOpen}" onclick="{close}")

    script(type="es6").
        const Cookie = require('js-cookie');
        const api = require('../../../public/api');
        const u = require('../../../utils');

        const obs = u.observable();

        this.count = 100;
        this.letterCount = (e) => {
            const len = e.target.value.length;
            this.count = 100 - len;
        }

        this.limit = new Date - (new Date(Cookie.get('feedback_limit')) || 0) > 20 * 60 * 1000 ? false : true;

        this.sendFeedback = (e) => {
            e.preventDefault();
            const input = e.target[0].value;
            const plain = input.replace(/\n|\n\r|\r/g, '\n');
            api.feedback(plain).then(() => {
                const d = new Date;
                Cookie.set('feedback_limit', new Date);
                e.target[0].value = '';
                this.count = '';
                this.limit = true;
                this.update();
            }).catch((msg) => {
                if(msg === null) {

                } else {

                }
            });
        }

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

        this.hideNavbar = () => {
            obs.trigger('navbar:hide');
        }
        this.showNavbar = () => {
            obs.trigger('navbar:show');
        }

    style(type="stylus").
        .side-menu
            position fixed
            top 0
            right -240px
            bottom 0
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
                background url(./assets/images/header.png) center center
                background-size cover
                // background #ad1514
                .brand
                    display none
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
                padding 0 10px 15px
                .feedback
                    h3
                        margin-top 15px
                        color #333
                        font-size 16px
                        line-height 30px
                    p
                        font-size 11px
                        color #555
                        line-height 18px
                    .feedback-form
                        position relative
                        margin 8px 3px
                        .textarea
                            display block
                            width 100%
                            height 90px
                            padding 10px 8px
                            border 1px solid #eee
                            box-sizing border-box
                            resize none
                            line-height 16px
                            font-size 13px
                        .submit
                            width 80px
                            height 35px
                            margin-top 10px
                            border 1px solid #333
                            line-height 35px
                            letter-spacing .4em
                            text-indent .4em
                            transition background .2s ease, color .2s ease
                            &:not([disabled="disabled"])
                                &:hover
                                    background #333
                                    color #fff
                            &[disabled="disabled"]
                                border-color #aaa
                                color #aaa
                        .count
                            position absolute
                            right 5px
                            bottom 25px
                            font-size 11px
                            line-height 15px
                        &.error
                            .count
                                color #f00
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
            position fixed
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