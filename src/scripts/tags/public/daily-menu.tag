daily-menu
    .daily-menu
        .header 今日の献立
        .main
            .menu-item#dailyMenu-breakfast(class="{open: isOpen == 'breakfast'}" onclick="{open('breakfast')}")
                .label 朝
                .menu-body
                    .menu-main {today.breakfast.main}
                    .menu-side
                        ul
                            li(each="{item in today.breakfast.side}") {item}
            .menu-item#dailyMenu-lunch(class="{open: isOpen == 'lunch'}" onclick="{open('lunch')}")
                .label 昼
                .menu-body
                    .menu-main {today.lunch.main}
                    .menu-side
                        ul
                            li(each="{item in today.lunch.side}") {item}
            .menu-item#dailyMenu-dinner(class="{open: isOpen == 'dinner'}" onclick="{open('dinner')}")
                .label 夜
                .menu-body
                    .menu-main {today.dinner.main}
                    .menu-side
                        ul
                            li(each="{item in today.dinner.side}") {item}

    script(type="es6").
        this.today = {
            breakfast: {
                main: 'ごはん',
                side: ['納豆', '味噌汁', '牛乳']
            },
            lunch: {
                main: 'カレーうどん',
                side: ['サラダ']
            },
            dinner: {
                main: '焼き魚のフィレット',
                side: ['なんか', 'いろいろある', 'おひたし', 'サラダ', '味噌汁']
            }
        }

        this.init = 'breakfast';
        this.isOpen = this.init;

        const lineHeight = 30;

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
                    const len = this.today[time].side.length;
                    $elem[0].style.height = `${len * lineHeight}px`;
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
                    align-content center
                    padding 8px 20px
                    transition all .6s ease
                    .label
                        width 20px
                        height 20px
                        font-size 11px
                        border 1px solid  #333
                        border-radius 100%
                        text-align center
                        line-height 20px
                    .menu-body
                        flex 1
                        .menu-side
                            overflow hidden
                            height 0
                            transition height .3s ease
                    &.open
                        background rgba(#fff, .8)
                        .menu-body
                            .menu-side
                                transition height .4s .3s ease