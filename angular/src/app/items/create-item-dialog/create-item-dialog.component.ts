import { Component, Injector, Output, EventEmitter } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  ItemDto,
  ItemsServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  templateUrl: "./create-item-dialog.component.html",
})
export class CreateItemDialogComponent extends AppComponentBase {
  saving = false;
  item = new ItemDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _itemService: ItemsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;

    const item = new ItemDto();
    item.init(this.item);

    this._itemService.create(item).subscribe(
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
