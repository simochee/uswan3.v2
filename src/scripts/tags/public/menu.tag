menu

    daily-menu

    h2
        span.ja ２月
        span.en February

    menu-item(data="{data[0]}")
    menu-item(data="{data[1]}")
    menu-item(data="{data[2]}")

    script(type="es6").
        this.data = [
            {
                date: '2017-02-05',
                breakfast: {
                    wes: 'ロールパン',
                    jap: null,
                    side: ['ソーセージとキャベツのフレンチサラダ', 'キャベツサラダ', 'スープ', '牛乳']
                },
                lunch: {
                    main: '叉焼炒飯',
                    side: ['かぼちゃのコロッケ', '味噌汁']
                },
                dinner: {
                    a: '和風ごまハンバーグ',
                    b: 'ハンバーグデミグラスソースと海老フライ',
                    side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
                }
            },
            {
                date: '2017-02-06',
                breakfast: {
                    wes: 'ロールパン',
                    jap: null,
                    side: ['ソーセージとキャベツのフレンチサラダ', 'キャベツサラダ', 'スープ', '牛乳']
                },
                lunch: {
                    main: '叉焼炒飯',
                    side: ['かぼちゃのコロッケ', '味噌汁']
                },
                dinner: {
                    a: '和風ごまハンバーグ',
                    b: 'ハンバーグデミグラスソースと海老フライ',
                    side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
                }
            },
            {
                date: '2017-02-07',
                breakfast: {
                    wes: 'ロールパン',
                    jap: null,
                    side: ['ソーセージとキャベツのフレンチサラダ', 'キャベツサラダ', 'スープ', '牛乳']
                },
                lunch: {
                    main: '叉焼炒飯',
                    side: ['かぼちゃのコロッケ', '味噌汁']
                },
                dinner: {
                    a: '和風ごまハンバーグ',
                    b: 'ハンバーグデミグラスソースと海老フライ',
                    side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
                }
            }
        ]

    style(type="stylus").
        h2
            margin 12px 10px
            .ja
                font-size 24px
            .en
                font-size 14px