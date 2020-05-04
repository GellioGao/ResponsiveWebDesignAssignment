window.onload = () => {
    let loginForm = document.getElementById('login-form') as HTMLFormElement;
    let usernameInput = document.getElementById('username') as HTMLInputElement;
    let passwordInput = document.getElementById('password') as HTMLInputElement;
    let loginButton = document.getElementById('login') as HTMLInputElement;

    let removeLoginFailedClassOnInputChange = (ev: Event) => {
        if (loginForm.classList.contains('login-failed')) {
            loginForm.classList.remove('login-failed');
        }
    };
    usernameInput.addEventListener("change", removeLoginFailedClassOnInputChange);
    passwordInput.addEventListener("change", removeLoginFailedClassOnInputChange);

    loginButton.addEventListener("click", (ev: MouseEvent) => {
        ev.preventDefault();
        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return false;
        }
        let username = usernameInput.value;
        let password = passwordInput.value;

        login(username, password, (company) => {
            let uri = makeUrl('Employer.html', RequestFor.HTML);
            sessionStorage.setItem(`company`, JSON.stringify(company));
            window.location.href = uri.url;
        }, (_) => {
            loginForm.classList.add('login-failed');
        });

        return false;
    });
}

function login(username: string, password: string, onLoggedIn: (company: CompanyWithSession) => void, onFailed: (message: string) => void): void {
    let loginUrl = makeUrl('Employer.php');
    let payload = { username: username, password: encryptPassword(password) };
    let payloadJsonString = JSON.stringify(payload);
    postJsonAsync(loginUrl.url, payloadJsonString, (response) => {
        try {
            let company = JSON.parse(response) as CompanyWithSession;
            onLoggedIn(company);
        }
        catch (ex) {
            onFailed(ex.message);
        }
    }, onFailed);
}

function encryptPassword(password: string): string {
    //Should encrypt the password here.
    return password;
}