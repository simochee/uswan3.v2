menu-item

    .menu-item
        .date
            .wrapper
                .day 14
                .week Sun
        .menu

    style(type="stylus").
        .menu-item
            display flex

            height 200px
            margin 0 10px 30px
            box-shadow 0 2px 2px 0 rgba(#000, .14), 0 3px 1px -2px rgba(#000, .2), 0 1px 5px 0 rgba(#000, .12)
            background rgba(#fff, .1)
            .date
                position relative
                width 40px
                margin 8px 0
                border-right 1px solid rgba(#aaa, .3)
                .wrapper
                    position absolute
                    top 50%
                    left 50%
                    width 40px
                    height 40px
                    margin -20px
                    color rgba(#000, .75)
                    text-align center
                    .day   
                        line-height 28px
                        font-size 15px
                    .week
                        line-height 12px
                        font-size 10px