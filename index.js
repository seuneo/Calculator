
var keyboard = document.querySelectorAll("span");

for(let j = 0; j<keyboard.length; j++){
  keyboard[j].addEventListener("click", whichNumber);
}

function whichNumber(n){

    console.log(n.target.innerHTML);
    var keyBoardNum = "" + n.target.innerHTML;
    addNumber(keyBoardNum);
}

var input = document.querySelector(".input");
var answer = document.querySelector(".answer");

document.addEventListener("keydown", addNumber);

var charCounter = 0;

function addNumber(e){


    var key = e.key;


    if((typeof e) == "string"){
        key = e;
    }

    //input the operands and operators

    if((key == "Backspace" || key == "Delete") || key == "DEL"){
        input.innerHTML = input.innerHTML.slice(0, -1);
        charCounter --;
      }  

      if(key == "AC"){
        input.innerHTML = "";
        charCounter = 0;
      }  



    if(validInput(key) == true){

        if(key == "X" || key == "*"){
            key = "x";
        }
    
        if(key == "/"){
            key = "÷";
        }

        input.innerHTML += key;
        charCounter ++;
    }  
      
    
    if((key == "Enter" || key == "=") || key == "Ans"){

        answer.innerHTML = Calculator(input.innerHTML);

    }

}

//BEDMAS

var operatorHierachy = ['÷', 'x', '+', '-'];

function Calculator(inp){

    for(let i = 0; i < operatorHierachy.length; i++){

        

        if(operatorHierachy.includes(inp.charAt(inp.length-1)) == true){       
            return "Error";
        }

        else if(operatorHierachy.includes(inp.charAt(0)) == true){

            if(inp.charAt(0) != '-'){
                return "Error";
                
            }

        }

        //divide
        if(i == 0){

            var myRegex = /\-*[0-9]*\.*[0-9]+÷\-*[0-9]*\.*[0-9]+/;
            var operation = inp.match(myRegex);

            if(operation == null){
                i++;
            }
    
            else{
                var operands = operation[0].split(/÷/);
                console.log(operands);
                var num1 = Number(operands[0]);
                console.log(num1);
                var num2 =  Number(operands[1]);
                console.log(num2);
                var ans = num1/num2;
                console.log(ans);
                inp = inp.replace(operation[0], ans);
                console.log(inp);
                return Calculator(inp);
    
            }   

        }

        //multiply

        if(i == 1){

            var myRegex = /\-*[0-9]*\.*[0-9]+x\-*[0-9]*\.*[0-9]+/;
            var operation = inp.match(myRegex);

        if(operation == null){
                i++;
            }

            else{
                var operands = operation[0].split(/x/);
                console.log(operands);
                var num1 = Number(operands[0]);
                console.log(num1);
                var num2 =  Number(operands[1]);
                console.log(num2);
                var ans = num1*num2;
                console.log(ans);
                inp = inp.replace(operation[0], ans);
                console.log(inp);
                return Calculator(inp);
    
            }   

        }

        //addition subtraction interchangeable

        if(i == 3){
            var myRegex = /\-*[0-9]*\.*[0-9]+(\-|\+)\-*[0-9]*\.*[0-9]+/;
            var operation = inp.match(myRegex);

            if(operation == null){
                return inp;
            }

            else if(operation.includes("+")){
                var operands = operation[0].split(/\+/);
                console.log(operands);
                var num1 = Number(operands[0]);
                console.log(num1);
                var num2 =  Number(operands[1]);
                console.log(num2);
                var ans = num1+num2;
                console.log(ans);
                inp = inp.replace(operation[0], ans);
                console.log(inp);
                return Calculator(inp);
    
            }  
            
            else if(operation.includes("-")){
                var operands = operation[0].split(/(?<=[0-9])\-(?=[0-9])/);
                console.log(operands);
                var num1 = Number(operands[0]);
                console.log(num1);
                var num2 =  Number(operands[1]);
                console.log(num2);
                var ans = num1-num2;
                console.log(ans);
                inp = inp.replace(operation[0], ans);
                console.log(inp);
                return Calculator(inp);
    
            } 

        }
    }
}


function validInput(x){

    if((validNumber(x) == true || validOperator(x) == true) && charCounter < 30 ){
        return true;
    }

    return false;


}

function validNumber(num){

    num = Number(num);

    if(num > -1 && num < 10){
        return true;
    }

    else{
        return false;
    }

}

function validOperator(op){

    var operatorKeys = ['-', '+', 'x', 'X', '*', '/', '÷', '.'];

    if(operatorKeys.includes(op)){
        return true;
    }

    else{
        return false;
    }
}