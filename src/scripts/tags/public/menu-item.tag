menu-item

    .menu-item(class="{open: isOpen}" onclick="{toggle}")
        .summary
            .date
                .wrapper
                    .day 14
                    .week Sun
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
            h1 hello

    script(type="es6").
        this.isOpen = false;
        this.toggle = () => {
            this.isOpen = !this.isOpen;
        }
    
        this.data = {
            breakfast: {
                wes: 'ロールパン',
                jap: null,
                side: ['ソーセージとキャベツのフレンチサラダ', 'キャベツサラダ', 'スープ', '牛乳']
            },
            lunch: {
                main: '叉焼炒飯',
                side: ['かぼちゃのコロッケ', '味噌汁']
            },
            dinner: {
                a: '和風ごまハンバーグ',
                b: 'ハンバーグデミグラスソースと海老フライ',
                side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
            }
        }

    style(type="stylus").
        .menu-item
            overflow hidden
            position relative
            margin 0 10px 30px
            box-shadow 0 2px 2px 0 rgba(#000, .14), 0 3px 1px -2px rgba(#000, .2), 0 1px 5px 0 rgba(#000, .12)
            background rgba(#fff, .1)
            transition background .5s ease
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
            &.open
                background rgba(#fff, .5)
                .summary
                    transform translateX(100%)
                .detail
                    left 0