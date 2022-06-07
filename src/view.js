const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const offset = 20;
const margin = 20;

export default class DrawBoard {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.offset = 20;
    }

    // 初始化
    canvasInit(w, h) {
        this.canvas.width = w;
        this.canvas.height = h;
        canvasContext.translate(20, h - 20); // 重新定义坐标原点
    }

    // 画线
    drawLine(x0, y0, x1, y1) {
        this.context.beginPath();
        this.context.moveTo(x0 * this.offset, -y0 * this.offset);
        this.context.lineTo(x1 * this.offset, -y1 * this.offset);
        this.context.stroke();
    }

    // 画三角
    fillTriangle(x0, y0, x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x0, -y0);
        this.context.lineTo(x1, -y1);
        this.context.lineTo(x2, -y2);
        this.context.closePath();
        this.context.fill();
    }

    // 绘制圆弧
    drawArc(x0, y0, x1, y1) {
        const r = Math.sqrt((x0) ** 2 + (y0) ** 2);
        const a1 = Math.atan(-y0 / x0);
        const a2 = Math.atan(-y1 / x1);
        const sa = Math.min(a1, a2);
        const ea = Math.max(a1, a2);
        this.context.beginPath();
        this.context.arc(0, 0, r * this.offset, sa, ea);
        this.context.stroke();
    }

    // 绘制坐标系
    drawCoordinates() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const xm = w / this.offset;
        const ym = h / this.offset;

        // 画 x 轴
        this.drawLine(-1, 0, xm, 0);
        // 画 x 正半轴上的刻度
        for (let i = 0; i < (w - 20) / offset; i++) {
            this.drawLine(i, 0, i, 0.25);
        }
        // 画 x 正半轴的箭头
        this.fillTriangle(w - 30, 5, w - 20, 0, w - 30, -5);

        // 画 y 轴
        this.drawLine(0, -1, 0, ym);
        // 画 y 正半轴上的刻度
        for (let i = 0; i < (h - 20) / offset; i++) {
            this.drawLine(0, i, 0.25, i);
        }
        // 画 y 正半轴的箭头
        this.fillTriangle(-5, h - 30, 0, h - 20, 5, h - 30);
    }

    // 清空画布
    clearCanvas() {
        canvasContext.beginPath();
        canvasContext.clearRect(-20, -this.canvas.height, this.canvas.width, this.canvas.height);
    }
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

// 绘制圆弧
function drawArc(ctx, x0, y0, x1, y1) {
    const r = Math.sqrt((x0) ** 2 + (y0) ** 2);
    const a1 = Math.atan(-y0 / x0);
    const a2 = Math.atan(-y1 / x1);
    const sa = Math.min(a1, a2);
    const ea = Math.max(a1, a2);
    console.log(x0, y0);
    console.log(x1, y1);
    console.log(sa, ea);
    ctx.beginPath();
    ctx.arc(0, 0, r * offset, sa, ea);
    ctx.stroke();
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

// 清空画布
function clearCanvas() {
    canvasContext.beginPath();
    canvasContext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
}

function canvasInit() {
    canvas.width = 400;
    canvas.height = 400;
    canvasContext.translate(canvas.width / 2, canvas.height / 2); // 重新定义坐标原点
}

export {
    drawLine,
    fillTriangle,
    drawArc,
    drawCoordinates,
    clearCanvas,
    canvasInit
};