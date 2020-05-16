
# 确保脚本抛出遇到的错误
set -e

git add *
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push
