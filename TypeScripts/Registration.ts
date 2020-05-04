window.onload = () => {
    let registrationForm = document.getElementById('registration-form') as HTMLFormElement;
    let registerButton = document.getElementById('register') as HTMLInputElement;
    let passwordInput = document.getElementById('password') as HTMLInputElement;
    let confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
    let confirmPasswordMessage = document.getElementById('confirm-password-message') as HTMLInputElement;
    let checkConfirmPassword = (ev: Event) => {
        if (passwordInput.value === confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("");
            return;
        }
        confirmPasswordInput.setCustomValidity("Two passwords do not match!");
        confirmPasswordMessage.innerText = "Two passwords do not match!";
    };
    passwordInput.addEventListener("input", checkConfirmPassword);
    confirmPasswordInput.addEventListener("input", checkConfirmPassword);

    registerButton.addEventListener("click", (ev: MouseEvent) => {
        ev.preventDefault();
        if (!registrationForm.checkValidity()) {
            registrationForm.reportValidity();
            return false;
        }

        registerEmployer();

        return false;
    });
}

function registerEmployer() {
    let companyInput = document.getElementById('company-name') as HTMLInputElement;
    let businessAreaInput = document.getElementById('business-area') as HTMLInputElement;
    let businessStatusInput = getSelectedRadioByName('BusinessStatus');
    let addressInput = document.getElementById('address') as HTMLInputElement;
    let phoneInput = document.getElementById('phone-number') as HTMLInputElement;
    let emailInput = document.getElementById('email-address') as HTMLInputElement;
    let usernameInput = document.getElementById('username') as HTMLInputElement;
    let passwordInput = document.getElementById('password') as HTMLInputElement;
    let newEmployer = {
        company: companyInput.value,
        businessArea: businessAreaInput.value,
        businessStatus: businessStatusInput.value,
        address: addressInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    };

    registerEmployerAsync(newEmployer, (registered) => {
        if (!registered) {
            alert('Registered failed, try again, please.');
            return;
        }

        let uri = makeUrl('Login.html', RequestFor.HTML);
        window.location.href = uri.url;
    });
}

function registerEmployerAsync<TEmployer extends Employer>(employer: TEmployer, onComplete: (registered: boolean) => void, onFailed: (message: string) => void = null): void {
    let jsonUrl = makeUrl('Employer.php');
    let employerJsonString = JSON.stringify(employer);
    postJsonAsync(jsonUrl.url, employerJsonString, (response) => {
        let result = JSON.parse(response);
        let registered = result.result === 'good';
        onComplete(registered);
    }, onFailed);
}