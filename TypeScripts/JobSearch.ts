let jobListItemTemplate = (job: JobItem): string => {
    return `<tr>
        <td class="job-title">${job.jobTitle}</td>
        <td class="description">${job.description}</td>
        <td class="publishing-date"><time datetime="${job.date}">${new Date(job.date).toDateString()}</time></td>
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

window.onload = () => {
    searchButton = document.getElementById('searchButton') as HTMLInputElement;
    searchForm = document.getElementById('search-form') as HTMLFormElement;
    jobListTable = document.getElementById('job-list-table') as HTMLTableElement;
    jobListBody = jobListTable.tBodies[0];

    searchButton.addEventListener("click", (ev: MouseEvent): any => {
        ev.preventDefault();
        if (!searchForm.checkValidity()) {
            searchForm.reportValidity();
            return false;
        }
        refreshJobList('job-list-table', loadJobData<JobItem>(), jobListItemTemplate);
        let url = `${window.location.pathname}?job-title=a&job-classification=b&job-location=c`
        window.history.pushState("", document.title, url);
        return false;
    })

    checkIfRefreshData();
};

function checkIfRefreshData() {
    let jobTitle = getParameter('job-title')
    if (!jobTitle) {
        return;
    }
    refreshJobList('job-list-table', loadJobData<JobItem>(), jobListItemTemplate);
}
