##!/usr/bin/env sh
## 确保脚本抛出遇到的错误
#set -e
#
## 生成静态文件
#npm run build
#
## 进入生成的文件夹
#cd docs/.vuepress/dist
#
## 如果是发布到自定义域名
#echo 'github.blog.triumphxx.com.cn' > CNAME
#
#git init
#git add -A
#git commit -m '博客更新发布'
#
#git push -f https://github.com/triumphxx/triumphxx.github.io master
#
#cd -
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'blogs.triumphxx.com.cn' > CNAME


git init
git config user.name "triumphxx"
git config user.email "triumphxx@163.com"
git add -A
git commit -m 'deploy-coding'


git push -f git@TriumphxxBlob:triumphxx/blogs/blogs.git master
cd -