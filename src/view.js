const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const offset = 20;

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

export {drawLine, fillTriangle, drawArc, drawCoordinates, clearCanvas};