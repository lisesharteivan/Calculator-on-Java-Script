class MatrixCalculator extends RealCalculator {
    constructor(calc = new RealCalculator()) {
        super();
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(a.values.map((row, i) => row.map((elem, j) => this.calc.add(elem, b.values[i][j]))));
    }

    div() {
        return null;
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => this.calc.sub(elem, b.values[i][j]))));
    }

    mult(a, b) {
        const length = a.values.length;
        const result = [];
        for (let i = 0; i < length; i++) {
            const row = [];
            for (let j = 0; j < length; j++) {
                let sum = this.calc.zero();
                for (let k = 0; k < length; k++) {
                    sum = this.calc.add(sum, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                row.push(sum);
            }
            result.push(row);
        }
        return new Matrix(result);
    }

    prod(a, p) {
        return new Matrix(a.values.map(arr => arr.map(elem => this.calc.prod(elem, p))));
    }

    pow(a, p) {
        let c = this.one(a.values.length);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
        }
        return c;
    }

    zero(length = 0) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(Array(length).fill(this.calc.zero()));
        }
        return new Matrix(values);
    }

    one(length = 0) {
        const values = [];
        for (let i = 0; i < length; i++) {
            const row = [];
            for (let j = 0; j < length; j++) {
                row.push(i === j ? this.calc.one() : this.calc.zero());
            }
            values.push(row);
        }
        return new Matrix(values);
    }
}