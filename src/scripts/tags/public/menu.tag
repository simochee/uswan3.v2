menu
    .daily-menu
        .header 今日の献立
        .main
            input.visibility-input#dailyMenuBreakfast(type="radio" name="dailyMenu" checked)
            label.menu-item(for="dailyMenuBreakfast")
                .label 朝
            input.visibility-input#dailyMenuLunch(type="radio" name="dailyMenu")
            label.menu-item(for="dailyMenuLunch")
                .label 昼
            input.visibility-input#dailyMenuDinner(type="radio" name="dailyMenu")
            label.menu-item(for="dailyMenuDinner")
                .label 夜


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
                .visibility-input
                    display none
                    &:checked + .menu-item
                        background rgba(#fff, .8)
                .menu-item
                    display block
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