(function(){"use strict";var __webpack_modules__={1573:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3396),vue__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(7139),vue__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4870),pixi_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(7813),pixi_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_1__),_assets_js_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(8878),_assets_js_move__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3697),_assets_js_bump__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(6028);const _withScopeId=e=>((0,vue__WEBPACK_IMPORTED_MODULE_0__.dD)("data-v-09cb632e"),e=e(),(0,vue__WEBPACK_IMPORTED_MODULE_0__.Cn)(),e),_hoisted_1={class:"info-box"},_hoisted_2={class:"hp-box"},_hoisted_3={key:0,class:"start-box"},_hoisted_4=_withScopeId((()=>(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",{class:"title"},"坤坤打篮球",-1))),_hoisted_5={class:"box-content"},_hoisted_6={class:"content"},_hoisted_7={class:"score"};__webpack_exports__["Z"]=(0,vue__WEBPACK_IMPORTED_MODULE_0__.aZ)({setup(__props){let Application=pixi_js__WEBPACK_IMPORTED_MODULE_1__.Application,loader=pixi_js__WEBPACK_IMPORTED_MODULE_1__.loader,Sprite=pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite,resources=pixi_js__WEBPACK_IMPORTED_MODULE_1__.loader.resources,panelWidth=document.body.clientWidth,panelHeight=document.body.clientHeight,trackNum=20,roleWidth=100,roleHeight=150,bulletParams={createSpeed:.2,speed:10,width:12,height:12},hairParams={createSpeed:.7,hp:2,width:50,height:35,score:2},chickenParams={createSpeed:3,hp:5,width:100,height:100,score:5},lshParams={createSpeed:1,width:50,height:50,hp:2,score:2},litchiParams={createSpeed:6,width:50,height:50},enemyArr=[{type:"hair",isHit:!1,voice:"boom"},{type:"chicken",isHit:!1,voice:"crow"},{type:"lsh",isHit:!1,voice:"boom"}];function sing(){bulletParams.createSpeed=.1,setTimeout((()=>{bulletParams.createSpeed=.2}),1e3)}function jump(){cxk.anchor.x=1,cxk.scale.x*=-1}function big(){cxk.width=1.2*roleWidth,cxk.height=1.2*roleHeight,setTimeout((()=>{cxk.width=roleWidth,cxk.height=roleHeight}),1e3)}let rewardArr=[{type:"litchi",isHit:!1,voice:"reward"}];const state=(0,vue__WEBPACK_IMPORTED_MODULE_3__.qj)({status:!1,content:"",score:0,hp:100,fps:0}),hpClass=(0,vue__WEBPACK_IMPORTED_MODULE_0__.Fl)((()=>({more:state.hp>=70,middle:state.hp>30&&state.hp<70,less:state.hp<=30})));let trackWidth=Math.floor(panelWidth/trackNum),trackArr=new Array(trackNum);for(let e=0;e<trackNum;e++)trackArr[e]=trackWidth*(e+1)+25;let app=new Application({width:panelWidth,height:panelHeight,antialias:!0,transparent:!1,resolution:1,backgroundAlpha:0});for(let e in _assets_js_resources__WEBPACK_IMPORTED_MODULE_2__._)loader.add(e,_assets_js_resources__WEBPACK_IMPORTED_MODULE_2__._[e]);loader.load(setup);let cxk,bulletArr=[],chickenArr=[],hairArr=[],litchiArr=[],lshArr=[];function setup(){let e=new Sprite(resources.bg.texture);e.width=panelWidth,e.height=panelHeight,e.x=0,e.y=0,app.stage.addChild(e),cxk=new Sprite(resources.cxk.texture),cxk.x=panelWidth/2-roleWidth/2,cxk.y=panelHeight-20-roleHeight,cxk.width=roleWidth,cxk.height=roleHeight,cxk.vx=0,cxk.vy=0,cxk.interactive=!0,app.stage.addChild(cxk),(0,_assets_js_move__WEBPACK_IMPORTED_MODULE_4__.Z)(cxk),app.ticker.add((()=>gameLoop())),app.ticker.stop()}let delay=0,g_Time=0;function gameLoop(){if(!(delay%30)){var timeNow=(new Date).getTime(),timeDiff=timeNow-g_Time;g_Time=timeNow,state.fps=Number((3e4/timeDiff).toFixed(0))}if(delay+=1,cxk.x+=cxk.vx,cxk.y+=cxk.vy,cxk.x<0&&(cxk.x=0),cxk.y<0&&(cxk.y=0),cxk.x>panelWidth-roleWidth&&(cxk.x=panelWidth-roleWidth),cxk.y>panelHeight-roleHeight&&(cxk.y=panelHeight-roleHeight),delay%Math.round(60*bulletParams.createSpeed)===0){let e=new Sprite(resources.basketball.texture);app.stage.addChild(e),e.x=cxk.x+roleWidth/2,e.y=cxk.y-20,e.width=bulletParams.width,e.height=bulletParams.height,e.anchor.set(.5),bulletArr.push(e)}if(delay%Math.round(60*hairParams.createSpeed)===0){let e=new Sprite(resources.hair.texture),_=Math.floor(Math.random()*trackNum);app.stage.addChild(e),e.x=trackArr[_],e.y=0,e.width=hairParams.width,e.height=hairParams.height,e.hp=hairParams.hp,hairArr.push(e)}if(delay%Math.round(60*chickenParams.createSpeed)===0){let e=new Sprite(resources.chicken.texture),_=Math.floor(Math.random()*trackNum);app.stage.addChild(e),e.x=trackArr[_],e.y=0,e.hp=chickenParams.hp,e.width=chickenParams.width,e.height=chickenParams.height,chickenArr.push(e)}if(delay%Math.round(60*litchiParams.createSpeed)===0){let e=new Sprite(resources.litchi.texture),_=Math.floor(Math.random()*trackNum);app.stage.addChild(e),e.x=trackArr[_],e.y=0,e.vx=2*Math.random()-1,e.vy=Math.random()+1,e.width=litchiParams.width,e.height=litchiParams.height,litchiArr.push(e)}if(delay%Math.round(60*lshParams.createSpeed)===0){let e=new Sprite(resources.lsh.texture),_=Math.floor(Math.random()*trackNum);app.stage.addChild(e),e.x=trackArr[_],e.y=0,e.hp=lshParams.hp,e.width=lshParams.width,e.height=lshParams.height,lshArr.push(e)}for(let i=0;i<bulletArr.length;i++){bulletArr[i].rotation=delay%10/10,bulletArr[i].y-=bulletParams.speed;let _enemyArr=JSON.parse(JSON.stringify(enemyArr));for(let m=0;m<_enemyArr.length;m++){let enemy=_enemyArr[m],curEnemyArr=eval(enemy.type+"Arr");for(let e=0;e<curEnemyArr.length;e++)if((0,_assets_js_bump__WEBPACK_IMPORTED_MODULE_5__.Y)(bulletArr[i],curEnemyArr[e])){curEnemyArr[e].hp-=1;let _=new Audio;if(_.src=resources.biu.url,_.play(),curEnemyArr[e].hp<=0){let _=bulletArr.splice(i,1)[0],t=curEnemyArr.splice(e,1)[0],r=new Audio;r.src=resources[enemy.voice].url,r.play(),_.visible=!1,t.visible=!1,enemy.isHit=!0;break}{let e=bulletArr.splice(i,1)[0];e.visible=!1,enemy.isHit=!0;break}}if(enemy.isHit)break}if(_enemyArr.some((e=>e.isHit)))i--,state.score++;else if(bulletArr[i].y<0){let e=bulletArr.splice(i,1)[0];e.visible=!1,i--}}let rewardArray=JSON.parse(JSON.stringify(rewardArr));for(let n=0;n<rewardArray.length;n++){let reward=rewardArray[n],curRewardArr=eval(reward.type+"Arr");for(let e=0;e<curRewardArr.length;e++)if((0,_assets_js_bump__WEBPACK_IMPORTED_MODULE_5__.Y)(cxk,curRewardArr[e])){let _=curRewardArr.splice(e,1)[0],t=new Audio;t.src=resources[reward.voice].url,t.play(),sing(),state.hp+=20,_.visible=!1}}let enemyArray=JSON.parse(JSON.stringify(enemyArr));for(let m=0;m<enemyArray.length;m++){let enemy=enemyArray[m],curEnemyArr=eval(enemy.type+"Arr");for(let e=0;e<curEnemyArr.length;e++)if((0,_assets_js_bump__WEBPACK_IMPORTED_MODULE_5__.Y)(cxk,curEnemyArr[e])){let _=curEnemyArr.splice(e,1)[0],t=new Audio;t.src=resources.ngm.url,t.play(),big(),state.hp-=10,_.visible=!1}if(enemy.isHit)break}enemyArr.forEach((item=>{let curEnemyArr=eval(item.type+"Arr");for(let e=0;e<curEnemyArr.length;e++){let _=curEnemyArr[e];if(_.y+=2,_.y>panelHeight){let _=curEnemyArr.splice(e,1)[0];_.visible=!1}}})),rewardArr.forEach((item=>{let curRewardArr=eval(item.type+"Arr");for(let e=0;e<curRewardArr.length;e++){let _=curRewardArr[e];if(_.x+=_.vx,_.y+=_.vy,_.y>panelHeight){let _=curRewardArr.splice(e,1)[0];_.visible=!1}}}))}const startGame=()=>{state.status=!0,state.score=0,app.ticker.start()};(0,vue__WEBPACK_IMPORTED_MODULE_0__.YP)((()=>state.hp),(e=>{e<=0&&(state.status=!1,app.ticker.stop(),bulletArr=[],chickenArr=[],hairArr=[],litchiArr=[],state.hp=100,state.content="您失败了！")}));const panel=(0,vue__WEBPACK_IMPORTED_MODULE_3__.iH)(null);return(0,vue__WEBPACK_IMPORTED_MODULE_0__.bv)((()=>{panel.value&&panel.value.appendChild(app.view)})),(e,_)=>((0,vue__WEBPACK_IMPORTED_MODULE_0__.wg)(),(0,vue__WEBPACK_IMPORTED_MODULE_0__.iD)(vue__WEBPACK_IMPORTED_MODULE_0__.HY,null,[(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",{class:"panel",id:"panel",ref_key:"panel",ref:panel},null,512),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",_hoisted_1,[(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("ul",null,[(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("li",null,"得分:"+(0,vue__WEBPACK_IMPORTED_MODULE_6__.zw)((0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).score),1),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("li",null,"FPS:"+(0,vue__WEBPACK_IMPORTED_MODULE_6__.zw)((0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).fps),1),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("li",null,[(0,vue__WEBPACK_IMPORTED_MODULE_0__.Uk)(" HP:"+(0,vue__WEBPACK_IMPORTED_MODULE_6__.zw)((0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).hp)+" ",1),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",_hoisted_2,[(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",{class:(0,vue__WEBPACK_IMPORTED_MODULE_6__.C_)(["cur-hp",(0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(hpClass)]),style:(0,vue__WEBPACK_IMPORTED_MODULE_6__.j5)({width:(0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).hp+"px"})},null,6)])])])]),(0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).status?(0,vue__WEBPACK_IMPORTED_MODULE_0__.kq)("",!0):((0,vue__WEBPACK_IMPORTED_MODULE_0__.wg)(),(0,vue__WEBPACK_IMPORTED_MODULE_0__.iD)("div",_hoisted_3,[_hoisted_4,(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",_hoisted_5,[(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",_hoisted_6,(0,vue__WEBPACK_IMPORTED_MODULE_6__.zw)((0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).content),1),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",_hoisted_7,"得分："+(0,vue__WEBPACK_IMPORTED_MODULE_6__.zw)((0,vue__WEBPACK_IMPORTED_MODULE_3__.SU)(state).score),1),(0,vue__WEBPACK_IMPORTED_MODULE_0__._)("div",{class:"btn",onClick:startGame},"开始游戏")])]))],64))}})},6028:function(e,_,t){function r(e,_){let t;t=!1,e.centerX=e.x+e.width/2,e.centerY=e.y+e.height/2,_.centerX=_.x+_.width/2,_.centerY=_.y+_.height/2,e.halfWidth=e.width/2,e.halfHeight=e.height/2,_.halfWidth=_.width/2,_.halfHeight=_.height/2;const r=e.centerX-_.centerX,i=e.centerY-_.centerY,a=e.halfWidth+_.halfWidth,s=e.halfHeight+_.halfHeight;return t=Math.abs(r)<a&&Math.abs(i)<s,t}t.d(_,{Y:function(){return r}})},3697:function(e,_,t){t.d(_,{Z:function(){return s}});const r=5;function i(e){const _={value:e,isDown:!1,isUp:!0,press:void 0,release:void 0,downHandler:void 0,upHandler:void 0,unsubscribe:void 0};_.downHandler=e=>{e.key===_.value&&(_.isUp&&_.press&&_.press(),_.isDown=!0,_.isUp=!1,e.preventDefault())},_.upHandler=e=>{e.key===_.value&&(_.isDown&&_.release&&_.release(),_.isDown=!1,_.isUp=!0,e.preventDefault())};const t=_.downHandler.bind(_),r=_.upHandler.bind(_);return window.addEventListener("keydown",t,!1),window.addEventListener("keyup",r,!1),_.unsubscribe=()=>{window.removeEventListener("keydown",t),window.removeEventListener("keyup",r)},_}function a(e){const _=e.currentTarget,{x:t,y:r}=e.data.global;_.x=t-50,_.y=r-75}function s(e){e.on("pointermove",a);const _=i("ArrowLeft"),t=i("ArrowUp"),s=i("ArrowRight"),c=i("ArrowDown");_.press=()=>{e.vx=-r,e.vy=0},_.release=()=>{s.isDown||0!==e.vy||(e.vx=0)},t.press=()=>{e.vy=-r,e.vx=0},t.release=()=>{c.isDown||0!==e.vx||(e.vy=0)},s.press=()=>{e.vx=r,e.vy=0},s.release=()=>{_.isDown||0!==e.vy||(e.vx=0)},c.press=()=>{e.vy=r,e.vx=0},c.release=()=>{t.isDown||0!==e.vx||(e.vy=0)}}},8878:function(e,_,t){t.d(_,{_:function(){return m}});var r=t(6781),i=t(8649),a=t(6378),s=t(6778),c=t(3067),n=t(9832),l=t(9311),o=t(7362),u=t(6227),p=t(8397),d=t(9210),h=t(1952),E=t(6433),v=t(7525);const m={basketball:r,chicken:i,litchi:a,kun:s,cxk:c,branch:n,lsh:l,bg:o,hair:u,boom:p,crow:d,ngm:h,biu:E,reward:v}},8444:function(e,_,t){var r=t(9242),i=t(3396),a=t(1573),s=t(89);const c=(0,s.Z)(a.Z,[["__scopeId","data-v-09cb632e"]]);var n=c,l=t(4870),o=t(7139),u=t(6922),p=t(6378),d=t(6227),h=t(8649),E=t(9311),v=t(9832),m=t(6778),b=t(7349);const w={class:"set-box"},f=["src"],P={class:"music-img-wrap",for:"music"},M=(0,i.uE)('<div class="desc" data-v-c580b50e><h3 data-v-c580b50e>游戏说明</h3><p data-v-c580b50e>操作方向键(⬅⬆➡⬇)或移动鼠标(🖱)控制坤坤移动</p><p data-v-c580b50e>作者：<s data-v-c580b50e>小黑子</s> ikun</p><p data-v-c580b50e> github:<a href="https://github.com/czj0923/plane-game" target="_blank" data-v-c580b50e>czj的github</a></p><p data-v-c580b50e>点击该面板收起</p></div><ul class="goods-list" data-v-c580b50e><li class="item" data-v-c580b50e><img src="'+p+'" data-v-c580b50e><div class="text" data-v-c580b50e><span class="name" data-v-c580b50e>荔枝</span>:HP+20,射速x2持续1秒 </div></li><li class="item" data-v-c580b50e><img src="'+d+'" data-v-c580b50e><div class="text" data-v-c580b50e><span class="name" data-v-c580b50e>中分</span>:buff加成</div></li><li class="item" data-v-c580b50e><img src="'+h+'" data-v-c580b50e><div class="text" data-v-c580b50e><span class="name" data-v-c580b50e>鸡</span>:已练习两年半</div></li><li class="item" data-v-c580b50e><img src="'+E+'" data-v-c580b50e><div class="text" data-v-c580b50e><span class="name" data-v-c580b50e>绿尸寒</span>:触发被动跳</div></li><li class="item" data-v-c580b50e><img src="'+v+'" data-v-c580b50e><div class="text" data-v-c580b50e>树枝:暂定</div></li><li class="item" data-v-c580b50e><img src="'+m+'" data-v-c580b50e><div class="text" data-v-c580b50e>鲲:暂定</div></li></ul>',2);var A=(0,i.aZ)({setup(e){const _=(0,l.qj)({playMusic:!1,isOpen:!0,elWidth:0});(0,i.YP)((()=>_.playMusic),((e,_)=>{let t=document.getElementById("audio");e?t&&(t.volume=.3,t.play()):t&&t.pause()}));const t=(0,l.iH)(null);return(0,i.bv)((()=>{t.value&&(_.elWidth=t.value.offsetWidth)})),(e,a)=>((0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",w,[(0,i._)("audio",{src:(0,l.SU)(b),autoplay:"",id:"audio",loop:""},null,8,f),(0,i.wy)((0,i._)("input",{type:"checkbox","onUpdate:modelValue":a[0]||(a[0]=e=>(0,l.SU)(_).playMusic=e),id:"music"},null,512),[[r.e8,(0,l.SU)(_).playMusic]]),(0,i._)("label",P,[(0,i._)("img",{class:(0,o.C_)({rotate:(0,l.SU)(_).playMusic}),src:u},null,2)])]),(0,i._)("div",{class:"info-box",style:(0,o.j5)({left:(0,l.SU)(_).isOpen?"10px":-(0,l.SU)(_).elWidth+"px"}),ref_key:"boxRef",ref:t,onClick:a[2]||(a[2]=e=>(0,l.SU)(_).isOpen=!1)},[M,(0,i.wy)((0,i._)("div",{class:"operate",onClick:a[1]||(a[1]=(0,r.iM)((e=>(0,l.SU)(_).isOpen=!0),["stop"]))}," > ",512),[[r.F8,!(0,l.SU)(_).isOpen]])],4)],64))}});const O=(0,s.Z)(A,[["__scopeId","data-v-c580b50e"]]);var k=O,D=(0,i.aZ)({setup(e){return(e,_)=>((0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(n),(0,i.Wm)(k)],64))}});const y=D;var g=y;const x={mounted:function(e){const _=e.clientWidth/2,t=e.clientHeight/2,r=document.body.clientWidth,i=document.body.clientHeight;document.onmousemove=function(a){let s=a.clientX,c=a.clientY;s<_&&(s=_),s>r-_&&(s=r-_),c<t&&(c=t),c>i-t&&(c=i-t),e.style.left=s-_+"px",e.style.top=c-t+"px"}}},W=(0,r.ri)(g);W.directive("move",x),W.mount("#app")},6781:function(e,_,t){e.exports=t.p+"img/baseketball.91e7ded5.png"},7362:function(e,_,t){e.exports=t.p+"img/bg.665fabe3.png"},9832:function(e,_,t){e.exports=t.p+"img/branch.99be0f2c.png"},8649:function(e,_,t){e.exports=t.p+"img/chicken.52503af1.png"},3067:function(e,_,t){e.exports=t.p+"img/cxk.6a17ea3c.png"},6227:function(e,_,t){e.exports=t.p+"img/hair.d3b45ae2.png"},6778:function(e,_,t){e.exports=t.p+"img/kun.76a26fa8.png"},6378:function(e,_,t){e.exports=t.p+"img/litchi.0d6bd480.png"},9311:function(e,_,t){e.exports=t.p+"img/lsh.c95fefa6.png"},6922:function(e,_,t){e.exports=t.p+"img/music-icon.d8ee8873.png"},6433:function(e,_,t){e.exports=t.p+"media/biu.0c642c0b.mp3"},8397:function(e,_,t){e.exports=t.p+"media/boom.b36270b5.mp3"},9210:function(e,_,t){e.exports=t.p+"media/crow.89d55a26.mp3"},7349:function(e,_,t){e.exports=t.p+"media/jntm.2818649f.mp3"},1952:function(e,_,t){e.exports=t.p+"media/ngm.352fa6e0.aac"},7525:function(e,_,t){e.exports=t.p+"media/reward.215c76ff.mp3"}},__webpack_module_cache__={};function __webpack_require__(e){var _=__webpack_module_cache__[e];if(void 0!==_)return _.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(t.exports,t,t.exports,__webpack_require__),t.exports}__webpack_require__.m=__webpack_modules__,function(){var e=[];__webpack_require__.O=function(_,t,r,i){if(!t){var a=1/0;for(l=0;l<e.length;l++){t=e[l][0],r=e[l][1],i=e[l][2];for(var s=!0,c=0;c<t.length;c++)(!1&i||a>=i)&&Object.keys(__webpack_require__.O).every((function(e){return __webpack_require__.O[e](t[c])}))?t.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var n=r();void 0!==n&&(_=n)}}return _}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,r,i]}}(),function(){__webpack_require__.n=function(e){var _=e&&e.__esModule?function(){return e["default"]}:function(){return e};return __webpack_require__.d(_,{a:_}),_}}(),function(){__webpack_require__.d=function(e,_){for(var t in _)__webpack_require__.o(_,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:_[t]})}}(),function(){__webpack_require__.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){__webpack_require__.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)}}(),function(){__webpack_require__.p=""}(),function(){var e={143:0};__webpack_require__.O.j=function(_){return 0===e[_]};var _=function(_,t){var r,i,a=t[0],s=t[1],c=t[2],n=0;if(a.some((function(_){return 0!==e[_]}))){for(r in s)__webpack_require__.o(s,r)&&(__webpack_require__.m[r]=s[r]);if(c)var l=c(__webpack_require__)}for(_&&_(t);n<a.length;n++)i=a[n],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return __webpack_require__.O(l)},t=self["webpackChunkplane_game"]=self["webpackChunkplane_game"]||[];t.forEach(_.bind(null,0)),t.push=_.bind(null,t.push.bind(t))}();var __webpack_exports__=__webpack_require__.O(void 0,[998],(function(){return __webpack_require__(8444)}));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();
//# sourceMappingURL=app.60c3b10d.js.map