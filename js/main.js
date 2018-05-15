var css1 = ` /*
  * 面试官你好，我是XXX
  * 只用文字作做我介绍太单调了
  * 我就用代码来介绍吧
  * 首先准备一些样式
  */

  /* 首先给所有元素加上过渡效果 */
  *{
    transition: all 1s;
  }

  /* 白色背景太单调了，来点背景 */
  html{
    background: rgb(0, 43, 54);
    font-size: 16px;
  }

  /* 文字离边框太近了 */
  #code{
    color: rgb(222, 222, 222);
    border: 1px solid #aaa;
    margin: 80px;
    padding: 16px;
  }

  /* 我需要一点代码高亮 */
  .token.comment{
    color: slategray;
  }
  .token.selector{
    color: #690;
  }
  .token.property{
    color: #905;
  }
  .token.function{
    color: #DD4A68;
  }

  /* 加点 3D 效果呗 */
  #code{
    transform: perspective(1000px) rotateY(10deg);
  }

  /* 不玩了，我来介绍一下我自己吧 */
  /* 我需要一张白纸 */

`
var css2 = `
  /* 于是我就可以在白纸上写字了，请看右边 */

`
var css3 = `
  /* 接下来用一个优秀的库 marked.js
   * 把 Markdown 变成 HTML
   */



`
var css4 = `
  /*
   * 这就是我的会动的简历
   * 谢谢观看
   */
`

var md = `
# 自我介绍

我叫 王涛，
1993 年 9 月出生，
南京师范大学毕业，
自学前端大半年，
希望应聘前端开发岗位

# 技能介绍

- 熟悉 JavaScript CSS，
- 熟悉 Jquery，
- 熟悉 http，
- 了解node.js,vue.js


# 项目介绍

1. [无缝轮播](https://haishancheng.github.io/carousel/carousel.html)
2. [在线简历](https://haishancheng.github.io/myResume/myResume.html)
3. [画板](https://haishancheng.github.io/canvas/canvas.html)
4. [导航网站](https://haishancheng.github.io/myNavigation/myNavigation.html)

# 联系方式

- QQ 772142343
- Email 772142343@qq.com
- 手机 15720623006

# 工作经历
南京富士通南大技术有限公司

# 链接
- [GitHub](https://github.com/haishancheng)
- [我的文章](https://www.jianshu.com/u/e2aa5047e2ee)
`
writeCss('', css1, () => {
  createPaper(() => {
    writeCss(css1, css2, () =>{
      writeMarkDown(md , () => {
        writeCss(css1 + css2, css3, () => {
          markdownToHtml(() => {
            writeCss(css1 + css2 + css3, css4)
          })
        })
      })
    })
  })
})

function writeCss(prefix, str, fn) {
  var n = 0
  var code = document.getElementById('code')
  var codeStyle = document.getElementById('codeStyle')
  var id = setInterval(function () {
    n++
    code.innerHTML = prefix + str.substring(0, n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    codeStyle.innerHTML = prefix + str.substring(0, n)
    code.scrollTop = code.scrollHeight
    if (n >= str.length) {
      clearInterval(id)
      fn && fn.call()
    }
  }, 65)
}
function writeMarkDown(markdown, fn){
  var n = 0
  var paper = document.querySelector('#paper .content')
  var id = setInterval(function () {
    n++
    paper.innerHTML = markdown.substring(0, n)
    paper.scrollTop = paper.scrollHeight
    if (n >= markdown.length) {
      clearInterval(id)
      fn && fn.call()
    }
  }, 30)
}


function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function markdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}