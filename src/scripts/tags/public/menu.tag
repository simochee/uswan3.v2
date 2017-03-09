menu

    virtual(each="{item, i in data}")
        header(if="{i == 0}")
            daily-menu(if="{isToday(item.date)}" data="{item}")
            .ad.ad-sm.ad-header
                ad-header-bottom
            h2
                span.ja ２月
                span.en February
        menu-item(if="{i != 0}" data="{item}")
        .ad.ad-md.ad-menulist(if="{i % 7 == 6}")
            img(src="http://bentographics.com/site/wp-content/uploads/2014/12/4_ADS_320%C3%97100.png" width="320")

    div(if="{data.length < 1}")
        .ad.ad-lg.ad-menulist
            img(src="https://placehold.jp/320x250.png")
        .menu-not-found
            span.icon.ion-help
            p.msg 献立が見つかりませんでした

    script(type="es6").
        this.ad = 'http://example.com/api.js';
    
        const moment = require('moment');
        const model = require('../../public/model');
        const u = require('../../utils');
        const obs = u.observable();

        this.data = [];

        const now = moment().format('HH:mm');
        model.getMenu(now > '19:40' ? 1 : 0).then((data) => {
            this.data = data;

            this.data = new Array;

            console.log(this.data)

            this.update();
            obs.trigger('menu:loaded');
        });

        this.isToday = (date) => {
            return (e) => {
                const isToday = moment().isSame(date, 'day');
                console.log(isToday);
                return isToday;
            }
        }

    style(type="stylus").
        h2
            margin 12px 10px
            .ja
                font-size 24px
            .en
                font-size 14px
        .menu-not-found
            @keyframes fadeIn
                0%,
                50%
                    transform translateY(30px)
                    opacity 0
                100%
                    transform translateY(0)
                    opacity 1
            width 300px
            margin 40px auto 0
            padding 15px 0
            background rgba(#fff, .18)
            border 2px solid  #333
            color #222
            text-align center
            animation fadeIn 2s cubic-bezier(0.215, 0.61, 0.355, 1)
            .icon
                font-size 80px
            .msg
                font-size 14px
                line-height 30px