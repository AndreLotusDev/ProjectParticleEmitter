import $ from "jquery"
import { BaseTypeFirework } from "./base-type-firework";
import {convertTextToJson} from "./converter-json"
import { FireWorks } from "./fireworks";
import { UIHandler } from "./ui-handler";

let inputElement : JQuery<HTMLInputElement> | null = $('#json-uploader');

let fireworksInMemory!:FireWorks;

inputElement.on('change', async function(event) {

    let fileUploaded : File | null = event.target.files![0];

    if(fileUploaded != null) {

        try {

            let objectFormated = await convertTextToJson(fileUploaded);
        
            fireworksInMemory = new FireWorks(objectFormated);
    
            let mountInformation: string = '';
            let hasSomethingToDisplay = false;
    
            fireworksInMemory.fireWorksInArchive.forEach((fireworkInfo: BaseTypeFirework) => {
    
                let errorTempAboutFirework = fireworkInfo.listOfErrors;
                let warningTempAboutFirework = fireworkInfo.listOfWarnings;
    
                let hasErrorOrWarning = errorTempAboutFirework.length > 0 || warningTempAboutFirework.length > 0;
    
                if(hasErrorOrWarning) {
                    hasSomethingToDisplay = true;
    
                    mountInformation += `<p class="text-info">Error field name(type): ${fireworkInfo.constructor.name}<p/>`
                    mountInformation += `<p class="text-info">Position in JSON: ${fireworkInfo.positionInArchive}<p/>`
                    mountInformation += '<br/>'
                }
    
                errorTempAboutFirework.forEach((stringError: string) => mountInformation += `<p class="text-danger">${stringError}</p>`);
                mountInformation += '<br/>'; 
                warningTempAboutFirework.forEach((stringWarning: string) => mountInformation += `<p class="text-warning">${stringWarning}</p>`);
    
                mountInformation += '<hr/>'
            })
    
            if(hasSomethingToDisplay) 
            {
                const runWithDefaultValuesTxt = 'Run with default values';
                const rewriteJsonBeforeInitializing = 'Rewrite json first';
    
                new UIHandler('Attention!', mountInformation).showWithWarningHtmlAndConfirmeAndDeny(runWithDefaultValuesTxt, rewriteJsonBeforeInitializing,
                () => {}, ()=> {});
            }
            else
                new UIHandler('Everything Okay!', '').showSuccessAndRunBeforeClickButton(() => runInOrderEachFirework());

        }
        catch(ex) {

            new UIHandler('Invalid format, please rewrite your json', '').showError();
            inputElement?.val('');

        }
        
    }
})

async function runInOrderEachFirework(): Promise<boolean> {


    for(const fireworBeheaviour of fireworksInMemory.fireWorksInArchive) {
        await fireworBeheaviour.run();
    }

    // gameScene.endDemoAndAskIfThemWantToRepeat();
    inputElement?.val('');

    return new Promise(res => res(true));
}

export {}