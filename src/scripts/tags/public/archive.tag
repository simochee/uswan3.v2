archive
    .search-box
        .header 過去の献立を表示
        .main
            form.input-area(onsubmit="return false")
                input.date-picker(type="month")
                button.submit(type="submit") 表示

    .result
        
    script(type="es6").
        const store = require('../../public/store');
        


    style(type="stylus").
        .search-box
            position fixed
            top 10px
            left 50%
            width 300px
            margin-left -150px
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
                padding-bottom 8px
                .input-area
                    display flex
                    margin 0 20px 8px
                    .date-picker
                        flex 1
                        padding 0 12px
                        border 1px solid rgba(#ccc, .5)
                        background rgba(#fff, .3)
                        line-height 30x
                    .submit
                        width 60px
                        background rgba(#ccc, .5)
                        color rgba(#000, .8)
                        font-size 12px
                        letter-spacing .5em
                        text-indent .5em