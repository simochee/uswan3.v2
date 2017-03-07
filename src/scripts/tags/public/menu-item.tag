menu-item

    .menu-item(id="menuItem{data.date}" class="{open: isOpen}" style="height: {height}px")
        .summary(onclick="{open}")
            .date
                .wrapper
                    .day {date}
                    .week {weekday}
            .menu
                .menu-main.breakfast
                    span.main-item(if="{data.breakfast.jap}") {data.breakfast.jap}
                    span.main-item(if="{data.breakfast.wes}") {data.breakfast.wes}
                .menu-main.lunch
                    span.main-item {data.lunch.main}
                .menu-main.dinner
                    span.main-a {data.dinner.a}
                    span.main-b {data.dinner.b}
        .detail
            .header
                .day {date}
                .week {weekday}
                button.back(type="button" onclick="{close}")
                    span.ion-ios-arrow-right
            .menu
                .menu-main.breakfast
                    span.main-item(if="{data.breakfast.jap}") {data.breakfast.jap}
                    span.main-item(if="{data.breakfast.wes}") {data.breakfast.wes}
                .menu-side
                    span.side-item(each="{item in data.breakfast.side}") {item}
                .menu-main.lunch
                    span.main-item {data.lunch.main}
                .menu-side
                    span.side-item(each="{item in data.lunch.side}") {item}
                .menu-main.dinner
                    span.main-item.main-a {data.dinner.a}
                    span.main-item.main-b {data.dinner.b}
                .menu-side
                    span.side-item(each="{item in data.dinner.side}") {item}


    script(type="es6").
        const moment = require('moment');
        const u = require('../../utils');
        const obs = u.observable();
    
        this.isOpen = false;
        this.toggle = () => {
            this.isOpen = !this.isOpen;
            if(this.isOpen) {
                this.height = this.detailH;
            } else {
                this.height = this.summaryH;
            }
        }
        this.open = () => {
            this.isOpen = true;
            this.height = this.detailH;
        }
        this.close = () => {
            this.isOpen = false;
            this.height = this.summaryH;
        }

        this.data = opts.data;

        const m = moment(this.data.date);
        this.date = m.get('date');
        this.weekday = m.format('ddd');

        obs.on('menu:loaded', () => {
            const $elem = document.getElementById(`menuItem${this.data.date}`);
            // 高さを保存
            const $summary = $elem.getElementsByClassName('summary')[0];
            this.summaryH = $summary.clientHeight;
            const $detail = $elem.getElementsByClassName('detail')[0];
            this.detailH = $detail.clientHeight;
            this.height = this.summaryH;
            this.update();
        });


    style(type="stylus").
        .menu-item
            overflow hidden
            position relative
            margin 0 10px 30px
            box-shadow 0 2px 2px 0 rgba(#000, .14), 0 3px 1px -2px rgba(#000, .2), 0 1px 5px 0 rgba(#000, .12)
            background rgba(#fff, .1)
            transition background .5s ease, height .4s .2s ease
            .summary
                user-select none
                cursor pointer
                transition transform .4s .2s ease
                .date
                    position absolute
                    top 0
                    left 0
                    bottom 0
                    width 60px
                    margin 8px 0
                    border-right 1px solid rgba(#aaa, .3)
                    .wrapper
                        position absolute
                        top 50%
                        left 50%
                        width 60px
                        height 40px
                        margin -20px -30px
                        color rgba(#000, .75)
                        text-align center
                        .day   
                            line-height 28px
                            font-size 15px
                        .week
                            line-height 12px
                            font-size 10px
                .menu
                    margin 0 40px 0 80px
                    padding 20px 0
                    .menu-main
                        text-align center
                        & > span
                            font-size 15px
                        &:nth-child(2)
                            margin 20px 0
                        &.dinner
                            .main-a,
                            .main-b
                                display block
                                &::before
                                    display inline-block
                                    width 14px
                                    height 14px
                                    margin-right 5px
                                    border 1px solid #333
                                    color #333
                                    font-size 10px
                                    text-align center
                                    line-height 14px
                                    transform translateY(-1px)
                            .main-a
                                margin-bottom 5px
                                &::before
                                    content 'A'
                            .main-b
                                &::before
                                    content 'B'
            .detail
                position absolute
                top 0
                left -100%
                width 100%
                transition left .4s .2s ease
                .header
                    position relative
                    margin 0 12px
                    padding 10px 0
                    border-bottom 1px solid rgba(#aaa, .3)
                    text-align center
                    user-select none
                    .day
                        font-size 16px
                    .week
                        font-size 10px
                    .back
                        position absolute
                        top 0
                        right -12px
                        bottom 0
                        width 60px
                        font-size 25px
                        cursor pointer
                .menu
                    padding 20px 0
                    .menu-main
                        margin-bottom 8px
                        text-align center
                        &:not(:first-child)
                            margin-top 30px
                        .main-item
                            font-size 18px
                            line-height 30px
                        &.breakfast
                            .main-item:nth-child(2)
                                &::before
                                    content '/'
                                    margin 0 5px
                        &.dinner
                            .main-a,
                            .main-b
                                display block
                                &::before
                                    display inline-block
                                    width 18px
                                    height 18px
                                    margin-right 8px
                                    border 1px solid  #333
                                    opacity .8
                                    color #333
                                    text-align center
                                    line-height 18px
                                    font-size 12px
                                    transform translateY(-2px)
                            .main-a
                                &::before
                                    content 'A'
                            .main-b
                                &::before
                                    content 'B'
                    .menu-side
                        margin 0 20px
                        text-align center
                        .side-item
                            display inline-block
                            margin 0 10px
                            line-height 25px
                            font-size 15px
                            color rgba(#111, .9)
            &.open
                background rgba(#fff, .5)
                .summary
                    transform translateX(100%)
                .detail
                    left 0