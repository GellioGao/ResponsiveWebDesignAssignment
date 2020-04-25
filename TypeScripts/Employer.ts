let publishedJobItemTemplate = (job: JobItem): string => {
    return `<tr>
        <td class="job-title">${job.jobTitle}</td>
        <td class="publishing-date"><time datetime="${job.date}">${new Date(job.date).toDateString()}</time></td>
        <td class="operation"><button id="delete-job-${job.id}" onClick="deletePublishedJob(${job.id})">Delete</button></td>
    </tr>`;
};


let publishButton: HTMLInputElement;
let publishForm: HTMLFormElement;
let publishedJobListTable: HTMLTableElement;
let publishedJobListBody: HTMLTableSectionElement;

let publishedJobs: Array<JobDetail>;
let company: string;

window.onload = () => {
    let logged_in_div = document.getElementById("logged-in") as HTMLDivElement;
    let isLoggedIn = CheckLogin();
    if (!isLoggedIn) {
        logged_in_div.classList.add("not-login");
        return;
    }

    publishButton = document.getElementById('publishButton') as HTMLInputElement;
    publishForm = document.getElementById('publish-form') as HTMLFormElement;
    publishedJobListTable = document.getElementById('job-list-table') as HTMLTableElement;
    publishedJobListBody = publishedJobListTable.tBodies[0];

    publishButton.addEventListener("click", (ev: MouseEvent) => {
        ev.preventDefault();
        if (!publishForm.checkValidity()) {
            publishForm.reportValidity();
            return false;
        }

        publishNewJob();

        return false;
    });

    company = "1st Call Recruitment";
    publishedJobs = getJobs(company);
    refreshJobList('job-list-table', publishedJobs, publishedJobItemTemplate);

}

function CheckLogin(): boolean {
    return false || window.location.hash === "#logged-in";
}

function publishNewJob() {
    let company_name = document.getElementById("company-name") as HTMLInputElement;
    let job_title = document.getElementById("job-title") as HTMLInputElement;
    let responsibilities = document.getElementById("responsibilities") as HTMLAreaElement;
    let requirements = document.getElementById("requirements") as HTMLAreaElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let salary = document.getElementById("salary") as HTMLInputElement;
    let contact_info = document.getElementById("contact-info") as HTMLInputElement;

    publishedJobs.push({
        id: 0,
        jobTitle: job_title.value,
        description: responsibilities.textContent,
        date: new Date(),
        bulletPoints: requirements.textContent.split('\n'),
        advertiser: { id: "0", description: company_name.value },
        location: address.value,
        area: address.value,
        workType: "Fulltime",
        classification: { id: "0", description: "software" },
        subClassification: { id: "0", description: "software" },
        salary: salary.value
    });
    
    refreshJobList('job-list-table', publishedJobs, publishedJobItemTemplate);

    publishForm.reset();
}

function deletePublishedJob(id: number) {
    publishedJobs = publishedJobs.filter(item => item.id !== id);

    refreshJobList('job-list-table', publishedJobs, publishedJobItemTemplate);
}