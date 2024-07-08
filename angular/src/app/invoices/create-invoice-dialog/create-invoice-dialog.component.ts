import { Component, Injector, Output, EventEmitter } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  InvoiceDto,
  InvoiceServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-create-invoice-dialog",
  templateUrl: "./create-invoice-dialog.component.html",
})
export class CreateInvoiceDialogComponent extends AppComponentBase {
  saving = false;
  invoice = new InvoiceDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _invoiceService: InvoiceServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;

    const invoice = new InvoiceDto();
    invoice.init(this.invoice);

    this._invoiceService.create(invoice).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
