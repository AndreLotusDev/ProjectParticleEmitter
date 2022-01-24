async function convertTextToJson(fileUploaded:File) :Promise<any> {

    let archiveAsAText : string = await fileUploaded.text();
    let archiveAsObject = JSON.parse(archiveAsAText);

    if(archiveAsObject != null && archiveAsObject != undefined) {
        return new Promise(res => res(archiveAsObject));
    }

    throw "Your archive was in a indefined format!";
}

export {convertTextToJson}