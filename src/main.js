// import * as d3 from '../node_modules/d3/dist/d3.js';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 获取元素引用
const box = document.querySelector('#result');
const inputX = document.querySelector('#target-x');
const inputY = document.querySelector('#target-y');
const buttonGo = document.querySelector('#go');
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const offset = 20;

function discriminant(target, current) {
    return target.x * current.y - target.y * current.x;
}

function clear() {
    console.log(box.children);
    while (box.children.length)
        box.removeChild(box.children[0]);
}

function clearCanvas() {
    canvasContext.beginPath();
    canvasContext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
}

function update() {
    clear();
    clearCanvas();
    drawCoordinates();
    // 终点坐标
    const targetX = parseInt(inputX.value);
    const targetY = parseInt(inputY.value);
    console.log(targetX, targetY);
    const target = new Point(targetX, targetY);
    // 当前坐标
    let current = new Point(0, 0);
    // 终点判别（总步数）
    let step_left = Math.abs(target.x - current.x) + Math.abs(target.y - current.y);
    // 历史记录
    let histories = [];

    // 输出
    histories.push(new Point(current.x, current.y));

    while (step_left > 0) {
        let step = 1;
        if (discriminant(target, current) >= 0) {
            current.x += step;
            step_left -= step;
        } else {
            current.y += step;
            step_left -= step;
        }
        // step_count++;
        histories.push(new Point(current.x, current.y));
    }

    // 显示记录
    histories.forEach((item, index) => {
        const p = document.createElement('p');
        p.innerHTML = `step ${index}: p<sub>x</sub> = ${item.x}, p<sub>y</sub> = ${item.y}`;
        box.appendChild(p);
    })

    // 画目标直线
    drawLine(canvasContext, 0, 0, target.x * offset, target.y * offset);

    // 画插补线段
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    for(const p of histories) {
        canvasContext.lineTo(p.x * offset, -p.y * offset);
    }
    canvasContext.strokeStyle = "rgb(200, 0, 0)";
    canvasContext.stroke();
    canvasContext.strokeStyle = "rgb(0, 0, 0)";
}

// 画线
function drawLine(canvasContext, x0, y0, x1, y1) {
    canvasContext.beginPath();
    canvasContext.moveTo(x0, -y0);
    canvasContext.lineTo(x1, -y1);
    canvasContext.stroke();
}

// 画三角
function fillTriangle(canvasContext, x0, y0, x1, y1, x2, y2) {
    canvasContext.beginPath();
    canvasContext.moveTo(x0, -y0);
    canvasContext.lineTo(x1, -y1);
    canvasContext.lineTo(x2, -y2);
    canvasContext.closePath();
    canvasContext.fill();
}

// 绘制坐标系
function drawCoordinates() {
    // 画 x 轴
    drawLine(canvasContext, -canvas.width / 2, 0, canvas.width / 2, 0);
    // 画 x 正半轴上的刻度
    for (let i = 0; i < canvas.width / 2 / offset; i++) {
        drawLine(canvasContext, offset * i, 0, offset * i, 5);
        drawLine(canvasContext, -offset * i, 0, -offset * i, 5);
    }
    // 画 x 正半轴的箭头
    fillTriangle(canvasContext, canvas.width / 2 - 10, 5, canvas.width / 2, 0, canvas.width / 2 - 10, -5);

    // 画 y 轴
    drawLine(canvasContext, 0, -canvas.height / 2, 0, canvas.height / 2);
    // 画 y 正半轴上的刻度
    for (let i = 0; i < canvas.height / 2 / offset; i++) {
        drawLine(canvasContext, 0, offset * i, 5, offset * i);
        drawLine(canvasContext, 0, -offset * i, 5, -offset * i);
    }
    // 画 y 正半轴的箭头
    fillTriangle(canvasContext, 5, canvas.height / 2 - 10, 0, canvas.height / 2, -5, canvas.height / 2 - 10);
}

// 绑定按钮事件
buttonGo.addEventListener('click', () => {
    // clear();
    update();
})

// init
canvas.width = 400;
canvas.height = 400;
canvasContext.translate(canvas.width / 2, canvas.height / 2); // 重新定义坐标原点
drawCoordinates();