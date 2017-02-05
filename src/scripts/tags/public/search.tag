search
    .search-box
        .header 検索
        .main
            form.input-area(onsubmit="{search}")
                input.input(type="text" placeholder="検索ワード" onfocus="{hideNavbar}" onblur="{showNavbar}")
                button.submit(type="submit") 検索
            p.help-block 直近１ヶ月の献立から検索します

    .ad.ad-sm.ad-header
        img(src="https://placehold.jp/320x50.png")
    
    .result-no-keyword(show="{results == null}") 検索ワードを指定してください
    .result-empty(show="{results != null && results.length == 0}") ヒットする献立がありません
    .results
        virtual(each="{item in results}")
            menu-item(data="{item}" open="{true}")
    
    script(type="es6").
        const api = require('../../public/api');
        const u = require('../../utils');
        const obs = u.observable();

        this.search = (e) => {
            e.preventDefault();
            const value = e.target[0].value;
            console.log(value)
            api.search(value, null, null).then((results) => {
                console.log(results);
            }).catch((e) => {

            });
        }
    
        this.hideNavbar = () => {
            obs.trigger('navbar:hide');
        }
        this.showNavbar = () => {
            obs.trigger('navbar:show');
        }
    
    style(type="stylus").
        .search-box
            margin 10px
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
                    .input
                        flex 1
                        padding 0 12px
                        border 1px solid rgba(#ccc, .5)
                        background rgba(#fff, .3)
                        line-height 30px
                    .submit
                        width 60px
                        background rgba(#ccc, .5)
                        color rgba(#000, .8)
                        font-size 12px
                        letter-spacing .5em
                        text-indent .5em
                .help-block
                    font-size 10px
                    line-height 20px
                    text-align center
                    color rgba(#333, .7)
        .result-no-keyword
            margin 100px 0 0 0
            font-size 16px
            text-align center
            color rgba(#000, .6)
            