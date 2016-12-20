/**
 * Created by PursuitStar on 2016/12/2.
 */
// selector  选择器
// width     可视窗口宽度(图片宽度)
// height    可视窗口高度(图片高度)
// speed     图片轮播速度

function scrollPic(selector, width, height, speed) {

    // 获取所有页面元素
    var scrboxs = document.querySelectorAll(selector);


    // 轮播图里面所有的ul标签css样式修改
    var ulTags = document.querySelectorAll(selector + " ul");
    Array.prototype.forEach.call(ulTags, function (e) {
        e.style.margin = 0;
        e.style.padding = 0;
        e.style.listStyle = "none";
    });


    // 轮播图里面所有的li标签浮动
    var liTags = document.querySelectorAll(selector + " li");

    Array.prototype.forEach.call(liTags, function (e) {
        e.style.float = "left";
    });


    // 轮播图里面的所有图片宽高与盒子一样
    var pics = document.querySelectorAll(selector + " img");

    Array.prototype.forEach.call(pics, function (e) {
        e.width = width;
        e.height = height;
    });


    // 对获取的页面元素添加轮播图功能
    scrboxs.forEach(function (self) {
        self.circleNum = 0;

        self.style.position = "relative";//给盒子添加定位(子绝父相)
        self.style.width = width + "px";
        self.style.height = height + "px";
        self.style.overflow = "hidden";


        self.scrImg = self.children[0];//图片组( ul 盒子)
        self.scrPic = self.scrImg.children;//图片列表项
        self.scrLen = self.scrPic.length;//图片数量
        self.scrImg.style.position = "absolute";//绝对定位
        self.scrImg.style.width = self.scrLen + "00%";//ul 盒子宽度
        self.scrImg.style.height = height + "px";//ul 盒子高度


        self.circleBox = self.children[1];//小球组ul盒子(1, 2, 3, 4...)
        self.scrCircle = self.circleBox.children;//小球列表项
        self.circleBox.style.position = "absolute";//绝对定位


        // 小球位置
        self.circleBox.style.marginLeft = -self.circleBox.offsetWidth / 2 + "px";
        self.circleBox.style.left = "50%";
        self.circleBox.style.bottom = "5%";


        // 目标值 和 当前值 赋初值0
        self.scrTarget = 0;
        self.scrLeader = 0;
        self.scrNum = 0; //当前图片的位移量


        self.scrTimer1 = null;  // 定时器1
        self.scrTimer2 = null;  // 定时器2
        self.scrTimer = setInterval(scrAutoplay, speed);//图片自动播放定时器


        // 轮播功能函数
        function scrAutoplay() {

            self.scrNum--;
            var maxwidth = width * (self.scrLen - 1);//图片组位移最大距离
            self.scrNum < -maxwidth ? self.scrNum = 0 : self.scrNum;   //超过位移最大距离重置

            self.circleNum >= (self.scrLen - 1) ? self.circleNum = -1 : self.circleNum;

            self.scrLeader = self.scrNum;//实时获取图片初始位移
            self.scrImg.style.left = self.scrNum + "px";//让页面上的图片组定位的left属性 与 当前位移量同步


            if (self.scrNum % width == 0) {   //判断图片是否划过一张的距离

                Array.prototype.forEach.call(self.scrCircle, function(t) {
                    t.classList.remove("active");
                });
                self.circleNum++;
                self.scrCircle[self.circleNum].classList.add("active");



                clearInterval(self.scrTimer);  //清除轮播的定时器

                self.scrTimer1 = setTimeout(function () {  // 延时器(效果: 图片划过一张的距离后停留 1s )

                    self.scrTimer = setInterval(scrAutoplay, speed); //再次开启图片轮播定时器

                }, 1000);

            }

        }


        // 用户鼠标移入,移出视口,小球组透明度变化( 个人: 外部css样式设置小球组不透明度初始值 0.3)
        self.onmouseenter = function () {

            Array.prototype.forEach.call(self.scrCircle, function (e) {
                e.style.opacity = 1;
            });

        };
        self.onmouseleave = function () {

            Array.prototype.forEach.call(self.scrCircle, function (e) {
                e.style.opacity = 0.5;
            });

        };


        // 小球组点击事件
        Array.prototype.forEach.call(self.scrCircle, function (e, i, arr) {
            e.style.opacity = 0.5;

            e.onclick = function () {
                Array.prototype.forEach.call(arr, function(t) {
                    t.classList.remove("active");
                });

                self.circleNum = i;
                e.classList.add("active");
                // 清除所有的定时器
                clearInterval(self.scrTimer);
                clearInterval(self.scrTimer1);
                clearInterval(self.scrTimer2);

                var index = this.dataset.title - 1;//要位移的几张图片的距离

                self.scrTarget = -index * width;//目标值

                self.scrTimer2 = setInterval(function () {
                    // 缓动公式
                    self.scrLeader = self.scrLeader + (self.scrTarget - self.scrLeader) / 10;

                    self.scrImg.style.left = self.scrLeader + "px";

                    // 判断当前值是否近似等于目标值
                    if (Math.floor(self.scrLeader) == self.scrTarget || parseInt(self.scrLeader) == self.scrTarget) {

                        clearInterval(self.scrTimer2);//结束定时器
                        self.scrImg.style.left = self.scrTarget + "px";
                        self.scrNum = self.scrTarget;//及时获取当前图片组的位置

                        self.scrTimer1 = setTimeout(function () {// 延迟3s后再次开启轮播功能

                            self.scrTimer = setInterval(scrAutoplay, speed);

                        }, 3000);
                    }
                }, 20);
            }
        });
    });
}
// 简单调用举例:
/*html主体部分:
 <div class="选择器(随便写)">
 <ul>
     <li><a href="#"><img src="images/1.jpg" alt=""></a></li>
     <li><a href="#"><img src="images/2.jpg" alt=""></a></li>
     <li><a href="#"><img src="images/1.jpg" alt=""></a></li>           //最后一张和第一张一样
 </ul>
 <ul>
     <li data-title="1"><a href="#">1</a></li>                          //data-title属性
     <li data-title="2"><a href="#">2</a></li>
 </ul>
 </div>
 //注意: div 里面的ul的顺序是设定好了的(分别是 大儿子/二儿子)  第一个: 图片组   第二个:小球组
*/

/*js部分:
 (function (window) {
 scrollPic("自己写的选择器", 900, 350, 0);
 })(window)
 */
