class PolynomialCalculator {
    div(a, b) {
        if (b.members.length === 0 || (b.members.length === 1 && b.members[0].value === 0)) {
            throw new Error("Division by zero polynomial is not allowed");
        }

        let dividend = a;
        const divisor = b;
        const quotientMembers = [];

        while (dividend.members.length > 0 && dividend.members[0].power >= divisor.members[0].power) {
            const leadDividend = dividend.members[0];
            const leadDivisor = divisor.members[0];
            const leadQuotientValue = leadDividend.value / leadDivisor.value;
            const leadQuotientPower = leadDividend.power - leadDivisor.power;
            const leadQuotient = new Member(leadQuotientValue, leadQuotientPower);

            quotientMembers.push(leadQuotient);

            const leadQuotientPolynomial = new Polynomial([leadQuotient]);
            const product = this.mult(leadQuotientPolynomial, divisor);
            dividend = this.sub(dividend, product);
        }

        return new Polynomial(quotientMembers);
    }

    add(a, b) {
        const members = new Map();
    
        const addMember = (member) => {
            if (members.has(member.power)) {
                members.set(member.power, members.get(member.power) + member.value);
            } else {
                members.set(member.power, member.value);
            }
        };
    
        if (a instanceof Polynomial) {
            a.members.forEach(addMember);
        } else {
            addMember(new Member(a, 0));
        }
    
        if (b instanceof Polynomial) {
            b.members.forEach(addMember);
        } else {
            addMember(new Member(b, 0));
        }
    
        const resultMembers = [];
        members.forEach((value, power) => {
            if (value !== 0) {
                resultMembers.push(new Member(value, power));
            }
        });
    
        return new Polynomial(resultMembers);
    }

    sub(a, b) {
        const members = [];
        a.members.forEach(elemA => {
            const member = b.members.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(elemA.value - member.value, elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.members.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        return new Polynomial(members.filter(member => member.value !== 0));
    }

    mult(a, b) {
        const members = new Map();
    
        a.members.forEach(elemA => {
            b.members.forEach(elemB => {
                const power = elemA.power + elemB.power;
                const value = elemA.value * elemB.value;
                if (members.has(power)) {
                    members.set(power, members.get(power) + value);
                } else {
                    members.set(power, value);
                }
            });
        });
    
        const resultMembers = [];
        members.forEach((value, power) => {
            if (value !== 0) {
                resultMembers.push(new Member(value, power));
            }
        });
    
        return new Polynomial(resultMembers);
    }

    zero() {
        return new Polynomial([new Member(0, 0)]);
    }

    one() {
        return new Polynomial([new Member(1, 0)]);
    }

    prod(a, p) {
        const calc = new Calculator();
        const members = [];
        a.members.forEach(elemA => {
            members.push(new Member(calc.mult(elemA.value, p), elemA.power));
        });
        return new Polynomial(members);
    }

    pow(a, n) {
        if (n < 0) throw new Error("Negative exponents not supported");
        if (n === 0) return this.one();
        if (n === 1) return a;
        
        let result = a;
        for (let i = 1; i < n; i++) {
            result = this.mult(result, a);
        }
        return result;
    }

    getPolynomial(str) {
        const arr = str.split('-');
        if (arr.length > 1) {
            arr.forEach((elem, index) => {
                if (index === 0) {
                    if (elem === '') {
                        arr[index + 1] = `-${arr[index + 1]}`;
                    }
                } else {
                    arr[index] = `-${elem}`;
                }
            });
        }
        const newArr = arr.filter(elem => elem !== '').reduce((S, elem) => {
            const arr = elem.split('+');
            arr.forEach(el => S.push(el));
            return S;
        }, []);
        return new Polynomial(newArr.map(elem => this.getMember(elem)));
    }

    getMember(str) {
        const arr = str.split('x');
        const value = parseFloat(arr[0]) || (arr[0] === '-' ? -1 : 1);
        const power = arr.length === 2 ? parseInt(arr[1].replace('^', '')) : 0;
        return new Member(value, power);
    }
}