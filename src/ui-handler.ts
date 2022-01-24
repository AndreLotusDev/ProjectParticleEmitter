import * as swal from 'sweetalert2'

class UIHandler {

    private readonly _description: string;
    private readonly _title: string;

    constructor(title:string, description: string) {

        this._title = title;
        this._description = description;

    }

    public showError(): void {

        swal.default.fire({
            title: this._title,
            text: this._description,
            icon: 'error'
        });

    }

    public showSuccess(): void {

        swal.default.fire({
            title: this._title,
            text: this._description,
            icon: 'success'
        });

    }

    public showSuccessAndRunBeforeClickButton(doesBeforesClicButton: Function): void {

        swal.default.fire({
            
            title: this._title,
            text: this._description,
            icon: 'success',
            confirmButtonText: 'Run!'

        }).then((result) => {

            if(result.isConfirmed) {

                doesBeforesClicButton();

            }

        });

    }

    public showSuccessHtml(): void {

        swal.default.fire({
            title: this._title,
            icon: 'success',
            html: this._description
        });

    }

    public showWithWarning(): void {

        swal.default.fire({
            title: this._title,
            text: this._description,
            icon: 'warning'
        });

    }

    public showWithWarningHtml(): void {

        swal.default.fire({
            title: this._title,
            icon: 'warning',
            html: this._description
        });

    }

    public showWithWarningHtmlAndConfirmeAndDeny(confirmButtonText:string, denyButtonText:string, 
        functionIfIsConfirmed: Function, functionIfIsDenied: Function): void {

        swal.default.fire({

            title: this._title,
            icon: 'warning',
            html: this._description,
            confirmButtonText: confirmButtonText,
            denyButtonText: denyButtonText,
            showDenyButton: true

        }).then((result) => {

            if(result.isConfirmed) {
                functionIfIsConfirmed();
            }
            else if(result.isDenied) {
                functionIfIsDenied();
            }

        });

    }

}

export{UIHandler}