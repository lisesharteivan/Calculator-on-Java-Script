class Polynomial {
    constructor(members = []) {
        this.members = members;
        this.members.sort((a, b) => b.power - a.power);
    }

    toString() {
        if (this.members.length === 0) {
            return '0';
        }
        return this.members.map(member => {
            const sign = member.value >= 0 ? '+' : '-';
            const value = Math.abs(member.value);
            if (member.power === 0) {
                return `${sign} ${value}`;
            } else if (member.power === 1) {
                return `${sign} ${value}x`;
            } else {
                return `${sign} ${value}x^${member.power}`;
            }
        }).join(' ').replace(/^\+/, '').trim();
    }

    getValue(x) {
        const calc = new Calculator();
        return this.members.reduce((s, elem) => calc.add(s, calc.prod(calc.pow(x, elem.power), elem.value)), calc.zero(x));
    }
}