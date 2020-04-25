window.onload = () => {
    let passwordInputs: string[] = ['password', 'confirm-password'];

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
}