// 	最里层图片最大平移像素距离 layer1_distance = 23.5382 px 最里层图片编号 1, 2, 4
// 	依次向外			 layer2_distance = 78.4606 px 3, 7, 8
// 					 layer3_distance = 374.737 px 11, 9, 10
// 					 layer4_distance = 655.79 px  13, 12, 15
// 					 layer5_distance = 819.738 px 14
var window_width = document.documentElement.clientWidth
var banner = document.getElementById('banner')
var img = document.getElementsByClassName('layer');
var img_data = [ //初始化图片div数据
				{x: 0, y: 0, r: 0, f: 1, o: 0},
				{x: 0, y: 0, r: 0, f: 1, o: 1},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 1, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 1},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 12, r: 0, f: 0, o: 1},
				{x: 200, y: 16, r: 0, f: 0, o: 0},
				{x: -120, y: 16, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 1},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 0},
				{x: 0, y: 0, r: 0, f: 0, o: 0}
			]
var dynamic_data = img_data.map(o => Object.assign({}, o)); //复制一份数据
var x = 0;
var dx = 0;
var morning = [0, 2, 10, 12, 13];
var noon = [1, 6, 8, 11];
var evening = [3, 7, 9, 14];
var pace_1 = 23.5382 / window_width;	//根据客户端宽度调整各层图片平移速率，使鼠标移动距离等于屏幕宽度时能使图片移动距离达到最大值
var pace_2 = 78.4606 / window_width;
var pace_3 = 374.737 / window_width;
var pace_4 = 655.79 / window_width;
var pace_5 = 819.738 / window_width;
var pace_o = 4 / window_width			//透明度变化速率

function update_img(img_data) {
	for (var i = 0; i < img_data.length; i++) {
		img[i].children[0].style = 'transform: scale(1) translate(' + img_data[i].x + 'px, ' + img_data[i].y + 'px) rotate(' +
			img_data[i].r + 'deg); filter: blur(' + img_data[i].f + 'px); opacity: ' + img_data[i].o + ';';
	}
}

function init() {
	update_img(img_data);
}
window.onload = function() {
	init();
}
banner.addEventListener('mouseenter', function(e) {
	x = e.clientX;
})

function compute_translate(dx) { //全图片同时平移
	dynamic_data[0].x = img_data[0].x - pace_1 * dx;
	dynamic_data[1].x = img_data[1].x - pace_1 * dx;
	dynamic_data[2].x = img_data[2].x - pace_2 * dx;
	dynamic_data[3].x = img_data[3].x - pace_1 * dx;
	dynamic_data[4].x = img_data[4].x - pace_1 * dx;
	dynamic_data[5].x = img_data[5].x - pace_1 * dx;
	dynamic_data[6].x = img_data[6].x - pace_2 * dx;
	dynamic_data[7].x = img_data[7].x - pace_2 * dx;
	dynamic_data[8].x = img_data[8].x - pace_3 * dx;
	dynamic_data[9].x = img_data[9].x - pace_3 * dx;
	dynamic_data[10].x = img_data[10].x - pace_3 * dx;
	dynamic_data[11].x = img_data[11].x - pace_4 * dx;
	dynamic_data[12].x = img_data[12].x - pace_4 * dx;
	dynamic_data[13].x = img_data[13].x - pace_5 * dx;
	dynamic_data[14].x = img_data[14].x - pace_4 * dx;
}

function compute_opacity(dx) {
	if (window_width / 4 < dx && dx < window_width / 2) {  //透明度只在特定区域里变化
		for (let i = 0; i < noon.length; i++) {
			dynamic_data[noon[i]].o = img_data[noon[i]].o - pace_o * (dx - window_width / 4);
		}
		for (let i = 0; i < evening.length; i++) {
			dynamic_data[evening[i]].o = img_data[evening[i]].o + pace_o * (dx - window_width / 4);
		}
	}
	if (-window_width / 4 > dx && dx > -window_width / 2) {
		for (let i = 0; i < noon.length; i++) {
			dynamic_data[noon[i]].o = img_data[noon[i]].o + pace_o * (dx + window_width / 4);
		}
		for (let i = 0; i < morning.length; i++) {
			dynamic_data[morning[i]].o = img_data[morning[i]].o - pace_o * (dx + window_width / 4);
		}
	}
}
banner.addEventListener('mousemove', function(e) {
	dx = e.clientX - x; //计算鼠标移动距离
	compute_translate(dx);
	compute_opacity(dx)
	update_img(dynamic_data);
})
banner.addEventListener('mouseleave', function(e) { //重置图片div数据
	dynamic_data = img_data.map(o => Object.assign({}, o));
	init();
})
