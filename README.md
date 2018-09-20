# clver-wechat-bot


```shell
# 用docker
yarn install
docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty ./src/mybot.js
# 没有docker
yarn install
node ./src/mybot.js
# 然后微信扫描terminal中的二维码登录
```