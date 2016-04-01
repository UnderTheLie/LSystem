class LSystem {
    private axiom: string;
    private rule: string;
    private iterations: number;

    constructor(axiom: string, rule: string, iterations: number) {
        this.axiom = axiom;
        this.rule = rule;
        this.iterations = iterations;
    }

    public buildOutput(): string {
        let result: string = this.axiom;
        
        for (let i = 0; i < this.iterations; ++i) {
            result = this.doStep(result);
        }

        return result;
    }

    private doStep(str: string): string {
        let result: string = "";

        for (let i = 0; i < str.length; ++i) {
            if (str[i] == "F") {
                result += this.rule;
            }
            else {
                result += str[i];
            }
        }

        return result;
    }
}