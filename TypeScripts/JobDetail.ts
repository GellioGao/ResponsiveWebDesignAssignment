let job_title: HTMLHeadingElement;
let company_name: HTMLParagraphElement;
let company_address: HTMLParagraphElement;
let job_responsibilities: HTMLParagraphElement;
let job_requirements: HTMLParagraphElement;
let job_salary: HTMLParagraphElement;
let contact_information: HTMLParagraphElement;

let jobDetail: JobDetail;

function companyAddress(job: JobDetail): string {
    return job.address;
}

function responsibilities(job: JobDetail): string {
    return job.responsibilities;
}

function requirements(job: JobDetail): string {
    return job.requirements;
}

function contactInformation(job: JobDetail): string {
    return job.contact;
}

function loadJob(job: JobDetail) {
    job_title.innerText = job.title;
    company_name.innerText = job.employer;
    company_address.innerText = companyAddress(job);
    job_responsibilities.innerText = responsibilities(job);
    job_requirements.innerText = requirements(job);
    job_salary.innerText = job.salary.toLocaleString();
    contact_information.innerText = contactInformation(job);
}

window.onload = () => {
    job_title = document.getElementById("job-title") as HTMLHeadingElement;
    company_name = document.getElementById("company-name") as HTMLParagraphElement;
    company_address = document.getElementById("company-address") as HTMLParagraphElement;
    job_responsibilities = document.getElementById("job-responsibilities") as HTMLParagraphElement;
    job_requirements = document.getElementById("job-requirements") as HTMLParagraphElement;
    job_salary = document.getElementById("job-salary") as HTMLParagraphElement;
    contact_information = document.getElementById("contact-information") as HTMLParagraphElement;


    let id = Number.parseInt(getParameter('id'));
    getJobAsync<JobDetail>(id, (job: JobDetail, _: string) => {
        loadJob(job);
    });
}

function getJobAsync<TJob extends JobItem>(id: number, onComplete: (job: TJob, queryString: string) => void, onFailed: (message: string) => void = null): void {
    let parameters = new Map<string, string>();
    parameters.set('id', `${id}`);
    loadOneJobDataAsync<TJob>(parameters, onComplete, onFailed);
}

function loadOneJobDataAsync<TJob extends JobItem>(parameters: Map<string, string>, onLoaded: (jobs: TJob, queryString: string) => void, onFailed: (message: string) => void = null): void {
    let jsonUrl = makeUrl('Jobs.php', RequestFor.PHP, parameters);
    getJsonAsync(jsonUrl.url, (response) => {
        let Job = JSON.parse(response) as TJob;
        onLoaded(Job, jsonUrl.queryString);
    }, onFailed);
}