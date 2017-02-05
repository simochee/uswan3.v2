menu

    virtual(each="{item, i in data}")
        header(if="{i == 0}")
            //- daily-menu(if="{isToday(item.date)}" data="{item}")
            .ad.ad-sm.ad-header
                img(src="https://placehold.jp/320x50.png")
            h2
                span.ja ２月
                span.en February
        menu-item(if="{i != 0}" data="{item}")
        .ad.ad-md.ad-menulist(if="{i % 7 == 6}")
            img(src="https://placehold.jp/320x100.png")


    script(type="es6").
        const moment = require('moment');
        const store = require('../../public/store');
        const u = require('../../utils');
        const obs = u.observable();

        this.data = [];

        const now = moment().format('HH:mm');
        store.getMenu(now > '19:40' ? 1 : 0).then((data) => {
            this.data = data;
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