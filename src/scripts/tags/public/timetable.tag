timetable
    .week-controller(class="active{idx}")
        .controller-item(onclick="{show(0)}") 月
        .controller-item(onclick="{show(1)}") 火
        .controller-item(onclick="{show(2)}") 水
        .controller-item(onclick="{show(3)}") 木
        .controller-item(onclick="{show(4)}") 金
    .timetable
        .main
            ul.body(class="active{idx}")
                li
                    .body-item
                        .subject
                            .title *
                    .body-item
                        .subject
                            .title 通信
                            .teacher 三宅
                            .place HR
                    .body-item
                        .subject.small
                            .title 特講
                            .teacher 
                            .place /////
                        .subject.small
                            .title *
                    .body-item
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                li
                    .body-item
                        .subject
                            .title *
                    .body-item
                        .subject
                            .title 通信
                            .teacher 三宅
                            .place HR
                    .body-item
                        .subject.small
                            .title 特講
                            .teacher 
                            .place /////
                        .subject.small
                            .title *
                    .body-item
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                li
                    .body-item
                        .subject
                            .title *
                    .body-item
                        .subject
                            .title 通信
                            .teacher 三宅
                            .place HR
                    .body-item
                        .subject.small
                            .title 特講
                            .teacher 
                            .place /////
                        .subject.small
                            .title *
                    .body-item
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                li
                    .body-item
                        .subject
                            .title *
                    .body-item
                        .subject
                            .title 通信
                            .teacher 三宅
                            .place HR
                    .body-item
                        .subject.small
                            .title 特講
                            .teacher 
                            .place /////
                        .subject.small
                            .title *
                    .body-item
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                li
                    .body-item
                        .subject
                            .title *
                    .body-item
                        .subject
                            .title 通信
                            .teacher 三宅
                            .place HR
                    .body-item
                        .subject.small
                            .title 特講
                            .teacher 
                            .place /////
                        .subject.small
                            .title *
                    .body-item
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR
                        .subject
                            .title 応物Ⅱ
                            .teacher 増山
                            .place HR

    script(type="es6").
        this.idx = 0;
    
        this.show = (idx) => {
            return (e) => {
                this.idx = idx;
            }
        }    

    style(type="stylus").
            .week-controller
                $size = 60px
                position absolute
                top 0
                left 0
                display flex
                width 100%
                height $size
                color rgba(#000, .6)
                transition color .5s ease
                &::before
                    content ''
                    position absolute
                    right 0
                    width 20%
                    height $size
                    background rgba(#fff, .3)
                    box-shadow 0 2px 2px 0 rgba(#000, .07), 0 3px 1px -2px rgba(#000, .1), 0 1px 5px 0 rgba(#000, .06)
                    box-sizing border-box
                    z-index -1
                    transition left .5s ease
                &.active0
                    .controller-item:nth-child(1)
                        color rgba(#000, .9)
                    &::before
                        left 0
                &.active1
                    .controller-item:nth-child(2)
                        color rgba(#000, .9)
                    &::before
                        left 20%
                &.active2
                    .controller-item:nth-child(3)
                        color rgba(#000, .9)
                    &::before
                        left 40%
                &.active3
                    .controller-item:nth-child(4)
                        color rgba(#000, .9)
                    &::before
                        left 60%
                &.active4
                    .controller-item:nth-child(5)
                        color rgba(#000, .9)
                    &::before
                        left 80%
                .controller-item
                    flex 1
                    height $size
                    text-align center
                    line-height $size
            .timetable
                position absolute
                top 70px
                left 10px
                bottom 80px
                right 10px
                background rgba(#fff, .3)
                box-shadow 0 2px 2px 0 rgba(#000, .07), 0 3px 1px -2px rgba(#000, .1), 0 1px 5px 0 rgba(#000, .06)
                .main
                    position absolute
                    top 0
                    left 0
                    bottom 0
                    right 0
                    overflow hidden
                    .body
                        position absolute
                        left 0
                        display flex
                        width 500%
                        height 100%
                        transition left .5s ease
                        $size = 100%
                        &.active0
                            left 0
                        &.active1
                            left -100%
                        &.active2
                            left -200%
                        &.active3
                            left -300%
                        &.active4
                            left -400%
                        li
                            display flex
                            flex-direction column
                            width 100%
                            height 100%
                            .body-item
                                flex 1
                                display flex
                                align-items stretch
                                margin 0 20px
                                border-bottom 1px solid rgba(#555, .2)
                                .time
                                    width 30px
                                    margin 10px 0
                                    border-right 1px solid rgba(#555, .15)
                                .subject
                                    flex 1
                                    display flex
                                    flex-direction column
                                    align-items center
                                    justify-content center
                                    text-align center
                                    &.small
                                        float left
                                        width 50%
                                    .title
                                        height 30px
                                        line-height 30px
                                        font-size 20px
                                    .teacher
                                        height 16px
                                        line-height 16px
                                        font-size 11px
                                    .place
                                        height 16px
                                        line-height 16px
                                        font-size 12px