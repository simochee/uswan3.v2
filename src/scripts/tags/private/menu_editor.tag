menu-editor
    h1 {this.year}年{this.month}月

    form.form-group(onsubmit="{submit}")

        virtual(each="{day in days}")
            table.table(class="{week(day).toLowerCase()}")
                tbody
                    tr
                        th(rowspan="3")
                            label
                                .date {day + 1}
                                .week {week(day)}
                                .draft
                                    input(type="checkbox")
                        td
                            table.table-form
                                tbody
                                    tr
                                        td
                                            input.table-input(type="text" placeholder="和食" value="{data[format(day)] && data[format(day)].breakfast.jap}")
                                        td
                                            input.table-input(type="text" placeholder="洋食" value="{data[format(day)] && data[format(day)].breakfast.wes}")
                                    tr
                                        td(colspan="2")
                                            textarea.table-input(placeholder="サイドメニュー" rows="5" value="{data[format(day)] && side(data[format(day)].breakfast.side)}")
                    tr
                        td
                            table.table-form
                                tbody
                                    tr
                                        td
                                            input.table-input(type="text" placeholder="メインメニュー" value="{data[format(day)] && data[format(day)].lunch.main}")
                                    tr
                                        td
                                            textarea.table-input(placeholder="サイドメニュー" rows="5" value="{data[format(day)] && side(data[format(day)].lunch.side)}")
                    tr
                        td
                            table.table-form
                                tbody
                                    tr
                                        td
                                            input.table-input(type="text" placeholder="A" value="{data[format(day)] && data[format(day)].dinner.a}")
                                    tr
                                        td
                                            input.table-input(type="text" placeholder="B" value="{data[format(day)] && data[format(day)].dinner.b}")
                                    tr
                                        td
                                            textarea.table-input(placeholder="サイドメニュー" rows="5" value="{data[format(day)] && side(data[format(day)].dinner.side)}")
        
        .form-btn
            button.btn.btn-success.btn-xs(type="button")
                span.glyphicon.glyphicon-eye-open
            button.btn.btn-primary.btn-lg.btn-block(type="submit") 保存

    script(type="es6").
        const moment = require('moment');
        const api = require('../../private/api');
    
        this.year = opts.year;
        this.month = opts.month;

        this.len = moment([this.year, this.month - 1]).daysInMonth();
        this.days = Array.apply(null, {length: this.len}).map(Number.call, Number);

        this.week = (date) => {
            const day = moment([this.year, this.month - 1, date + 1]).format('ddd');
            return day;
        }

        this.format = (date) => {
            return moment([this.year, this.month - 1, date + 1]).format('YYYY-MM-DD');
        }

        const genSide = (input) => {
            return input.replace(/\n\n|\n$/g, '\n').split('\n');
        }

        this.data = {};
        api.getMenu(this.year, this.month).then((data) => {
            this.data = {};
            console.log(data)
            data.forEach((item) => {
                this.data[item.date] = item;
            });
            this.update();
        });

        this.side = (data) => {
            return data.join('\n');
        }
    
        this.submit = (e) => {
            e.preventDefault();
            for(let i = 0; i < this.date * 9; i += 9) {
                const tmp = {
                    breakfast: {
                        jap: e.target[i].value,
                        wes: e.target[i + 1].value,
                        side: genSide(e.target[i + 2].value)
                    },
                    lunch: {
                        main: e.target[i + 3].value,
                        side: genSide(e.target[i + 3].value)
                    },
                }
                console.log(tmp)
            }
        }

    style(type="stylus").
        .table
            margin-bottom 0
            &.mon,
            &.wed,
            &.fri
                background rgba(#eee, .4)
            &.sat
                background rgba(#c6c6ff, .4)
            &.sun
                background rgba(#ffc6c6, .4)
        .table-form
            width 100%
            tr
                &:not(:first-child)
                    td
                        border-top 1px solid  #eee
                td
                    &:not(:first-child)
                        border-left 1px solid  #eee
                    .table-input
                        display block
                        width 100%
                        padding 6px 12px
                        line-height 1.5
                        color #555
                        background-color transparent
                        border transparent
                        outline none
                        &input
                            height 34px
        .form-btn
            margin 15px 0
            text-align center
            .btn
                margin 6px 0