timetable
    .timetable-wrapper
        .week-controller(class="active{idx}")
            .controller-item(onclick="{show(0)}") 月
            .controller-item(onclick="{show(1)}") 火
            .controller-item(onclick="{show(2)}") 水
            .controller-item(onclick="{show(3)}") 木
            .controller-item(onclick="{show(4)}") 金
        .timetable
            .header
                .week
                    ul(class="active{idx}")
                        li
                            .ja 月
                            .en Mon.
                        li 
                            .ja 火
                            .en Tue.
                        li
                            .ja 水
                            .en Wed.
                        li
                            .ja 木
                            .en Thu.
                        li
                            .ja 金
                            .en Fri.

    
    script(type="es6").
        this.idx = 0;
    
        this.show = (idx) => {
            return (e) => {
                this.idx = idx;
            }
        }    

    style(type="stylus").
        .timetable-wrapper
            position absolute
            top 0
            left 0
            bottom 55px
            right 0
            .week-controller
                $size = 60px
                position absolute
                top 50%
                left 0
                margin-top -($size * 2.5)
                &::before
                    content ''
                    position absolute
                    right 0
                    width 110px
                    height $size
                    background rgba(#fff, .3)
                    box-shadow 0 2px 2px 0 rgba(#000, .07), 0 3px 1px -2px rgba(#000, .1), 0 1px 5px 0 rgba(#000, .06)
                    box-sizing border-box
                    z-index -1
                    transition top .5s ease
                &.active0
                    &::before
                        top 0
                &.active1
                    &::before
                        top ($size * 1)
                &.active2
                    &::before
                        top ($size * 2)
                &.active3
                    &::before
                        top ($size * 3)
                &.active4
                    &::before
                        top ($size * 4)
                .controller-item
                    width 110px
                    height $size
                    text-align center
                    line-height $size
            .timetable
                position absolute
                top 10px
                left 120px
                bottom 65px
                right 10px
                background rgba(#fff, .3)
                box-shadow 0 2px 2px 0 rgba(#000, .07), 0 3px 1px -2px rgba(#000, .1), 0 1px 5px 0 rgba(#000, .06)
                .header
                    margin 0 10px
                    border-bottom 1px solid rgba(#333, .2)
                    .week
                        overflow hidden
                        position relative
                        width 40px
                        height 40px
                        margin 10px auto
                        & > ul
                            $size = 40px
                            position absolute
                            left 0
                            transition top .5s ease
                            &.active0
                                top 0
                            &.active1
                                top -($size * 1)
                            &.active2
                                top -($size * 2)
                            &.active3
                                top -($size * 3)
                            &.active4
                                top -($size * 4)
                            li
                                text-align center
                                color rgba(#111, .7)
                                .ja
                                    font-size 18px
                                    line-height 25px
                                .en
                                    font-size 11px
                                    line-height 15px