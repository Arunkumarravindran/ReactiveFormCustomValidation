import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { DefaultValidationErrorsModel } from './defaultValidationErrorModel';
import { ValidationErrorConstant } from './errorConstant';

@Component({
  selector: 'reactiveFormCustomValidation-error',
  template: `
  <ng-template [ngTemplateOutlet]="errorTemplate" [ngTemplateOutletContext]="{errors : getErorrs() | firstError}">
  </ng-template>
  
  <ng-template let-errors="errors" #errorTemplate>
  
    <!-- user defined default errors Ex.Required, minlength etc.. -->
    <!-- starts-->
    <ng-container [ngSwitch]="errors.errorKey">
  
      <p *ngSwitchCase="'required'">
       {{requiredError}}
      </p>
  
      <p *ngSwitchCase="'email'">
        {{emailError}}
      </p>
  
      <p *ngSwitchCase="'minlength'">
        {{minLengthError + errors.errorMessage?.requiredLength}}
      </p>
  
      <p *ngSwitchCase="'maxlength'">
        {{maxLengthError + errors.errorMessage?.requiredLength}}
      </p>
  
      <p *ngSwitchCase="'max'">
        {{maxError +errors.errorMessage?.max}}
      </p>
  
      <p *ngSwitchCase="'min'">
        {{minError +errors.errorMessage?.min}}
      </p>
  
      <p *ngSwitchCase="'pattern'">
        {{patternError}}
      </p>
  
      <!-- end-->
  
      <!-- user defined custom errors  Ex,. all the custom error with custom error message -->
      <!-- starts-->
  
      <p *ngSwitchDefault>
        {{errors.errorMessage}}
      </p>
  
      <!-- end-->
  
    </ng-container>
  </ng-template>
  
  `,
  styles: [],
})
export class ReactiveFormCustomValidationErrorComponent
  implements OnInit, OnChanges
{
  @Input('form') form!: FormGroup;
  @Input('controlName') formControlName!: string;
  @Input('groupName') formGroupName: string = '';
  @Input('arrayName') formArrayName: string = '';
  @Input('groupIndex') groupIndex!: number;
  @Input('customDefaultErrorMsg')
  customErrorMsgObj!: DefaultValidationErrorsModel;
  defaultValidationErrors = [
    'email',
    'required',
    'minlength',
    'maxlength',
    'min',
    'max',
    'pattern',
  ];

  emailError: string = ValidationErrorConstant.EMAIL;
  requiredError: string = ValidationErrorConstant.REQUIRED;
  minLengthError: string = ValidationErrorConstant.MIN_LENGTH;
  maxLengthError: string = ValidationErrorConstant.MAX_LENGTH;
  minError: string = ValidationErrorConstant.MIN;
  maxError: string = ValidationErrorConstant.MAX;
  patternError: string = ValidationErrorConstant.PATTERN;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.setDefaultValidationErrors();
  }

  /**
   * it will return the error object of formcontrol
   * @returns error object
   */
  getErorrs(): ValidationErrors | null | undefined {
    if (this.formGroupName)
      return this.form.get(`${this.formGroupName}.${this.formControlName}`)
        ?.errors;
    else if (this.formArrayName) return this.getFormArrayErrors();
    else return this.form.get(this.formControlName)?.errors;
  }

  isDefaultValidatorError(errorKey: string): boolean {
    return this.defaultValidationErrors.includes(errorKey);
  }

  getFormArrayErrors(): ValidationErrors | null | undefined {
    const formArray = this.form.get(this.formArrayName) as FormArray;
    const group = formArray.controls[this.groupIndex] as FormGroup;
    return group.controls[this.formControlName]?.errors;
  }

  setDefaultValidationErrors() {
    const {
      requiredError,
      emailError,
      maxError,
      maxLengthError,
      minError,
      minLengthError,
      patternError,
    }: DefaultValidationErrorsModel = this.customErrorMsgObj;
    if (requiredError) this.requiredError = requiredError;
    else if (emailError) this.emailError = emailError;
    else if (maxError) this.maxError = maxError;
    else if (minError) this.minError = minError;
    else if (minLengthError) this.minLengthError = minLengthError;
    else if (maxLengthError) this.maxLengthError = maxLengthError;
    else if (patternError) this.patternError = patternError;
  }
}