let job_title: HTMLHeadingElement;
let company_name: HTMLParagraphElement;
let company_address: HTMLParagraphElement;
let job_responsibilities: HTMLParagraphElement;
let job_requirements: HTMLParagraphElement;
let job_salary: HTMLParagraphElement;
let contact_information: HTMLParagraphElement;

let jobDetail: JobDetail;


function loadJob(job: JobDetail){
    job_title.innerText = job.jobTitle;
    company_name.innerText = companyName(job);
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
    jobDetail = getJob<JobDetail>(id);

    loadJob(jobDetail);
}