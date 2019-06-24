// import _ from  'lodash'
//
// var element = document.createElement('div');
// element.innerHTML = _.join(['leon','aries'],'-');
// document.body.appendChild(element);


// function getComponent() {
//     return import(/*webpackChunkName:'lodash'*/'lodash').then(({default:_}) =>{
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['leon','aries'],'-');
//         return element;
//     })
// }

async function getComponent() {
    const { default : _ } = await import(/*webpackChunkName:'lodash'*/'lodash');
    const element = document.createElement('div');
    element.innerHTML = _.join(['leon','aries'],'-');
    return element;
}

document.addEventListener('click', () =>{
    getComponent().then(element => {
        document.body.appendChild(element)
    });
});




//代码分割，和webpack无关
//webpack中实现代码分割，两种方式
//1.同步加载代码：只需要在webpack.base.conf.js中配置 optimization的配置即可
//2.异步加载代码（import)：异步代码，无需做任何配置，会自动进行代码分割