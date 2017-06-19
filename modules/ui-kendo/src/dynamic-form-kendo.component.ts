import { Component, ContentChildren, Input, EventEmitter, OnInit, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarComponent, DateInputComponent, DatePickerComponent } from "@progress/kendo-angular-dateinputs";
import { AutoCompleteComponent, DropDownListComponent, MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import {
    MaskedTextBoxComponent,
    NumericTextBoxComponent,
    SliderComponent,
    SwitchComponent
} from "@progress/kendo-angular-inputs";
import { UploadComponent } from "@progress/kendo-angular-upload";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatePickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER
} from "@ng2-dynamic-forms/core";
import {
    KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    KENDO_CALENDAR_TEMPLATE_DIRECTIVES,
    KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES,
    KENDO_UPLOAD_TEMPLATE_DIRECTIVES,
    KendoFormControlType
} from "./dynamic-form-kendo.const";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-control",
    templateUrl: "./dynamic-form-kendo.component.html"
})
export class DynamicFormKendoComponent extends DynamicFormControlComponent implements OnInit {

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChild(AutoCompleteComponent) kendoAutoComplete: AutoCompleteComponent | undefined;
    @ViewChild(CalendarComponent) kendoCalendar: CalendarComponent | undefined;
    @ViewChild(DateInputComponent) kendoDateInput: DateInputComponent | undefined;
    @ViewChild(DatePickerComponent) kendoDatePicker: DatePickerComponent | undefined;
    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent | undefined;
    @ViewChild(MaskedTextBoxComponent) kendoMaskedTextBox: MaskedTextBoxComponent | undefined;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent | undefined;
    @ViewChild(NumericTextBoxComponent) kendoNumericTextBox: NumericTextBoxComponent | undefined;
    @ViewChild(SliderComponent) kendoSlider: SliderComponent | undefined;
    @ViewChild(SwitchComponent) kendoSwitch: SwitchComponent | undefined;
    @ViewChild(UploadComponent) kendoUpload: UploadComponent | undefined;

    type: KendoFormControlType | null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.type = DynamicFormKendoComponent.getFormControlType(this.model);
    }

    protected setTemplateDirective(directive: DynamicTemplateDirective): void {

        let templateDirectives: any,
            viewChild: any;

        if (this.kendoAutoComplete) {

            templateDirectives = KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoAutoComplete;

        } else if (this.kendoCalendar) {

            templateDirectives = KENDO_CALENDAR_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoCalendar;

        } else if (this.kendoDatePicker) {

            templateDirectives = KENDO_CALENDAR_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoDatePicker;

        } else if (this.kendoDropDownList) {

            templateDirectives = KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoDropDownList;

        } else if (this.kendoMultiSelect) {

            templateDirectives = KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoMultiSelect;

        } else if (this.kendoUpload) {

            templateDirectives = KENDO_UPLOAD_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoUpload;
        }

        Object.keys(templateDirectives || ({} as any)).forEach((key: string) => {

            if (templateDirectives[key] === directive.type) {
                viewChild[key] = directive;
            }
        });
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templateDirectives
            .filter(directive => directive.type.startsWith("kendo"))
            .forEach(directive => this.setTemplateDirective(directive));
    }

    onFocus($event: null): void {

        this.focus.emit(
            {
                $event: $event,
                context: this.context,
                control: this.control,
                group: this.group,
                model: this.model
            }
        );
    }

    onBlur($event: null): void {

        this.blur.emit(
            {
                $event: $event,
                context: this.context,
                control: this.control,
                group: this.group,
                model: this.model
            }
        );
    }

    static getFormControlType(model: DynamicFormControlModel): KendoFormControlType | null {

        switch (model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return KendoFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return KendoFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                return KendoFormControlType.CheckboxGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                let datepickerModel = model as DynamicDatePickerModel;

                return datepickerModel.inline ? KendoFormControlType.Calendar : KendoFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                return KendoFormControlType.Upload;

            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return KendoFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                let inputModel = model as DynamicInputModel;

                if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE) {
                    return KendoFormControlType.DateInput;

                } else if (!inputModel.mask && inputModel.list && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.AutoComplete;

                } else if (inputModel.mask && inputModel.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.MaskedTextBox;

                } else if (!inputModel.mask && inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.NumericTextBox;

                } else {
                    return KendoFormControlType.Input;
                }

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return KendoFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                let selectModel = model as DynamicSelectModel<any>;

                return selectModel.multiple ? KendoFormControlType.MultiSelect : KendoFormControlType.DropDownList;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return KendoFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return KendoFormControlType.Switch;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return KendoFormControlType.TextArea;

            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return KendoFormControlType.TimePicker;

            default:
                return null;
        }
    }
}