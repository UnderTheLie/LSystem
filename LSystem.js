var LSystem = (function () {
    function LSystem(axiom, rule, iterations) {
        this.axiom = axiom;
        this.rule = rule;
        this.iterations = iterations;
    }
    LSystem.prototype.buildOutput = function () {
        var result = this.axiom;
        for (var i = 0; i < this.iterations; ++i) {
            result = this.doStep(result);
        }
        return result;
    };
    LSystem.prototype.doStep = function (str) {
        var result = "";
        for (var i = 0; i < str.length; ++i) {
            if (str[i] == "F") {
                result += this.rule;
            }
            else {
                result += str[i];
            }
        }
        return result;
    };
    return LSystem;
}());
