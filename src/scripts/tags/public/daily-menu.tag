daily-menu
    .daily-menu
        .header 今日の献立
        .main
            .menu-item#dailyMenu-breakfast(class="{open: isOpen == 'breakfast', dailyMenuInit: init == 'breakfast'}" onclick="{open('breakfast')}")
                .label 朝
                .menu-body
                    .menu-main
                        .main-breakfast
                            span.main-item(if="{today.breakfast.jap}") {today.breakfast.jap}
                            span.main-item(if="{today.breakfast.wes}") {today.breakfast.wes}
                    .menu-side
                        ul
                            li(each="{item in today.breakfast.side}") {item}
            .menu-item#dailyMenu-lunch(class="{open: isOpen == 'lunch', dailyMenuInit: init == 'lunch'}" onclick="{open('lunch')}")
                .label 昼
                .menu-body
                    .menu-main {today.lunch.main}
                    .menu-side
                        ul
                            li(each="{item in today.lunch.side}") {item}
            .menu-item#dailyMenu-dinner(class="{open: isOpen == 'dinner', dailyMenuInit: init == 'dinner'}" onclick="{open('dinner')}")
                .label 夜
                .menu-body
                    .menu-main
                        .main-dinner
                            span.main-a {today.dinner.a}
                            span.main-b {today.dinner.b}
                    .menu-side
                        ul
                            li(each="{item in today.dinner.side}") {item}

    script(type="es6").
        this.today = {
            breakfast: {
                wes: 'ロールパン',
                jap: null,
                side: ['キャベツサラダ', 'スープ', '牛乳']
            },
            lunch: {
                main: '叉焼炒飯',
                side: ['かぼちゃのコロッケ', '味噌汁']
            },
            dinner: {
                a: '和風ごまハンバーグ',
                b: '白身魚のグリル　野菜たっぷりトマトソース',
                side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
            }
        }

        this.init = 'breakfast';
        this.isOpen = this.init;

        const lineHeight = 30;

        this.on('mount', () => {
            // 高さを付与
            const $parent = document.getElementsByClassName(`dailyMenuInit`)[0];
            const $elem = $parent.getElementsByClassName('menu-side');
            const len = this.today[this.init].side.length;
            $elem[0].style.height = `${len * lineHeight}px`;
            console.log('happen')
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
                    align-items center
                    padding 8px 55px 8px 20px
                    transition all .6s ease
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
                            font-size 20px
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
                                            width 20px
                                            height 20px
                                            margin-right .4em
                                            line-height 20px
                                            font-size 16px
                                            background #333
                                            color #eee
                                            transform translateY(-2px)
                                    &.main-a
                                        &::before
                                            content 'A'
                                    &.main-b
                                        &::before
                                            content 'B'
                        .menu-side
                            overflow hidden
                            height 0
                            transition height .3s 
                            li
                                font-size 16px
                                line-height 30px
                                text-align center
                    &.open
                        background rgba(#fff, .8)
                        .menu-body
                            .menu-side
                                transition height .4s .3s ease