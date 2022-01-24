import { Position } from "./position-class";

abstract class BaseTypeFirework {
    
    protected _begin: number;
    protected _colour: string;
    protected _duration: number;
    protected _positions: Position = new Position(0,0);
    protected _canRun = true;

    private _positionInArchive!: number;

    protected _listOfErrors: Array<string> = [];
    protected _listOfWarnings: Array<string> = [];

    constructor(begin: number, colour: string, duration: number, _positions: Position | null) {

        this._begin = begin;
        this._colour = colour;
        this._duration = duration;

        if(_positions != null)
            this._positions = _positions;

        this._validate();
    }

    protected abstract validate(): void;

    private _validate(): void {

        if(this._begin == 0) {
            this._listOfWarnings.push('This firework will run instantly! (not found begin config)');
        }

        if(this._duration == 0) {
            this._listOfWarnings.push('This firework will run with a duration of 1 second! (not found duration config)');
        }

        if(this._colour == '') {
            this._listOfWarnings.push('This firework will have red color (default) because we not found configuration about color!');
        }

        if(this._positions.positionX == 0 && this._positions.positionY == 0) {
            this._listOfWarnings.push('This firework will start on position 0');
        }

        this._validateSpecificColorProperties();

    }

    private _validateSpecificColorProperties(): void {

        let notHave = -1; 
        let colorInvalid = false

        if(this._colour.indexOf('#') === notHave) {
            colorInvalid = true;
            this._listOfErrors.push('Your color its in a invalid format, needs the symbol #');
        }

        if(this._colour.length != 7) {
            colorInvalid = true;
            this._listOfErrors.push('Your color its in a invalid format, need exact 7 characters, as a hexadecimal #FFFFFF');
        }

        if(colorInvalid) {
            this._listOfWarnings.push('This firework will have red color (default) because we not found configuration about color!');
        }

    }

    abstract run(): Promise<boolean>;

    public set positionInArchive(value:number) {
        this._positionInArchive = value;
    }

    public get positionInArchive(): number {
        return this._positionInArchive;
    }

    public get canRun(): boolean {
        return this._canRun
    }

    public get listOfErrors(): Array<string> {
        return this._listOfErrors;
    }

    public get listOfWarnings(): Array<string> {
        return this._listOfWarnings;
    }

    public get color(): number {

        const hex = parseInt(this._colour.replace(/^#/, ''), 16);
        return hex;
    }

}

export {BaseTypeFirework}