timetable
    .timetable-wrapper
        .week-controller(class="active{idx}")
            .controller-item(onclick="{show(0)}") 月
            .controller-item(onclick="{show(1)}") 火
            .controller-item(onclick="{show(2)}") 水
            .controller-item(onclick="{show(3)}") 木
            .controller-item(onclick="{show(4)}") 金
    
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