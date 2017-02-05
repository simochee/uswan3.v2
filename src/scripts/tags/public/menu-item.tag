menu-item

    .menu-item(id="menuItem{data.date}" class="{open: isOpen}" onclick="{toggle}" style="height: {height}px")
        .summary
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
            .date
                .day {date}
                .week {weekday}

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

        this.data = opts.data;

        const m = moment(this.data.date);
        this.date = m.get('date');
        this.weekday = m.format('ddd');

        obs.on('menu:loaded', () => {
            const $elem = document.getElementById(`menuItem${this.data.date}`);
            // 高さを保存
            const $summary = document.getElementsByClassName('summary')[0];
            this.summaryH = $summary.clientHeight;
            const $detail = document.getElementsByClassName('detail')[0];
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
                display flex
                transition transform .4s .2s ease
                .date
                    position relative
                    width 80px
                    margin 8px 0
                    border-right 1px solid rgba(#aaa, .3)
                    .wrapper
                        position absolute
                        top 50%
                        left 50%
                        width 80px
                        height 40px
                        margin -20px -40px
                        color rgba(#000, .75)
                        text-align center
                        .day   
                            line-height 28px
                            font-size 15px
                        .week
                            line-height 12px
                            font-size 10px
                    .menu-main
                        flex 1
            .detail
                position absolute
                top 0
                left -100%
                width 100%
                transition left .4s .2s ease
                .date
                    margin 0 12px
                    padding 10px 0
                    border-bottom 1px solid rgba(#aaa, .3)
                    text-align center
                    .day
                        font-size 16px
                    .week
                        font-size 10px
            &.open
                background rgba(#fff, .5)
                .summary
                    transform translateX(100%)
                .detail
                    left 0