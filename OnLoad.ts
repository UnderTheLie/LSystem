function getInput(): number {
    let res: number;
    let input = prompt("Order?");
    let expr = new RegExp("^[1-6]+$");

    if (!expr.test(input)) {
        return NaN;
    }
    else {
        res = parseInt(input);
        if (res > 9) {
            return NaN;
        }
    }
    return res;
}

function run() {
    let order: number;
    let td = new TurtleGraphics();

    try {
        order = getInput();

        if (isNaN(order)) {
            throw new Error("Invalid input, order must be an integer number in range 1 to 6");
        }
    }
    catch (err) {
        alert(err.message);
        location.reload();
        return;
    }

    let bush = new LSystem("F", "-F+F+[+F-F-]-[-F+F+F]", order);
    let bushResult = bush.buildOutput();
    console.log(bushResult);
    const bushStep = 1100 / (6 * order * order);
    td.setPattern(bushResult, Math.PI / 8, bushStep, 250, 850, Math.PI / 2);
    td.drawOn("canvas1");

    let snowflake = new LSystem("[F]+[F]+[F]+[F]+[F]+[F]", "F[+FF][-FF]FF[+F][-F]FF", order);
    let snowflakeResult = snowflake.buildOutput();
    console.log(snowflakeResult);
    const snowflakeStep = 1100 / (3 * order * order * order * order);
    td.setPattern(snowflakeResult, Math.PI / 3, snowflakeStep, 750, 750, 0);
    td.drawOn("canvas2");
}