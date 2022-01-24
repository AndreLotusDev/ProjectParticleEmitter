import { BaseTypeFirework } from "./base-type-firework";
import { BuilderHelper } from "./builder-helper";
import { WhyIsNotValid } from "./why-is-not-valid-type";

class FireWorks {

    private readonly _archiveToHandle: any;
    private static readonly _IS_VALID: boolean = true;
    private static readonly _IS_NOT_VALID: boolean = false;

    private static _validTypes: Array<string> = [
        'Rocket',
        'Fountain'
    ];

    private _listOfErrors: Array<string> = [];
    private _listOfWarning: Array<string> = [];

    private _listOfFireWorks: Array<BaseTypeFirework> = []

    constructor(archiveToHandle:any) {

        this._archiveToHandle = archiveToHandle;

        this.assureOfHavingFieldFireworksDisplay();

        //Check and generate the list of fireworks to store
        this.checkIfObjectHasPropertieTypesInCorrectFormat();

    }

    private assureOfHavingFieldFireworksDisplay(): boolean {

        if(this._archiveToHandle.FireworkDisplay != null) {

            return FireWorks._IS_VALID;

        }
        else {

            this._listOfErrors.push(`Your json need to have the Field: FireworksDisplay (in this exact way) properly,"
            and inside of it have the proper"
            classes names with your own righ values`);

            return FireWorks._IS_NOT_VALID;
        }

    }

    private checkIfObjectHasPropertieTypesInCorrectFormat(): void {


        let builderHelper = new BuilderHelper();
        let listOfTypesFireworks = builderHelper.typesFirework;
        let positionInArchive = 0;

        this._archiveToHandle.FireworkDisplay.forEach((typeFireworkProperties: any) => {

            let typeCheck = typeFireworkProperties.type as string;

            let positionInClass = (this._archiveToHandle.FireworkDisplay as Array<any>).indexOf(typeFireworkProperties);
            let notFound = undefined;

            if(FireWorks._validTypes.find(typeValid => typeValid === typeCheck) === notFound) {

                this._listOfErrors.push(`The object in ${positionInClass}, has a invalid name: ${typeCheck}, 
                valid names: Rocket or Fountain`);
            };

            for(let typeFirework in listOfTypesFireworks) {

                if(typeFirework.toLowerCase() === typeCheck.toLowerCase()) {

                    let builderOfTypeTemp = builderHelper.buildAndReturn(typeFirework, typeFireworkProperties, this);

                    if(builderOfTypeTemp!= null)
                        builderOfTypeTemp.positionInArchive = positionInArchive;

                }

            }

            positionInArchive++;

        });

    }

    public get fireWorksInArchive() {
        return this._listOfFireWorks;
    }

    public pushFirework(fireworkToPush :BaseTypeFirework): void {
        this._listOfFireWorks.push(fireworkToPush);
    }

    public get firstError(): string {

        let haveNothing: number = 0;
        if(this._listOfErrors.length === haveNothing) {
            return '';
        }

        return this._listOfErrors[0]

    }

}

export {FireWorks}