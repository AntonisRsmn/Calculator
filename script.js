const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === "0" || value === ",") {
            if (value === "," && currentInput.includes(".")) return;
            currentInput += value === "," ? "." : value;
            display.textContent = currentInput;
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput === "") return;
            operator = value;
            previousInput = currentInput;
            currentInput = "";
        } else if (value === "=") {
            if (currentInput === "" || previousInput === "" || operator === "") return;
            const result = eval(`${parseFloat(previousInput)} ${operator} ${parseFloat(currentInput)}`);
            display.textContent = result;
            currentInput = result.toString();
            previousInput = "";
            operator = "";
        } else if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.textContent = "0";
        } else if (value === "C") {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
        } else if (value === "+\\-") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
                display.textContent = currentInput;
            }
        } else if (value === "%") {
            if (currentInput && previousInput && operator) {
                // Make % relative to the previous input (Apple-style)
                currentInput = ((parseFloat(previousInput) * parseFloat(currentInput)) / 100).toString();
                display.textContent = currentInput;
            } else if (currentInput) {
                // If no operation is pending, treat % as standalone (normal percent)
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            }
        }
        
    });
});
