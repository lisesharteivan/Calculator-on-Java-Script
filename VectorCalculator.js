class VectorCalculator extends RealCalculator {
    constructor(calc = new RealCalculator()) {
        super();
        this.calc = calc;
    }

    div() {
        return null;
    }

    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    prod(a, p) {
        return new Vector(a.values.map(elem => this.calc.prod(elem, p)));
    }

    mult(a, b) {
        return new Vector([
            a.values[1] * b.values[2] - a.values[2] * b.values[1],
            a.values[2] * b.values[0] - a.values[0] * b.values[2],
            a.values[0] * b.values[1] - a.values[1] * b.values[0]
        ]);
    }

    zero(length = 0) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }

    one(length = 0) {
        if (length === 0) return new Vector([]);
        const values = [this.calc.one()];
        for (let i = 1; i < length; i++) {
            values.push(this.calc.zero());
        }
        return new Vector(values);
    }
}