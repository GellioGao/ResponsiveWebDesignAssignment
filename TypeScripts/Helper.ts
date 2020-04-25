enum RequestFor {
    HTML = 'HTMLs',
    JSON = 'Data',
    Image = 'Images'
}

interface JobItem {
    id: number;
    jobTitle: string;
    description: string;
    date: Date;
}

function getParameter(name: string): string {
    let url = new URL(window.location.href);
    let parameter = url.searchParams.get(name);

    return parameter;
}

function loadJobData<TJob extends JobItem>(): Array<TJob> {
    //let jsonUrl = getRequestUrl('JobList.json', RequestFor.JSON);
    // @ts-ignore
    let jsonString = JobData;//getJson(jsonUrl);
    let Jobs = JSON.parse(jsonString) as Array<TJob>;
    return Jobs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
}

function refreshJobList<TJob extends JobItem>(tableId: string, jobs: Array<TJob>, htmlBuilder: (job: TJob) => string) {
    let table = (document.getElementById(tableId) as HTMLTableElement).tBodies[0];
    while(table.rows.length > 1 ){
        table.deleteRow(1);
    }

    jobs.forEach(job => {
        let jobHtml = htmlBuilder(job);
        let row = table.insertRow();
        row.innerHTML = jobHtml;
    });
}

function getJobs<TJob extends JobDetail>(company: string): Array<TJob> {
    let jobs = loadJobData<TJob>();
    let filteredJobs = jobs.filter(job => companyName(job) === company);

    return filteredJobs;
}

function getJob<TJob extends JobItem>(id: number): TJob {
    let jobs = loadJobData<TJob>();
    let job = jobs.find(job => job.id === id);

    return job;
}

function companyName(job: JobDetail): string {
    return job.advertiser.description;
}

function companyAddress(job: JobDetail): string {
    return job.area;
}

function responsibilities(job: JobDetail): string {
    return job.description;
}

function requirements(job: JobDetail): string {
    return job.bulletPoints.join('\n');
}

function contactInformation(job: JobDetail): string {
    return "0277 333 819";
}

function getJson(url: string): string {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.readyState == 4 && xhr.status == 200) {
        return xhr.responseText;
    }
    return '';
}

function getJsonAsync(url: string, onResponse: (response: string) => void): void {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.addEventListener("readystatechange", function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            onResponse(xhr.responseText)
        }
    }, false);
}

function getRequestUrl(file: string, type: RequestFor): string {
    let baseUrl = getBaseUrl();

    return `${baseUrl}${type}/${file}`;
}

function getBaseUrl(): string {
    let url = window.location.pathname;
    let baseUrl = url.split(RequestFor.HTML)[0];

    return baseUrl
}