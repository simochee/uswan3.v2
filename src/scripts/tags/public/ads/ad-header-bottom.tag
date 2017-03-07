ad-header-bottom
    div(onload="{drawAd}")
        | hello

    script(type="es6").
        this.on('mount', () => {
            const elem = '<script src="http://js.medi-8.net/t/124/754/a1124754.js" />';
            this.root.innerHTML = elem;
        });