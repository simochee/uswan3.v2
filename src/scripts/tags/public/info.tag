info
    h1
        span.ja おしらせ
        span.en Information
    
    ol.info
        li.article
            h2 アップデート@20170228
            main
                .date 2017.02.28
                p デジタル版 白鳥寮献立表を大幅アップデートしました！
                p 主な変更箇所は以下のとおりです。
                ul
                    li サイトデザイン・システムを一新
                    li サイトのURLを変更
                    li 献立検索を追加
                    li 時間割を追加
                    li フィードバックのフォームを追加
                p この度のアップデートでURLが
                    br
                    | [旧] 
                    a(href="http://uswan2.web.fc2.com" target="_blank") http://uswan2.web.fc2.com
                    br
                    | から
                    br
                    | [新] 
                    a(href="http://uswan.simo.website" target="_blank") http://uswan.simo.website
                    br
                    | へ変更となりました。
                    p ブックマークしている方は新アドレスへ変更をお願いします。
                    

    style(type='stylus').
        h1
            margin 20px 15px 30px 15px
            .ja
                font-size 26px
            .en
                margin-left 8px
                color rgba(#000, .8)
                font-size 15px
        .info
            .article
                margin 0 10px 30px
                box-shadow 0 2px 2px 0 rgba(#000, .14), 0 3px 1px -2px rgba(#000, .2), 0 1px 5px 0 rgba(#000, .12)
                background rgba(#fff, .1)
                h2
                    margin 0 10px
                    padding 12px 6px
                    border-bottom 1px solid rgba(#555, .2)
                    font-size 14px
                    color rgba(#000, .8)
                main
                    padding 5px 25px 10px 25px
                    .date
                        margin 6px 0
                        font-size 10px
                        text-align right
                        color rgba(#000, .7)
                    p
                        margin-bottom 5px
                        font-size 13px
                        line-height 20px
                        color #222
                    ul
                        list-style-type disc
                        margin 8px 10px 8px 25px
                        li
                            margin 4px 0
                            font-size 12px
                    a
                        color #000
                        &:hover
                            text-decoration none