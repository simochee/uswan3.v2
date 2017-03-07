menu
    button.btn.btn-primary.btn-block(type="button" data-toggle="modal" data-target="#add")
        span.glyphicon.glyphicon-plus
        |  追加
    
    .row
        .col-xs-6
            table.table.table-striped
                thead
                    tr
                        th(colspan="4") 2016
                tbody
                    tr
                        th 11
                        td 
                            a(href="#" onclick="return false" data-toggle="modal" data-target="#toggle")
                                span.glyphicon.glyphicon-eye-open
                        td
                            a(href="#/menu/editor/2016/11")
                                span.glyphicon.glyphicon-pencil
                        td 
                            a(href="#" onclick="return false" data-toggle="modal" data-target="#remove")
                                span.glyphicon.glyphicon-trash
                    tr
                        th 12
                        td 
                            a(href="#" onclick="return false" data-toggle="modal" data-target="#toggle")
                                span.glyphicon.glyphicon-eye-open
                        td
                            a(href="#/menu/editor/2016/12")
                                span.glyphicon.glyphicon-pencil
                        td 
                            a(href="#" onclick="return false" data-toggle="modal" data-target="#remove")
                                span.glyphicon.glyphicon-trash
    
    .modal.fade#add
        .modal-dialog
            .modal-content
                form(onsubmit="{add}")
                    .modal-header
                        h4.modal-title 月を追加
                    .modal-body
                        .form-group
                            input.form-control.input-lg(type="month")
                    .modal-footer
                        button.btn.btn-primary(type="submit") 作成
                        button.btn.btn-default(type="button" data-dismiss="modal") キャンセル
    
    .modal.fade#toggle
        .modal-dialog
            .modal-content
                form(onsubmit="return false")
                    .modal-header
                        h4.modal-title 月を隠す
                    .modal-body
                        | 2016年2月の献立を非表示に設定します
                    .modal-footer
                        button.btn.btn-warning(type="submit") OK
                        button.btn.btn-default(type="button" data-dismiss="modal") キャンセル
                        
    .modal.fade#remove
        .modal-dialog
            .modal-content
                form(onsubmit="return false")
                    .modal-header
                        h4.modal-title 月を削除
                    .modal-body
                        | 2016年2月の献立を削除します（この操作は取り消せません）
                    .modal-footer
                        button.btn.btn-danger(type="submit") 削除
                        button.btn.btn-default(type="button" data-dismiss="modal") キャンセル
    .alert.alert-success.alert-dismissible.fade.in(role="alert")
        button.close(type="button" data-dismiss="alert")
            span(aria-hidden="true") x
        | 2016年2月の献立を非表示にしました
                        
    script(type="es6").
        const api = require('../../private/api');
    
        this.add = (e) => {
            e.preventDefault();
            const input = e.target[0].value.split('-');
            const year = input[0];
            const month = input[1];
            api.archive.add(year, month, 1).then(() => {
                location.hash = `#/menu/editor/${year}/${month}/${1}`;
            });
        }