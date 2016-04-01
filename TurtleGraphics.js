var Point = (function () {
    function Point(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    return Point;
}());
var TurtleGraphics = (function () {
    function TurtleGraphics() {
        this.stepSize = 0;
        this.angle = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.anglePos = 0;
        this.saveStack = [];
    }
    TurtleGraphics.prototype.setPattern = function (path, angle, step, xStart, yStart, angleStart) {
        this.path = path;
        this.angle = angle;
        this.anglePos = angleStart;
        this.xPos = xStart;
        this.yPos = yStart;
        this.stepSize = step;
    };
    TurtleGraphics.prototype.drawOn = function (canvasID) {
        var canvas = document.getElementById(canvasID);
        var context = canvas.getContext("2d");
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(this.xPos, this.yPos);
        var dx, dy;
        for (var i = 0; i < this.path.length; ++i) {
            switch (this.path[i]) {
                case "F":
                    dx = this.stepSize * Math.cos(this.anglePos);
                    dy = -1 * this.stepSize * Math.sin(this.anglePos);
                    this.xPos += dx;
                    this.yPos += dy;
                    context.lineTo(this.xPos, this.yPos);
                    context.moveTo(this.xPos, this.yPos);
                    break;
                case "+":
                    this.anglePos += this.angle;
                    break;
                case "-":
                    this.anglePos -= this.angle;
                    break;
                case "[":
                    this.saveStack.push(new Point(this.xPos, this.yPos, this.anglePos));
                    break;
                case "]":
                    var tmp = this.saveStack.pop();
                    this.xPos = tmp.x;
                    this.yPos = tmp.y;
                    this.anglePos = tmp.angle;
                    context.moveTo(this.xPos, this.yPos);
                    break;
            }
        }
        context.stroke();
    };
    return TurtleGraphics;
}());
