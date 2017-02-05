daily-menu
    .daily-menu#dailyMenu
        .header {tomorrow ? '明日' : '今日'}の献立
        .main
            .menu-item#dailyMenu-breakfast(class="{open: isOpen == 'breakfast', dailyMenuInit: init == 'breakfast'}" onclick="{open('breakfast')}")
                .label 朝
                .menu-body
                    .menu-main
                        .main-breakfast
                            span.main-item(if="{data.breakfast.jap}") {data.breakfast.jap}
                            span.main-item(if="{data.breakfast.wes}") {data.breakfast.wes}
                    .menu-side
                        ul
                            li(each="{item in data.breakfast.side}") {item}
            .menu-item#dailyMenu-lunch(class="{open: isOpen == 'lunch', dailyMenuInit: init == 'lunch'}" onclick="{open('lunch')}")
                .label 昼
                .menu-body
                    .menu-main {data.lunch.main}
                    .menu-side
                        ul
                            li(each="{item in data.lunch.side}") {item}
            .menu-item#dailyMenu-dinner(class="{open: isOpen == 'dinner', dailyMenuInit: init == 'dinner'}" onclick="{open('dinner')}")
                .label 夜
                .menu-body
                    .menu-main
                        .main-dinner
                            span.main-a {data.dinner.a}
                            span.main-b {data.dinner.b}
                    .menu-side
                        ul
                            li(each="{item in data.dinner.side}") {item}

    script(type="es6").
        const moment = require('moment');
        const u = require('../../utils');
        const obs = u.observable();

        this.data = opts.data;

        const now = moment().format('HH:mm');
        this.init = now <= '08:30' || now > '19:40' ? 'breakfast'
                    : now <= '12:50' ? 'lunch' : 'dinner';
        this.isOpen = this.init;

        this.tomorrow = now > '19:40';

        const padding = 30;

        obs.on('menu:loaded', () => {
            // 高さを付与
            const $parent = document.getElementsByClassName(`dailyMenuInit`)[0];
            const $elem = $parent.getElementsByClassName('menu-side');
            const height = $elem[0].childNodes[1].clientHeight;
            $elem[0].style.height = `${height + padding}px`;
            
            // 高さにtransitionを追加
            setTimeout(() => {
                const $daily = document.getElementById('dailyMenu');
                const $items = $daily.getElementsByClassName('menu-side');
                Object.keys($items).forEach((idx) => {
                    const $item = $items[idx];
                    $item.style.transition = 'height .4s .2s ease';
                });
            }, 0);
        });

        this.open = (time) => {
            return (e) => {
                e.preventDefault();
                if(this.isOpen !== time) {
                    // サイドメニューHide
                    const $old_p = document.getElementById(`dailyMenu-${this.isOpen}`);
                    const $old_e = $old_p.getElementsByClassName('menu-side');
                    $old_e[0].style.height = `0px`;
                    // 高さを付与
                    const $parent = document.getElementById(`dailyMenu-${time}`);
                    const $elem = $parent.getElementsByClassName('menu-side');
                    const height = $elem[0].childNodes[1].clientHeight;
                    $elem[0].style.height = `${height + padding}px`;
                    this.isOpen = time;
                }
            }
        }

    style(type="stylus").
        .daily-menu
            margin 10px 5%
            background rgba(#fff, 0.35)
            box-shadow 0 2px 2px 0 rgba(#000, .14), 0 3px 1px -2px rgba(#000, .2), 0 1px 5px 0 rgba(#000, .12)
            .header
                width 100%
                height 40px
                color rgba(#333, .8)
                font-size 14px
                line-height 40px
                text-align center
            .main
                .menu-item
                    display flex
                    align-items center
                    padding 8px 55px 8px 20px
                    transition background .6s ease
                    .label
                        width 20px
                        height 20px
                        margin-right 15px
                        border 1px solid  #333
                        border-radius 100%
                        font-size 11px
                        text-align center
                        line-height 20px
                    .menu-body
                        flex 1
                        .menu-main
                            margin 8px 0
                            text-align center
                            font-size 18px
                            line-height 28px
                            .main-breakfast
                                span
                                    &:nth-child(2)
                                        &::before
                                            content '/'
                            .main-dinner
                                span
                                    display block
                                    &:not(:first-child)
                                        margin-top 8px
                                    &.main-a,
                                    &.main-b
                                        &::before
                                            display inline-block
                                            width 18px
                                            height 18px
                                            margin-right .4em
                                            line-height 16px
                                            font-size 16px
                                            background #333
                                            color #eee
                                            transform translateY(-1px)
                                    &.main-a
                                        &::before
                                            content 'A'
                                    &.main-b
                                        &::before
                                            content 'B'
                        .menu-side
                            position relative
                            overflow hidden
                            height 0
                            &::before
                                content ''
                                position absolute
                                top 10px
                                left 50%
                                width 30px
                                margin-left -15px
                                border-bottom 1px dashed #444
                            &::after
                                content ''
                                position absolute
                                top 10px
                                left 50%
                                width 3px
                                height 3px
                                margin -2.5px
                                border 1px solid  #444
                                background #fff
                                transform rotate(45deg)
                            li
                                margin-bottom 10px
                                font-size 14px
                                line-height 20px
                                text-align center
                                &:first-child
                                    margin-top 30px
                    &.open
                        background rgba(#fff, .7)
