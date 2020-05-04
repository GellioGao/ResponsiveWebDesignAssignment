enum RequestFor {
    HTML = 'HTMLs',
    JSON = 'Data',
    Image = 'Images',
    PHP = 'PHP'
}

enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

interface Result {
    result: string
}

interface Sessionable {
    sessionId: string
}

interface Company {
    id: number;
    name: string;
}

interface CompanyWithSession extends Company, Sessionable { }

interface Employer {

}

interface JobItem {
    id: number;
    title: string;
    description: string;
    published_date: Date;
}

interface JobDetail extends JobItem {
    responsibilities: string;
    requirements: string;
    employer: string;
    address: string;
    classification: string;
    salary: string;
    contact: string;
}

function getParameter(name: string): string {
    let url = new URL(window.location.href);
    let parameter = url.searchParams.get(name);

    return parameter;
}

function loadJobDataAsync<TJob extends JobItem>(parameters: Map<string, string>, onLoaded: (jobs: Array<TJob>, queryString: string) => void, onFailed: (message: string) => void = null): void {
    let jsonUrl = makeUrl('Jobs.php', RequestFor.PHP, parameters);
    getJsonAsync(jsonUrl.url, (response) => {
        let Jobs = JSON.parse(response) as Array<TJob>;
        let sortedJobs = Jobs.sort((a, b) => (a.published_date > b.published_date) ? 1 : ((b.published_date > a.published_date) ? -1 : 0));
        onLoaded(sortedJobs, jsonUrl.queryString);
    }, onFailed);
}

function refreshJobList<TJob extends JobItem>(tableId: string, jobs: Array<TJob>, htmlBuilder: (job: TJob) => string): void {
    let table = (document.getElementById(tableId) as HTMLTableElement).tBodies[0];
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    jobs.forEach(job => {
        let jobHtml = htmlBuilder(job);
        let row = table.insertRow();
        row.outerHTML = jobHtml;
    });
}

function getJsonAsync(url: string, onResponse: (response: string) => void, onFailed: (message: string) => void): void {
    jsonRequestAsync(url, RequestMethods.GET, null, onResponse, onFailed);
}

function postJsonAsync(url: string, content: string, onResponse: (response: string) => void, onFailed: (message: string) => void): void {
    jsonRequestAsync(url, RequestMethods.POST, content, onResponse, onFailed);
}

function deleteJsonAsync(url: string, content: string, onResponse: (response: string) => void, onFailed: (message: string) => void): void {
    jsonRequestAsync(url, RequestMethods.DELETE, content, onResponse, onFailed);
}

function jsonRequestAsync(url: string, method: RequestMethods, content: string, onResponse: (response: string) => void, onFailed: (message: string) => void): void {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    let loading = document.getElementById("loading") as HTMLDivElement;
    xhr.onload = (ev: ProgressEvent<EventTarget>) => {
        if (xhr.status === 200) {
            try {
                onResponse(xhr.responseText);
            }
            catch (ex) {
                if (onFailed !== null) {
                    onFailed(ex.message);
                }
            }
        } else if (xhr.status === 401 || xhr.status === 500) {
            if (onFailed !== null) {
                onFailed('');
            }
        }
        if (loading && !loading.classList.contains('loaded')) {
            loading.classList.add('loaded');
        }
    }
    xhr.onerror = (ev: ProgressEvent<EventTarget>) => {
        if (onFailed !== null) {
            onFailed('');
        }
        if (loading && !loading.classList.contains('loaded')) {
            loading.classList.add('loaded');
        }
    }

    if (loading && loading.classList.contains('loaded')) {
        loading.classList.remove('loaded');
    }
    xhr.send(content);
}

function getRequestUrl(file: string, type: RequestFor): string {
    let baseUrl = getBaseUrl();

    return `${baseUrl}/${type}/${file}`;
}

function getBaseUrl(): string {
    let baseUrl = window.location.origin;

    return baseUrl
}

function makeUrl(path: string, type: RequestFor = RequestFor.PHP, parameters: Map<string, string> = null, hashTag: string = null): { url: string, queryString: string } {
    var queryString = '?';
    if (parameters != null) {
        parameters.forEach((value, key) => {
            queryString += `${key}=${value}&`;
        });
    }
    let jsonUrl = getRequestUrl(path, type);
    if (queryString.length > 1) {
        queryString = queryString.substr(0, queryString.length - 1);
        jsonUrl += queryString;
    }

    return { url: jsonUrl, queryString };
}

function getSelectedRadioByName(name: string): HTMLInputElement {
    var radios = document.getElementsByName(name) as NodeListOf<HTMLInputElement>;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i];
        }
    }
}