// import * as d3 from '../node_modules/d3/dist/d3.js';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function discriminant(target, current) {
    return target.x * current.y - target.y * current.x;
}

function clear() {
    console.log(box.children);
    while (box.children.length)
        box.removeChild(box.children[0]);
}

function update() {
    // 终点坐标
    const targetX = parseInt(inputX.value);
    const targetY = parseInt(inputY.value);
    console.log(targetX, targetY);
    const target = new Point(targetX, targetY);
    // 当前坐标
    let current = new Point(0, 0);
    // 终点判别（总步数）
    let step_left = Math.abs(target.x - current.x) + Math.abs(target.y - current.y);
    // 步数计数器
    let step_count = 0;

    // 输出
    console.log(current.x, current.y); {
        let p = document.createElement('p');
        p.innerHTML = `step ${step_count}: p<sub>x</sub> = ${current.x}, p<sub>y</sub> = ${current.y}`;
        box.appendChild(p);
    }

    while (step_left > 0) {
        let step = 1;
        if (discriminant(target, current) >= 0) {
            current.x += step;
            step_left -= step;
        } else {
            current.y += step;
            step_left -= step;
        }
        step_count++;
        console.log(current.x, current.y);
        let p = document.createElement('p');
        p.innerHTML = `step ${step_count}: p<sub>x</sub> = ${current.x}, p<sub>y</sub> = ${current.y}`;
        box.appendChild(p);
    }

}

// 获取元素引用
const box = document.querySelector('#result');
const inputX = document.querySelector('#target-x');
const inputY = document.querySelector('#target-y');
const buttonGo = document.querySelector('#go');

// 绑定事件
buttonGo.addEventListener('click', () => {
    clear();
    update();
})