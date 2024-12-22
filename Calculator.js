class Calculator {
    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        str = str.replace(/\s/g, '');
        if (str.includes('[')) return this.getMatrix(str);
        if (str.includes('(')) return this.getVector(str);
        if (str.includes('x') || str.includes('^')) return this.getPolynomial(str);
        return this.getComplex(str);
    }

    getMatrix(str) {
        const arr = str.slice(1, -1).split('|').map(elems => elems.split(';').map(elem => this.getEntity(elem)));
        return this.matrix(arr);
    }

    getVector(str) {
        const arr = str.slice(1, -1).split(',').map(elem => this.getEntity(elem));
        return this.vector(arr);
    }

    getComplex(str) {
        const match = str.match(/^(-?\d*\.?\d*)?([+-]?\d*\.?\d*)i?$/);
        if (!match) throw new Error(`Invalid number format: ${str}`);
    
        const re = parseFloat(match[1] || '0');
        const im = parseFloat(match[2] || '0');
        return this.complex(re, im);
    }

    getPolynomial(str) {
        str = str.replace(/\s+/g, '').replace(/([+-])/g, ' $1 ').trim();
        const terms = str.split(/\s+/).filter(term => term !== '');
        const members = terms.map(term => this.getMember(term));
        return new Polynomial(members);
    }

    getMember(str) {
        const arr = str.split('x');
        const value = parseFloat(arr[0]) || (arr[0] === '-' ? -1 : 1);
        const power = arr.length === 2 ? parseInt(arr[1].replace('^', '')) : 0;
        return new Member(value, power);
    }

    get(elem) {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        return new PolynomialCalculator();
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    prod(a, p) {
        return this.get(a).prod(a, p);
    }

    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(elem) {
        if (elem instanceof Matrix) {
            return this.get(elem).zero(elem.values.length);
        }
        if (elem instanceof Vector) {
            return this.get(elem).zero(elem.values.length);
        }
        return this.get().zero();
    }

    one(elem) {
        if (elem instanceof Matrix) {
            return this.get(elem).one(elem.values.length);
        }
        if (elem instanceof Vector) {
            return this.get(elem).one(elem.values.length);
        }
        return this.get().one();
    }
}