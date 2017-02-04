twitter

    h2 Twitter BOT
    
    .row
        .col-xs-3 Status : 
        .col-xs-3
            div(show="{statuses.bot == 'active'}") 動作
            div(show="{statuses.bot == 'stop'}") 停止
        .col-xs-3
            div(show="{statuses.bot == 'active'}")
                button.btn.btn-danger.btn-sm(type="button" onclick="{updateBotStatus('stop')}") 停止
            div(show="{statuses.bot == 'stop'}")
                button.btn.btn-success.btn-sm(type="button") 起動
        .col-xs-3
            div(show="{loading.bot}") Wait
    

    script(type="es6").

        this.statuses = {
            bot: 'active'
        }

        this.loading = {
            bot: false
        }

        this.updateBotStatus = (type) => {
            return (e) => {
                e.preventDefault();
                if(type === 'stop') {
                    this.loading.bot = true;
                    setTimeout(() => {
                        this.loading.bot = false;
                        this.statuses.bot = 'stop';
                        this.update();
                    }, 1200);
                }
            }
        }