class Point {
    constructor(public x: number, public y: number, public angle: number) {
    }
}

class TurtleGraphics {
    private stepSize: number;
    private angle: number;
    private saveStack: Array<Point>;
    private path: string;
    private xPos: number;
    private yPos: number;
    private anglePos: number;

    constructor() {
        this.stepSize = 0;
        this.angle = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.anglePos = 0;
        this.saveStack = [];
    }

    public setPattern(path: string, angle: number, step: number, xStart: number, yStart: number, angleStart: number): void {
        this.path = path;
        this.angle = angle;
        this.anglePos = angleStart;
        this.xPos = xStart;
        this.yPos = yStart;
        this.stepSize = step; 
    }

    public drawOn(canvasID: string): void {
        let canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        let context = canvas.getContext("2d");
        context.lineWidth = 1;
        context.strokeStyle = "black";

        context.beginPath();
        context.moveTo(this.xPos, this.yPos);

        let dx, dy: number;
        for (let i = 0; i < this.path.length; ++i) {
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
                    let tmp = this.saveStack.pop();
                    this.xPos = tmp.x;
                    this.yPos = tmp.y;
                    this.anglePos = tmp.angle;
                    context.moveTo(this.xPos, this.yPos);
                    break;
            }
        }

        context.stroke();
    }
}