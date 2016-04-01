function getInput() {
    var res;
    var input = prompt("Order?");
    var expr = new RegExp("^[1-6]+$");
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
    var order;
    var td = new TurtleGraphics();
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
    var bush = new LSystem("F", "-F+F+[+F-F-]-[-F+F+F]", order);
    var bushResult = bush.buildOutput();
    console.log(bushResult);
    var bushStep = 1100 / (6 * order * order);
    td.setPattern(bushResult, Math.PI / 8, bushStep, 250, 850, Math.PI / 2);
    td.drawOn("canvas1");
    var snowflake = new LSystem("[F]+[F]+[F]+[F]+[F]+[F]", "F[+FF][-FF]FF[+F][-F]FF", order);
    var snowflakeResult = snowflake.buildOutput();
    console.log(snowflakeResult);
    var snowflakeStep = 1100 / (3 * order * order * order * order);
    td.setPattern(snowflakeResult, Math.PI / 3, snowflakeStep, 750, 750, 0);
    td.drawOn("canvas2");
}
