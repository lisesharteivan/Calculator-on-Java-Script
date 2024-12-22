class Matrix{
    constructor(values = [[]]){
        this.values = values.map(row => row.map(elem => elem));
    }
    
    toString(){
        return `[${this.values.map(row => row.map(elem => elem.toString())
        .join(';')).join('| \n')}]`;
    }
}