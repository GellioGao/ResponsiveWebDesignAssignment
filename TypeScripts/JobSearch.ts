let jobListItemTemplate = (job: JobItem): string => {
    return `<tr>
        <td class="job-title">${job.title}</td>
        <td class="description">${job.description}</td>
        <td class="publishing-date"><time datetime="${job.published_date}">${new Date(job.published_date).toDateString()}</time></td>
        <td class="operation">
            <a href="JobDetail.html?id=${job.id}"><button id="detail-job-${job.id}">Detail</button></a>
            <button id="apply-job-${job.id}">Apply</button>
        </td>
    </tr>`
};

let searchButton: HTMLInputElement;
let searchForm: HTMLFormElement;
let jobListTable: HTMLTableElement;
var jobListBody: HTMLTableSectionElement;
let jobTitleInput: HTMLInputElement;
let jobClassificationInput: HTMLInputElement;
let jobLocationInput: HTMLInputElement;
let companyNameInput: HTMLInputElement;
let jobResponsibilitiesInput: HTMLInputElement;
let jobRequirementsInput: HTMLInputElement;
let salaryFromInput: HTMLInputElement;
let salaryToInput: HTMLInputElement;

window.onload = () => {
    searchButton = document.getElementById('searchButton') as HTMLInputElement;
    searchForm = document.getElementById('search-form') as HTMLFormElement;
    jobListTable = document.getElementById('job-list-table') as HTMLTableElement;
    jobListBody = jobListTable.tBodies[0];
    jobTitleInput = document.getElementById('job-title') as HTMLInputElement;
    jobClassificationInput = document.getElementById('job-classification') as HTMLInputElement;
    jobLocationInput = document.getElementById('job-location') as HTMLInputElement;
    companyNameInput = document.getElementById('company-name') as HTMLInputElement;
    jobResponsibilitiesInput = document.getElementById('job-responsibilities') as HTMLInputElement;
    jobRequirementsInput = document.getElementById('job-requirements') as HTMLInputElement;
    salaryFromInput = document.getElementById('salary-from') as HTMLInputElement;
    salaryToInput = document.getElementById('salary-to') as HTMLInputElement;
    searchButton.addEventListener("click", (ev: MouseEvent): any => {
        ev.preventDefault();
        if (!searchForm.checkValidity()) {
            searchForm.reportValidity();
            return false;
        }
        refreshJobList('job-list-table', [], jobListItemTemplate);
        let parameters = getParametersFromSearchForm();
        loadJobDataAsync<JobItem>(parameters, (jobs, queryString) => {
            refreshJobList('job-list-table', jobs, jobListItemTemplate);
            let url = `${window.location.pathname}${queryString}`
            if (window.location.hash.length > 1) {
                url = `${url}${window.location.hash}`;
            }
            window.history.pushState("", document.title, url);
        });
        return false;
    })

    checkIfRefreshData();
};

function checkIfRefreshData() {
    let jobTitle = getParameter('title');
    let jobClassification = getParameter('classification');
    let jobLocation = getParameter('location');
    let companyName = getParameter('companyName') ?? '';
    let jobResponsibilities = getParameter('jobResponsibilities') ?? '';
    let jobRequirements = getParameter('jobRequirements') ?? '';
    let salaryFrom = getParameter('salaryFrom') ?? '';
    let salaryTo = getParameter('salaryTo') ?? '';
    if (!jobTitle && !jobClassification && !jobLocation) {
        return;
    }

    jobTitleInput.value = jobTitle;
    jobClassificationInput.value = jobClassification;
    jobLocationInput.value = jobLocation;
    companyNameInput.value = companyName;
    jobResponsibilitiesInput.value = jobResponsibilities;
    jobRequirementsInput.value = jobRequirements;
    salaryFromInput.value = salaryFrom;
    salaryToInput.value = salaryTo;

    let parameters = new Map<string, string>();
    parameters.set('title', jobTitle);
    parameters.set('classification', jobClassification);
    parameters.set('location', jobLocation);
    parameters.set('company', companyName);
    parameters.set('responsibilities', jobResponsibilities);
    parameters.set('requirements', jobRequirements);
    parameters.set('salaryFrom', salaryFrom);
    parameters.set('salaryTo', salaryTo);

    loadJobDataAsync<JobItem>(parameters, (jobs, _) => {
        refreshJobList('job-list-table', jobs, jobListItemTemplate);
    });
}

function getParametersFromSearchForm(): Map<string, string> {
    let parameters = new Map<string, string>();
    parameters.set('title', jobTitleInput.value);
    parameters.set('classification', jobClassificationInput.value);
    parameters.set('location', jobLocationInput.value);
    parameters.set('company', companyNameInput.value);
    parameters.set('responsibilities', jobResponsibilitiesInput.value);
    parameters.set('requirements', jobRequirementsInput.value);
    parameters.set('salaryFrom', salaryFromInput.value);
    parameters.set('salaryTo', salaryToInput.value);
    return parameters;
}
