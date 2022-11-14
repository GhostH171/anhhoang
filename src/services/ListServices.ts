// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
// import { createBatch } from "@pnp/sp/batching";

// interface IGetListOptions {
//   select?: string[];
//   expand?: string[];
//   filter?: string;
//   orderBy?: {
//     type: string;
//     asc: boolean;
//   };
//   top?: number;
// }
// interface IGetByIDOptions {
//   select?: string[];
//   expand?: string[];
// }

export const ListServices = (): void => {
  // let sp: SPFI;
  // let context: WebPartContext;

  // sp = spfi().using(SPFx({ pageContext: context.pageContext }));

  // async function getList(listName: string, options?: IGetListOptions) {
  //   const api = sp.web.lists.getByTitle(listName).items;

  //   if (options) {
  //     const { select, filter, orderBy, expand, top } = options;

  //     if (filter) {
  //       api.filter(filter);
  //     }

  //     if (orderBy) {
  //       api.orderBy(orderBy.type, orderBy.asc);
  //     }

  //     if (select) {
  //       api.select(...select);
  //     }

  //     if (top) {
  //       api.top(top);
  //     }

  //     if (expand) {
  //       api.expand(...expand);
  //     }
  //   }
  //   return api();
  // }
  // async function create(listName: string, formData: {}) {
  //   return sp.web.lists.getByTitle(listName).items.add({ ...formData });
  // }
};
