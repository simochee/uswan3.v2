const api = require('./api');

const Store = {
    menu: [
  {
    "_id": "58965a58c6a570e78ad07faf",
    "__v": 0,
    "dinner": {
      "a": "むね肉の香り揚げ海苔風味あんかけ",
      "b": "白身魚のグリル　野菜たっぷりトマトソース",
      "side": [
        "筍の中華炒め",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "麻婆豆腐丼",
      "side": [
        "焼き餃子",
        "スープ"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "白菜のポン酢煮",
        "カリフラワーのケチャップ炒め",
        "ほうれん草とコーンのソテー",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-06"
  },
  {
    "_id": "58965a58c6a570e78ad07fb1",
    "__v": 0,
    "dinner": {
      "a": "ミックスフライ",
      "b": "揚げ出し盛り合わせ",
      "side": [
        "インゲンの胡麻マヨ和え",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "肉うどん",
      "side": [
        "竹輪天ぷら",
        "ライス"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "酒の塩焼き",
        "卵入りポテトサラダ",
        "かぼちゃとベーコンの和風煮",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-07"
  },
  {
    "_id": "58965a58c6a570e78ad07fb3",
    "__v": 0,
    "dinner": {
      "a": "若鶏のジンジャーソース",
      "b": "豚肉と大根の炒め煮",
      "side": [
        "もやしとホウレン草のカレーチャプチェ",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "ビビンバ丼",
      "side": [
        "粉ふき芋の肉味噌かけ",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-08"
  },
  {
    "_id": "58965a58c6a570e78ad07fb5",
    "__v": 0,
    "dinner": {
      "a": "中津からあげ（しょうゆ味）",
      "b": "ハンバーグデミグラスソースと海老フライ",
      "side": [
        "オクラのゴマ和え",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "味玉醤油らーめん",
      "side": [
        "シュウマイ",
        "ライス"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "コーンスクランブル",
        "刻み昆布の煮物",
        "ソーセージとキャベツのフレンチサラダ",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-09"
  },
  {
    "_id": "58965a58c6a570e78ad07fb7",
    "__v": 0,
    "dinner": {
      "a": "メンチカツとアジフライ",
      "b": "白身魚の衣揚げ　野菜カレー風味",
      "side": [
        "じゃが芋のニンニクおかか和え",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "すき焼き丼",
      "side": [
        "小松菜の胡麻和え",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-10"
  },
  {
    "_id": "58965a58c6a570e78ad07fb9",
    "__v": 0,
    "dinner": {
      "a": "八宝菜",
      "b": "チャプチェ",
      "side": [
        "ザーサイ冷奴",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "他人丼",
      "side": [
        "油揚と大根の煮付け",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "高野豆腐の卵とじ",
        "金平れんこん",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-11"
  },
  {
    "_id": "58965a58c6a570e78ad07fbb",
    "__v": 0,
    "dinner": {
      "a": "ビーフカレー",
      "b": "ハヤシライス",
      "side": [
        "キャベツサラダ"
      ]
    },
    "lunch": {
      "main": "ジャコ炒飯",
      "side": [
        "スパゲッティとキャベツのサラダ",
        "スープ"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-12"
  },
  {
    "_id": "58965a58c6a570e78ad07fbd",
    "__v": 0,
    "dinner": {
      "a": "セサミチキンソテー",
      "b": "いわしフライ",
      "side": [
        "チリコンカーン",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "豚の生姜焼き丼",
      "side": [
        "小松菜とチャーシューの炒め",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "ウインナーソテー",
        "レンコンの鳥そぼろあん",
        "ほうれん草とコーンのソテー",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-13"
  },
  {
    "_id": "58965a58c6a570e78ad07fbf",
    "__v": 0,
    "dinner": {
      "a": "鶏すき煮豆腐",
      "b": "鯖の味噌煮",
      "side": [
        "野菜とベーコンのスクランブルエッグ",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "ロールキャベツのクリーム煮込み",
      "side": [
        "イカカツ",
        "ライス",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "ミックススクランブル",
        "ほうれん草とマカロニのクリーム煮",
        "ジャーマンポテト",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-14"
  },
  {
    "_id": "58965a58c6a570e78ad07fc1",
    "__v": 0,
    "dinner": {
      "a": "とんかつ",
      "b": "チキンのチーズ焼き　トマトソース",
      "side": [
        "白菜のおひたし",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "中華丼",
      "side": [
        "竹輪とキャベツの味噌マヨ和え",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-15"
  },
  {
    "_id": "58965a58c6a570e78ad07fc3",
    "__v": 0,
    "dinner": {
      "a": "大判コロッケ",
      "b": "揚げ豆腐の肉味噌あんかけ",
      "side": [
        "きんぴらごぼう",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "カレイのフリット　野菜ピリ辛ソース",
      "side": [
        "小松菜のなめ茸おろし",
        "ライス",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "厚揚げと人参の中華炒め煮",
        "もやしの赤じそ和え",
        "納豆",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-16"
  },
  {
    "_id": "58965a59c6a570e78ad07fc5",
    "__v": 0,
    "dinner": {
      "a": "豚肉と筍の玉子炒め",
      "b": "豚肉と蓮根の味噌炒め",
      "side": [
        "切干大根とわかめの二杯酢",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "とろーり　オムライス",
      "side": [
        "キャベツサラダ",
        "スープ"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-17"
  },
  {
    "_id": "58965a59c6a570e78ad07fc7",
    "__v": 0,
    "dinner": {
      "a": "すき焼き風煮",
      "b": "肉じゃが（牛肉）",
      "side": [
        "小松菜の辛子和え",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "きつねうどん",
      "side": [
        "ひじきと大豆の煮物",
        "ライス"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "ほうれん草と玉子のソテー",
        "五目きんぴら",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-18"
  },
  {
    "_id": "58965a59c6a570e78ad07fc9",
    "__v": 0,
    "dinner": {
      "a": "鯖の塩焼き",
      "b": "秋刀魚の塩焼き",
      "side": [
        "カレー味ビーフン",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "くわい入り肉焼売の野菜あんかけ",
      "side": [
        "枝豆と春雨の中華和え",
        "ライス",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-19"
  },
  {
    "_id": "58965a59c6a570e78ad07fcb",
    "__v": 0,
    "dinner": {
      "a": "水餃子の五目あん",
      "b": "揚げ餃子の四川ソース",
      "side": [
        "蓮根と竹輪のきんぴら",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "親子丼",
      "side": [
        "小松菜のピーナッツ和え",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-20"
  },
  {
    "_id": "58965a59c6a570e78ad07fcd",
    "__v": 0,
    "dinner": {
      "a": "ポークカレー",
      "b": "ハヤシライス",
      "side": [
        "キャベツサラダ"
      ]
    },
    "lunch": {
      "main": "麻婆豆腐",
      "side": [
        "メンマともやしの中華和え",
        "ライス",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-21"
  },
  {
    "_id": "58965a59c6a570e78ad07fcf",
    "__v": 0,
    "dinner": {
      "a": "鶏天　しそ風味",
      "b": "鱈と豆腐の水炊き　ポン酢添え",
      "side": [
        "小松菜とひじきのゴマ和え",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "いか天丼",
      "side": [
        "かぼちゃのいとこ煮",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-22"
  },
  {
    "_id": "58965a59c6a570e78ad07fd1",
    "__v": 0,
    "dinner": {
      "a": "中華煮込みハンバーグ",
      "b": "さばの一口立田揚げ",
      "side": [
        "粉ふき芋の肉味噌かけ",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "黒胡麻四川坦々麺",
      "side": [
        "揚げ焼売のガーリック風味"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "絹さやと玉子のソテー",
        "マカロニサラダ",
        "かぼちゃのコロッケ",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-23"
  },
  {
    "_id": "58965a59c6a570e78ad07fd3",
    "__v": 0,
    "dinner": {
      "a": "かつ煮",
      "b": "ケイジャンチキンフリット　トマトソース",
      "side": [
        "オクラと寒天の土佐酢かけ",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "キムチチャーハン",
      "side": [
        "青菜と白菜のぽん酢がけ",
        "スープ"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-24"
  },
  {
    "_id": "58965a59c6a570e78ad07fd5",
    "__v": 0,
    "dinner": {
      "a": "チキンの味噌マヨネーズソース",
      "b": "カレイの麻婆ソース",
      "side": [
        "もやしとほうれん草のナムル",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "かき玉うどん",
      "side": [
        "がんもと野菜の煮物",
        "ライス",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "肉団子のチリソース",
        "高野豆腐煮",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-25"
  },
  {
    "_id": "58965a59c6a570e78ad07fd7",
    "__v": 0,
    "dinner": {
      "a": "ポークデミシチュー",
      "b": "チキンクリームシチュー",
      "side": [
        "ゆで玉子とキャベツのサラダ",
        "ライス大",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "ミートソース",
      "side": [
        "キャベツサラダ",
        "スープ"
      ]
    },
    "breakfast": {
      "jap": "",
      "wes": "ロールパン",
      "side": [
        "キャベツサラダ",
        "スープ",
        "牛乳"
      ]
    },
    "date": "2017-02-26"
  },
  {
    "_id": "58965a59c6a570e78ad07fd9",
    "__v": 0,
    "dinner": {
      "a": "まぐろカツ　タルタルソース",
      "b": "鶏の唐揚げ",
      "side": [
        "冷奴",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "韓国風そぼろ丼",
      "side": [
        "豚肉とレモンのみぞれ和え",
        "味噌汁"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "ウインナーソテー",
        "刻み昆布の煮物",
        "金平れんこん",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-27"
  },
  {
    "_id": "58965a59c6a570e78ad07fdb",
    "__v": 0,
    "dinner": {
      "a": "鶏肉のオーブン焼き　粒マスタードソース",
      "b": "アジフライ",
      "side": [
        "かぼちゃのそぼろあん",
        "ライス",
        "味噌汁"
      ]
    },
    "lunch": {
      "main": "長崎チャンポン",
      "side": [
        "焼き餃子",
        "ライス"
      ]
    },
    "breakfast": {
      "jap": "ライス",
      "wes": "トースト",
      "side": [
        "オニオンスクランブル",
        "鮭の塩焼き",
        "白菜のポン酢煮",
        "味噌汁",
        "牛乳"
      ]
    },
    "date": "2017-02-28"
  }
]
};

module.exports = {
    getMenu: (delay) => {
        return new Promise((resolve, reject) => {
            resolve(Store.menu);
            // if(!Store.menu) {
            //     api.getMenu(delay).then((data) => {
            //         Store.menu = data;
            //         resolve(data);
            //     }).catch((e) => {
            //         reject(e);
            //     });
            // } else {
            //     resolve(Store.menu);
            // }
        });
    }
}