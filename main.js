window.onload = function() {
    const buttons = document.querySelectorAll('.operand');
    buttons.forEach(button =>
        button.addEventListener('click', operandHandler));
}

function operandHandler(event) {
    const A = document.getElementById('A').value;
    const B = document.getElementById('B').value;
    const operand = event.target.dataset.operand;
    const calc = new Calculator();
    const C = calc[operand](calc.getEntity(A), calc.getEntity(B));
    document.getElementById('C').value = C.toString();
}