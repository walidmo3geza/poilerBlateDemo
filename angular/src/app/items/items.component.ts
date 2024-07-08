import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  ItemDto,
  ItemDtoPagedResultDto,
  ItemsServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateItemDialogComponent } from "./create-item-dialog/create-item-dialog.component";

class PagedItemRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  animations: [appModuleAnimation()],
})
export class ItemsComponent extends PagedListingComponentBase<ItemDto> {
  items: ItemDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _rolesService: ItemsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedItemRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._rolesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ItemDtoPagedResultDto) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  createRole(): void {
    this.showCreateOrEditRoleDialog();
  }

  showCreateOrEditRoleDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        CreateItemDialogComponent,
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

  protected delete(entity: ItemDto): void {}
}
