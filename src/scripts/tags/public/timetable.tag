timetable
    .coming-soon
        .large ３月末実装予定！
        .small coming soon...
    //- .timetable-wrapper
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
            .main
                ul.body(class="active{idx}")
                    li
                        .body-item
                            .time 1-2
                            .subject
                                .title *
                        .body-item
                            .time 3-4
                            .subject
                                .title 通信
                                .teacher 三宅
                                .place HR
                        .body-item
                            .time 5-6
                            .subject.small
                                .title 特講
                                .teacher 
                                .place /////
                            .subject.small
                                .title *
                        .body-item
                            .time 7-8
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
                            .time 1-2
                            .subject
                                .title *
                        .body-item
                            .time 3-4
                            .subject
                                .title 通信
                                .teacher 三宅
                                .place HR
                        .body-item
                            .time 5-6
                            .subject.small
                                .title 特講
                                .teacher 
                                .place /////
                            .subject.small
                                .title *
                        .body-item
                            .time 7-8
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
                            .time 1-2
                            .subject
                                .title *
                        .body-item
                            .time 3-4
                            .subject
                                .title 通信
                                .teacher 三宅
                                .place HR
                        .body-item
                            .time 5-6
                            .subject.small
                                .title 特講
                                .teacher 
                                .place /////
                            .subject.small
                                .title *
                        .body-item
                            .time 7-8
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
                            .time 1-2
                            .subject
                                .title *
                        .body-item
                            .time 3-4
                            .subject
                                .title 通信
                                .teacher 三宅
                                .place HR
                        .body-item
                            .time 5-6
                            .subject.small
                                .title 特講
                                .teacher 
                                .place /////
                            .subject.small
                                .title *
                        .body-item
                            .time 7-8
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
                            .time 1-2
                            .subject
                                .title *
                        .body-item
                            .time 3-4
                            .subject
                                .title 通信
                                .teacher 三宅
                                .place HR
                        .body-item
                            .time 5-6
                            .subject.small
                                .title 特講
                                .teacher 
                                .place /////
                            .subject.small
                                .title *
                        .body-item
                            .time 7-8
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
        .coming-soon
            position absolute
            top 50%
            left 50%
            width 300px
            height 100px
            margin -72.5px -150px 0
            text-align center
            color rgba(#333, .8)
            text-shadow 2px 2px 2px rgba(#000, .07), 2px 3px 1px rgba(#000, .1), 2px 1px 5px rgba(#000, .06)
            z-index 1
            transform rotate(8deg)
            .large
                line-height 70px
                font-weight bold
                font-size 30px
            .small
                line-height 30px
                font-size 20px
        .timetable-wrapper
            position absolute
            top 0
            left 0
            bottom 55px
            right 0
            opacity .5
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
                                width 40px
                                height 40px
                                text-align center
                                color rgba(#111, .7)
                                .ja
                                    font-size 18px
                                    line-height 25px
                                .en
                                    font-size 11px
                                    line-height 15px
                .main
                    position absolute
                    top 61px
                    left 0
                    bottom 0
                    right 0
                    overflow hidden
                    .body
                        position absolute
                        left 0
                        width 100%
                        height 500%
                        transition top .5s ease
                        $size = 100%
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
                            display flex
                            flex-direction column
                            width 100%
                            height 20%
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