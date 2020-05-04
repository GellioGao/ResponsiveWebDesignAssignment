window.onload = () => {

    let feedbackButton = document.getElementById('feedback') as HTMLInputElement;
    let feedbackForm = document.getElementById('feedback-form') as HTMLFormElement;

    feedbackButton.addEventListener("click", (ev: MouseEvent) => {
        ev.preventDefault();
        if (!feedbackForm.checkValidity()) {
            feedbackForm.reportValidity();
            return false;
        }

        submitFeedback();

        return false;
    });
}

function submitFeedback() {
    let name = document.getElementById("name") as HTMLInputElement;
    let contact_info = document.getElementById("contact-information") as HTMLInputElement;
    let title = document.getElementById("title") as HTMLInputElement;
    let content = document.getElementById("feedback-text") as HTMLTextAreaElement;
    let feedbackForm = document.getElementById('feedback-form') as HTMLFormElement;

    let feedback = {
        name: name.value,
        contact: contact_info.value,
        title: title.value,
        content: content.value
    };
    let jsonUrl = makeUrl('Feedback.php');
    let feedbackJsonString = JSON.stringify(feedback);
    postJsonAsync(jsonUrl.url, feedbackJsonString, (response) => {
        let result = JSON.parse(response) as Result;
        if (result.result === 'good') {
            feedbackForm.reset();
        }
    }, null);

}