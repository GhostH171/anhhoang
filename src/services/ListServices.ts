import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import { createBatch } from "@pnp/sp/batching";
import { addTimeToFileName } from "../helpers/function";

interface IGetListOptions {
  select?: string[];
  expand?: string[];
  filter?: string;
  orderBy?: {
    type: string;
    asc: boolean;
  };
  top?: number;
}

interface IGetByIDOptions {
  select?: string[];
  expand?: string[];
}

export default class ListServices {
  private sp: SPFI;

  public constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx({ pageContext: context.pageContext }));
  }

  public async getList(listName: string, options?: IGetListOptions) {
    const api = this.sp.web.lists.getByTitle(listName).items;

    if (options) {
      const { select, filter, orderBy, expand, top } = options;

      if (filter) {
        api.filter(filter);
      }

      if (orderBy) {
        api.orderBy(orderBy.type, orderBy.asc);
      }

      if (select) {
        api.select(...select);
      }

      if (top) {
        api.top(top);
      }

      if (expand) {
        api.expand(...expand);
      }
    }

    return api();
  }

  public async getByID(
    listName: string,
    id: number,
    options?: IGetByIDOptions
  ) {
    const api = this.sp.web.lists.getByTitle(listName).items.getById(id);

    if (options) {
      const { select, expand } = options;

      if (select) {
        api.select(...select);
      }

      if (expand) {
        api.expand(...expand);
      }
    }

    return api();
  }

  public async create(listName: string, formData: {}) {
    return this.sp.web.lists.getByTitle(listName).items.add({ ...formData });
  }

  public async editByID(listName: string, id: number, formData: {}) {
    return this.sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .update({ ...formData });
  }

  public async deleteByIds(listName: string, ids: []) {
    const list = this.sp.web.lists.getByTitle(listName);
    const [batchedListBehavior, execute] = createBatch(list);

    list.using(batchedListBehavior);

    ids.forEach((id) => {
      list.items.getById(id).delete();
    });

    return execute();
  }

  public async getAttachmentById(listName: string, id: number) {
    return this.sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .attachmentFiles();
  }

  public async addAttachment(
    listName: string,
    id: number,
    filePickerResult: File
  ) {
    return this.sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .attachmentFiles.add(
        addTimeToFileName(filePickerResult.name),
        filePickerResult
      );
  }

  public async recycleAttachment(
    listName: string,
    id: number,
    fileName: string
  ) {
    return this.sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .attachmentFiles.getByName(fileName)
      .recycle();
  }

  public async addAttachments(
    listName: string,
    id: number,
    filePickerResult: File[]
  ) {
    const list = this.sp.web.lists;

    return new Promise(async (resolve, reject) => {
      const promiseAll = [];

      try {
        if (filePickerResult && filePickerResult.length > 0) {
          for (let i = 0; i < filePickerResult.length; i++) {
            let file = await filePickerResult[i];

            promiseAll.push(
              list
                .getByTitle(listName)
                .items.getById(id)
                .attachmentFiles.add(file.name, file)
            );
          }
          resolve(Promise.all(promiseAll));
        } else reject();
      } catch (err) {
        reject(err);
      }
    });
  }

  public async recycleAttachments(
    listName: string,
    id: number,
    filesName: string[]
  ) {
    const [batchedSP, execute] = this.sp.batched();

    const item = await batchedSP.web.lists
      .getByTitle(listName)
      .items.getById(id);

    filesName.forEach((fileName) => {
      item.attachmentFiles.getByName(fileName).recycle();
    });

    return execute();
  }
}
