import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  InvoiceDto,
  InvoiceDtoPagedResultDto,
  InvoiceServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { CreateInvoiceDialogComponent } from "./create-invoice-dialog/create-invoice-dialog.component";

class PagedInvoiceRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  animations: [appModuleAnimation()],
})
export class InvoicesComponent extends PagedListingComponentBase<InvoiceDto> {
  invoices: InvoiceDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _invoicesService: InvoiceServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedInvoiceRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._invoicesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: InvoiceDtoPagedResultDto) => {
        this.invoices = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  createInvoice(): void {
    this.showCreateOrEditRoleDialog();
  }

  showCreateOrEditRoleDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        CreateInvoiceDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      // createOrEditRoleDialog = this._modalService.show(
      //   EditRoleDialogComponent,
      //   {
      //     class: "modal-lg",
      //     initialState: {
      //       id: id,
      //     },
      //   }
      // );
    }

    createOrEditRoleDialog?.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(entity: InvoiceDto): void {}
}
