curfew

    .curfew-dialog(class="{wraped: isOpen, hide: !isShow}")
        .curfew-container
            p 門限を確認しましたか？

    script(type="es6").
        const u = require('../../../utils');
        const obs = u.observable();
    
        this.isOpen = false;
        
        obs.on('side-menu:toggle', () => {
            this.isOpen = !this.isOpen;
            this.update();
        });
        obs.on('side-menu:close', () => {
            this.isOpen = false;
            this.update();
        });

        this.isShow = true;
        obs.on('navbar:show', () => {
            this.isShow = true;
            this.update();
        });
        obs.on('navbar:hide', () => {
            this.isShow = false;
            this.update();
        });

    style(type="stylus").
        .curfew-dialog
            position fixed
            right 0
            bottom 55px
            left 55px
            height 55px
            padding 0 15px 0 60px
            box-sizing border-box
            background #903d67
            transition background .5s ease
            &.wraped
                background darken(#f04, 80%)
            &.hide
                visibility hidden
            .curfew-container
                p
                    text-align center
                    font-size 20px
                    color #eee
                    line-height 55px