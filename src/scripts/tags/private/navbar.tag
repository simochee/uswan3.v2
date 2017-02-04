navbar
    nv.navbar.navbar-default
        .container-fluid
            .navbar-header
                button.navbar-toggle.collapsed(type="button" data-toggle="collapse" data-target="#navbar")
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                a.navbar-brand(href="#/") myAdmin for 白鳥寮献立表
            .collapse.navbar-collapse#navbar
                ul.nav.navbar-nav
                    li: a(href="http://uswan.simo.website" target="_blank") ページをみる
                    li: a(href="#/menu") 献立
                    li: a(href="#/twitter") Twitter