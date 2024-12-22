class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    div(a, b) {
        const denominator = b.re ** 2 + b.im ** 2;
        if (denominator === 0) {
            throw new Error("Division by zero is not allowed");
        }
        const realPart = (a.re * b.re + a.im * b.im) / denominator;
        const imagPart = (a.im * b.re - a.re * b.im) / denominator;
        return new Complex(realPart, imagPart);
    }

    prod(a, p) {
        return new Complex(a.re * p, a.im * p);
    }

    pow(a, p) {
        let c = this.one();
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one() {
        return new Complex(1);
    }

    zero() {
        return new Complex(0);
    }
}