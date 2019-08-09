var result1 = `/*
    * 你好，我是xxx
    * 我将以动画的形式来介绍我自己
    * 只用文字介绍太单调了
    * 我就用代码来介绍吧
    * 首先准备一些样式
*/

*{
    transition: all 1s;
}
html{
    font-size:16px;
}
#code{
    padding: 16px;
    background: rgba(255, 255, 255, 0.7);
    color: #000;
}

/* 我需要一点代码高亮 */

.token.selector {
    color: #690;
}

.token.property {
    color: #905;
}

.token.function {
    color: #DD4A68;
}

/* 加点动画效果 */

.bg {
    animation:slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom:0;
    left:-50%;
    opacity:.5;
    position:fixed;
    right:-50%;
    top:0;
    z-index:-1;
}

.bg2 {
    animation-direction:alternate-reverse;
    animation-duration:4s;
}

.bg3 {
    animation-duration:5s;
}

/* 
    * 不玩了，我来介绍一下我自己吧
    * 我需要一张白纸
*/

#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

#paper > .content{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: white;
    border: 5px dashed #ddd;
}
`

var md = `
# 自我介绍
我叫XZX
1998年3月出生
毕业于XXXX大学
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉JavaScript CSS

# 项目介绍
    1. XXX轮播
    2. XXX简历
    3. XXX画板

# 联系方式
    - QQ：XXXXXXXXX
    - Email：XXXX@xxx.com
    - 手机：1XX-XXXX-XXXX
`

var result2 = `
/* 接下来把Markdown变成HTML - marked.js */

`

var result3 =`
/* 这就是我的会动的简历，谢谢观看 */
`

writeCode('', result1, ()=>{
    createPaper(()=>{
        writeMarkdown(md, ()=>{
            writeCode(result1, result2, ()=>{
                convertMarkdownToHtml(()=>{
                    writeCode(result1 + result2, result3, ()=>{})
                })
            })
        })
    })
})

// 把code写到#code和style标签里
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 20)
}

function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function convertMarkdownToHtml(fn) {
    var pre = document.createElement('pre')
    pre.className = 'content'
    pre.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(pre)
    fn.call()
}