module.exports = {
    title: '北漂码农有话说',
    description: '欢迎来到我的博客',
    head: [
        ['link', {rel: 'icon', href: 'http://cdn.triumphxx.com.cn/img/%E5%85%AC%E4%BC%97%E5%8F%B71.jpeg'}],
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