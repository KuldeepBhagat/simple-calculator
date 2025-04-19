import { evaluateExpression as calculate } from './evaluation.js';

document.addEventListener('DOMContentLoaded', () => {
    let data = {
        Output1: "",
        Output2: "",
        finalOutput: "",
        flag: false
    }

    const MAX_LOG_ENTRIES = 200;

    const output1 = document.getElementById('output1');
    const output2 = document.getElementById('output2');
    const mylog = document.getElementById('mylog');
    
    const buttonIds = ['one', 'two', 'three', 'four', 'five',
         'six', 'seven', 'eight', 'nine', 'zero', 'decimal', 'equalto'];
    const extrabuttonIds = ['backspace', 'clear', 'leftbracket', 'rightbracket'];
    const operatorsIds = ['plus', 'minus', 'divide', 'multiply']

    const buttons = {};
    const extrabutton = {};
    const operators = {};

    function showOutput() {
        output1.classList.remove('fade-in');
        void output1.offsetWidth;
        output2.textContent = data.Output2
        output1.textContent = data.Output1
        output1.classList.add('fade-in');
    }
      
    buttonIds.forEach(Id => {
        buttons[Id] = document.getElementById(Id);
    })
    extrabuttonIds.forEach(Id => {
        extrabutton[Id] = document.getElementById(Id);
    })
    operatorsIds.forEach(Id => {
        operators[Id] = document.getElementById(Id);
    })

    buttons.one.addEventListener('click', () => {
        data.Output1 += "1"
        showOutput()
    })
    buttons.two.addEventListener('click', () => {
        data.Output1 += "2"
        showOutput()
    })
    buttons.three.addEventListener('click', () => {
        data.Output1 += "3"
        showOutput()
    })
    buttons.four.addEventListener('click', () => {
        data.Output1 += "4"
        showOutput()
    })
    buttons.five.addEventListener('click', () => {
        data.Output1 += "5"
        showOutput()
    })
    buttons.six.addEventListener('click', () => {
        data.Output1 += "6"
        showOutput()
    })
    buttons.seven.addEventListener('click', () => {
        data.Output1 += "7"
        showOutput()
    })
    buttons.eight.addEventListener('click', () => {
        data.Output1 += "8"
        showOutput()
    })
    buttons.nine.addEventListener('click', () => {
        data.Output1 += "9"
        showOutput()
    })
    buttons.zero.addEventListener('click', () => {
        data.Output1 += "0"
        showOutput()
    })
    buttons.decimal.addEventListener('click', () => {
        data.Output1 += "."
        showOutput()
    })
    
    
    extrabutton.backspace.addEventListener('click', () => {
        if(data.Output2 && data.Output1){
            data.Output1 = data.Output1.slice(0, -1);
            showOutput()
        }
        else if(data.Output2 && !data.Output1) {
            data.Output1 = data.Output2;
            data.Output2 = "";
            showOutput()
        }
        else {
            data.Output1 = data.Output1.slice(0, -1);
            showOutput()
        }
    })
    extrabutton.clear.addEventListener('click', () => {
        data.Output1 = "";
        data.Output2 = "";
        showOutput()
    })

    extrabutton.leftbracket.addEventListener('click', () => {
        data.Output1 += "(";
        data.flag = true;
        showOutput()

    })
    extrabutton.rightbracket.addEventListener('click', () => {
        data.Output1 += ")";
        data.flag = false;
        showOutput()

    })
    operators.plus.addEventListener('click', () => {
        try {
            if(data.flag) {
                data.Output1 += '+';
            }else if(!data.Output1 && !data.Output2) {
                data.Output1 = ""
                throw new Error("You Can not start with Operator")
            }
            else {
                data.Output2 += data.Output1 + '+';
                data.Output1 = "";
            }
            showOutput()
        }
        catch(error) {
            const p = document.createElement('p');
            p.textContent = error.message;
            mylog.appendChild(p);
            mylog.scrollTop = mylog.scrollHeight;

            while(mylog.children.length > MAX_LOG_ENTRIES) {
                mylog.removeChild(mylog.firstChild)
            }
        }
        
    })
    operators.minus.addEventListener('click', () => {
        if(data.flag) {
            data.Output1 += '-';
        }else if(!data.Output1 && !data.Output2) {
            data.Output1 += '-';
        }
        else {
            data.Output2 += data.Output1 + '-';
            data.Output1 = "";
        }
        showOutput()
    })
    operators.divide.addEventListener('click', () => {
        try {
            if(data.flag) {
                data.Output1 += '/';
            }else if(!data.Output1 && !data.Output2) {
                data.Output1 = ""
                throw new Error("You Can not start with Operator")
            }
            else {
                data.Output2 += data.Output1 + '/';
                data.Output1 = "";
            }
            showOutput()
        }
        catch (error) {
            const p = document.createElement('p');
            p.textContent = error.message;
            mylog.appendChild(p);
            mylog.scrollTop = mylog.scrollHeight;

            while(mylog.children.length > MAX_LOG_ENTRIES) {
                mylog.removeChild(mylog.firstChild)
            }
        }
    })
    operators.multiply.addEventListener('click', () => {
        try {
            if(data.flag) {
                data.Output1 += 'x';
            }else if(!data.Output1 && !data.Output2) {
                data.Output1 = ""
                if(data.flag) {
                    data.Output1 += '/';
                }else if(!data.Output1 && !data.Output2) {
                    data.Output1 = ""
                    throw new Error("You Can not start with Operator")
                }
                else {
                    data.Output2 += data.Output1 + '/';
                    data.Output1 = "";
                }
                showOutput()
            }
            else {
                data.Output2 += data.Output1 + 'x';
                data.Output1 = "";
            }
            showOutput()
        }
        catch (error) {
            const p = document.createElement('p');
            p.textContent = error.message;
            mylog.appendChild(p);
            mylog.scrollTop = mylog.scrollHeight;

            while(mylog.children.length > MAX_LOG_ENTRIES) {
                mylog.removeChild(mylog.firstChild)
            }
        }
    })

    buttons.equalto.addEventListener('click', () => {
        try {
            data.finalOutput = data.Output2 + data.Output1;
            data.Output1 = "";
            data.Output2 = "";
            output2.textContent = data.finalOutput
            const answer = calculate(data.finalOutput.replace(/x/g, "*"));
            output1.textContent = answer;
        }
        catch (error) {
            const p = document.createElement('p');
            p.textContent = error.message;
            mylog.appendChild(p);
            mylog.scrollTop = mylog.scrollHeight;

            while(mylog.children.length > MAX_LOG_ENTRIES) {
                mylog.removeChild(mylog.firstChild)
            }
        }
    })

});
