# -*- coding: utf-8 -*-
# Coffeescriptの監視
guard 'coffeescript', :input => 'coffee', :output => 'dist/js', :bare => true

# SCSSの監視
guard :shell do
  # import以下が編集されたら、main.scssを更新したことにする
  watch(/^(.+\/)*.+(\.scss)$/) {
    |m|
        `mkdir -p dist/css`
		`sass --scss scss/main.scss dist/css/main.css`
        `growlnotify -m "parse scss"`
  }
end

# テンプレートファイルの監視
guard :shell do
  watch(/^(.+\/)*.+(\.html)$/) {
    |m|
    `mkdir -p dist`
    `./template -p "templates/*.html" -t "index" > dist/index.html`
    `growlnotify -m "parse templates"`
  }
end
