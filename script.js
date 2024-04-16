function validateForm() {
    const fields = [
        { id: 'gross-income', errorId: 'grossIncomeError', errorMessage: '' },
        { id: 'extra-income', errorId: 'extraIncomeError', errorMessage: '' },
        { id: 'age-group', errorId: 'ageGroupError', errorMessage: '' },
        { id: 'total-deductions', errorId: 'deductionsError', errorMessage: '' }
    ];

    let valid = true;

    fields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        let inputValue = inputElement.value.trim();

        if (field.id === "age-group") {
            if (!inputValue) {
                document.getElementById(field.errorId).setAttribute('title', 'Field is required');
                document.getElementById(field.errorId).style.display = 'block';
                valid = false;
            } else {
                document.getElementById(field.errorId).style.display = 'none';
            }
        } else {
            if (!inputValue) {
                document.getElementById(field.errorId).setAttribute('title', 'Field is required');
                document.getElementById(field.errorId).style.display = 'block';
                valid = false;
            } else {
                const numericValue = parseFloat(inputValue);
                if (isNaN(numericValue) || numericValue < 0 || !isFinite(numericValue)) {
                    document.getElementById(field.errorId).setAttribute('title', 'Enter valid input');
                    document.getElementById(field.errorId).style.display = 'block';
                    valid = false;
                } else {
                    document.getElementById(field.errorId).style.display = 'none';
                }
            }
        }
    });
    if (valid) {
        showTaxModal();
    }
}

function showTaxModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();

    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const age = document.getElementById('age-group').value;
    const deductions = parseFloat(document.getElementById('total-deductions').value);

    let taxRate = 0.3; // Default tax rate
    if (age === "age between 40 to 60") {
        taxRate = 0.4;
    } else if (age === "age more than 60") {
        taxRate = 0.1;
    }

    let taxableIncome = Math.max(grossIncome + extraIncome - deductions - 800000, 0); 
    let taxAmount = taxRate * taxableIncome;
    let overallIncome = 0;

    // Consider edge cases
    if (taxableIncome === 0) {
        taxAmount = 0;
    } else if (taxableIncome === 800000) {
        taxAmount = 0;
    } else if (taxableIncome < 0) {
        taxableIncome = 0;
        taxAmount = 0;
    }

    // overallIncome = Math.max(overallIncome, 800000);
    overallIncome = grossIncome + extraIncome - taxAmount ;
    document.getElementById('total-tax').textContent = `${overallIncome.toFixed(2)} Lakhs`;
}
