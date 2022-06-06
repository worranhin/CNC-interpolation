// import * as d3 from '../node_modules/d3/dist/d3.js';
import {
    drawLine,
    fillTriangle,
    drawArc,
    drawCoordinates,
    clearCanvas
} from './view.js';

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

// 直线插补函数
function discriminant_line(target, current) {
    return target.x * current.y - target.y * current.x;
}

// 圆弧插补函数
function discriminant_arc(target, current) {
    const tr2 = ((target.x) ** 2 + (target.y) ** 2); // 目标半径平方
    const cr2 = ((current.x) ** 2 + (current.y) ** 2); // 当前半径平方
    return cr2 - tr2;
}

// 清除内容
function clear() {
    console.log(box.children);
    while (box.children.length) {
        box.removeChild(box.children[0]);
    }
    clearCanvas();
}

function update(discriminant) {
    // 清除先前内容
    clear();
    // 重画坐标系
    drawCoordinates();
    // 终点坐标
    const targetX = parseInt(inputX.value);
    const targetY = parseInt(inputY.value);
    const target = new Point(targetX, targetY);
    // 当前坐标
    let startX = 0, startY = 0;
    if (method === 'arc') {
        startX = parseInt(document.querySelector('#start-x').value);
        startY = parseInt(document.querySelector('#start-y').value);
    }
    let current = new Point(startX, startY);
    // 终点判别（总步数）
    let step_left = Math.abs(target.x - current.x) + Math.abs(target.y - current.y);
    // 步长
    let step = 1;
    // 历史记录
    let histories = [];

    // 插补并记录步骤
    histories.push(new Point(startX, startY));
    while (step_left > 0) {
        const judgeValue = discriminant(target, current);  // 偏差判别式结果
        if (method === 'line') {
            // 直线插值
            if (judgeValue >= 0) {
                current.x += step;
            } else {
                current.y += step;
            }
        } else if(current.x <= target.x) {
            // 顺圆弧插值
            if (judgeValue >= 0) {
                current.y -= step;
            } else {
                current.x += step;
            }
        } else {
            // 逆圆弧插值
            if (judgeValue >= 0) {
                current.x -= step;
            } else {
                current.y += step;
            }
        }
        step_left -= step;
        histories.push(new Point(current.x, current.y));
    }

    // 显示记录
    histories.forEach((item, index) => {
        const p = document.createElement('p');
        p.innerHTML = `step ${index}: p<sub>x</sub> = ${item.x}, p<sub>y</sub> = ${item.y}`;
        box.appendChild(p);
    });

    // 画目标直线 / 圆弧
    if(method === 'line') {
        drawLine(canvasContext, 0, 0, target.x * offset, target.y * offset);
    } else {
        drawArc(canvasContext, startX, startY, targetX, targetY);
    }

    // 画插补线段
    canvasContext.beginPath();
    canvasContext.moveTo(startX * offset, -startY * offset);
    for (const p of histories) {
        console.log(p.x, p.y);
        canvasContext.lineTo(p.x * offset, -p.y * offset);
    }
    canvasContext.strokeStyle = "rgb(200, 0, 0)";
    canvasContext.stroke();
    canvasContext.strokeStyle = "rgb(0, 0, 0)";
}

// init //
let method = 'line'; // 插补模式

// 设置 canvas
canvas.width = 400;
canvas.height = 400;
canvasContext.translate(canvas.width / 2, canvas.height / 2); // 重新定义坐标原点
drawCoordinates();

// 绑定按钮事件
buttonGo.addEventListener('click', () => {
    if (method === 'line') {
        update(discriminant_line);
    } else {
        update(discriminant_arc);
    }
});

// 获取插补方法
const inputCC = document.querySelector('#input-cc');
document.querySelector('#line').addEventListener('change', (e) => {
    method = 'line';
    inputCC.setAttribute('hidden', 'true');
    document.querySelector('#target-x').value = 4;
    document.querySelector('#target-y').value = 3;
});
document.querySelector('#arc').addEventListener('change', () => {
    method = 'arc';
    inputCC.removeAttribute('hidden');
    document.querySelector('#start-x').value = 0;
    document.querySelector('#start-y').value = 5;
    document.querySelector('#target-x').value = 4;
    document.querySelector('#target-y').value = 3;
});