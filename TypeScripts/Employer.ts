let publishedJobItemTemplate = (job: JobItem): string => {
    return `<tr id="job-row-${job.id}">
        <td class="job-title"><div><p>${job.title}</p></div></td>
        <td class="publishing-date"><div><time datetime="${job.published_date}">${new Date(job.published_date).toDateString()}</time></div></td>
        <td class="operation"><div><button id="delete-job-${job.id}" onClick="deletePublishedJob(${job.id})">Delete</button></div></td>
    </tr>`;
};

let publishButton: HTMLInputElement;
let publishForm: HTMLFormElement;
let publishedJobListTable: HTMLTableElement;
let publishedJobListBody: HTMLTableSectionElement;

let publishedJobs: Array<JobDetail>;
let companyName: string;
let companyId: number;
let companySessionId: string;

window.onload = () => {
    let isLoggedIn = true;
    showLogoutButtonsIfLoggedIn({
        onNotLogin: () => {
            let logged_in_div = document.getElementById("logged-in") as HTMLDivElement;
            logged_in_div.classList.add("not-login");
            isLoggedIn = false;
        }
    });
    if (!isLoggedIn) {
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

    setCompanyInfo();
    // Restore the content of the text fields
    resetForm();

    getJobsAsync(companyId, (jobs: Array<JobDetail>, _: string) => {
        publishedJobs = jobs;
        refreshJobList('job-list-table', jobs, publishedJobItemTemplate);
    });

}

function setCompanyInfo() {
    let json = sessionStorage.getItem(storageKey);
    let companyInfo = JSON.parse(json) as CompanyWithSession;
    companyId = companyInfo.id;
    companyName = companyInfo.name;
    companySessionId = companyInfo.sessionId;
}

function resetForm() {
    publishForm.reset();
    let company_name = document.getElementById("company-name") as HTMLInputElement;
    company_name.value = companyName;
    company_name.readOnly = true;
}

function getCompanyInfo(companyId: number, onComplete: (companyInfo: Company) => void, onFailed: (message: string) => void = null): void {
    let jsonUrl = makeUrl('Employer.php', RequestFor.PHP, new Map([['id', `${companyId}`]]));
    getJsonAsync(jsonUrl.url, (response) => {
        let company = JSON.parse(response) as Company;
        onComplete(company);
    }, onFailed);
}

function getJobsAsync<TJob extends JobDetail>(company: number, onComplete: (jobs: Array<TJob>, queryString: string) => void, onFailed: (message: string) => void = null): void {
    let parameters = new Map<string, string>();
    parameters.set('company', `${company}`);
    loadJobDataAsync<TJob>(parameters, onComplete, onFailed);
}

function publishJobAsync<TJob extends JobItem>(job: TJob, onComplete: (job: TJob, queryString: string) => void, onFailed: (message: string) => void = null): void {
    let jsonUrl = makeUrl('Jobs.php');
    let jobJsonString = JSON.stringify(job);
    postJsonAsync(jsonUrl.url, jobJsonString, (response) => {
        let result = JSON.parse(response) as Result;
        if (!result && result.result === 'bad') {
            onFailed(result.result);
            return;
        }

        let job = JSON.parse(response) as TJob;
        if (job) {
            onComplete(job, jsonUrl.queryString);
            return;
        }
    }, onFailed);
}

function deleteJobAsync(id: number, onComplete: (queryString: string) => void, onFailed: (message: string) => void = null): void {
    let parameters = new Map<string, string>();
    parameters.set('id', `${id}`);
    let jsonUrl = makeUrl('Jobs.php', RequestFor.PHP, parameters);
    deleteJsonAsync(jsonUrl.url, null, (response) => {
        let result = JSON.parse(response) as Result;
        if (!result && result.result === 'bad') {
            onFailed(result.result);
            return;
        }
        onComplete(jsonUrl.queryString);
    }, onFailed);
}

function publishNewJob() {
    let job_title = document.getElementById("job-title") as HTMLInputElement;
    let job_classification = document.getElementById("job-classification") as HTMLInputElement;
    let responsibilities = document.getElementById("responsibilities") as HTMLTextAreaElement;
    let requirements = document.getElementById("requirements") as HTMLTextAreaElement;
    let address = document.getElementById("address") as HTMLInputElement;
    let salary = document.getElementById("salary") as HTMLInputElement;
    let contact_info = document.getElementById("contact-info") as HTMLInputElement;

    let newJob = {
        id: 0,
        title: job_title.value,
        description: requirements.value,
        published_date: new Date(),
        requirements: requirements.value,
        responsibilities: responsibilities.value,
        employer: companyName,
        employerId: companyId,
        address: address.value,
        classification: job_classification.value,
        salary: salary.value,
        contact: contact_info.value
    };
    publishJobAsync<JobDetail>(newJob, (job: JobDetail, _: string) => {
        publishedJobs.push(job);
        addNewOneToJobList('job-list-table', job, publishedJobItemTemplate);
        let row = document.getElementById(`job-row-${job.id}`);
        row.classList.add('added');
        resetForm();
    }, (_) => {
        alert('Try again.');
    });
}

function addNewOneToJobList<TJob extends JobItem>(tableId: string, job: TJob, htmlBuilder: (job: TJob) => string): void {
    let table = (document.getElementById(tableId) as HTMLTableElement).tBodies[0];

    let jobHtml = htmlBuilder(job);
    var row = table.insertRow();
    row.outerHTML = jobHtml;
}

function deletePublishedJob(id: number) {
    publishedJobs = publishedJobs.filter(item => item.id !== id);
    deleteJobAsync(id, (_: string) => {
        let deletedRow = document.getElementById(`job-row-${id}`) as HTMLTableRowElement;
        deletedRow.classList.add('deleted');
    })
}