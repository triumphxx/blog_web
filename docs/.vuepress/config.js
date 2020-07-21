module.exports = {
    title: '北漂码农有话说',
    description: '欢迎来到我的博客',
    head: [
        ['link', {rel: 'icon', href: 'http://cdn.triumphxx.com.cn/img/%E5%85%AC%E4%BC%97%E5%8F%B71.jpeg'}],
        [
            "script",
            {}, `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?3dc907d6a99cfe1f7450b2092ff744e1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
      `
        ]
    ],

    themeConfig: {
        logo: 'http://cdn.triumphxx.com.cn/img/%E5%85%AC%E4%BC%97%E5%8F%B71.jpeg',
        nav: [
            {text: '首页', link: '/'},
            {text: 'Java', link: '/java/'},
            {text: '前端', link: '/web/'},
            {text: 'GitHub', link: 'https://github.com/triumphxx'}
        ],
        sidebar: {
            '/java/': [
                '',
                'java1',
                'java2'
            ],

            '/web/': [
                '',
                'web',
            ]
        }
    }
}