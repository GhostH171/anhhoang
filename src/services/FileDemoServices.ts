import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/webs";
// import { IFileAddResult } from "@pnp/sp/files";

export default class FileServices {
  private sp: SPFI;
  constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx({ pageContext: context.pageContext }));
  }

  async create(folderName: string, file: File): Promise<void> {
    // let input = <HTMLInputElement>document.getElementById("thefileinput");
    const fileNamePath = encodeURI(file.lastModified.toString() + file.name);
    // let result: IFileAddResult;
    if (file.size <= 10485760) {
      await this.sp.web
        .getFolderByServerRelativePath(folderName)
        .files.addUsingPath(fileNamePath, file, { Overwrite: true });
    } else {
      // large upload
      await this.sp.web
        .getFolderByServerRelativePath(folderName)
        .files.addChunked(
          fileNamePath,
          file,
          (data) => {
            console.log(`progress`);
          },
          true
        );
    }
  }

  public async getFile(fileName: string) {
    const file = this.sp.web.getFileByUrl(fileName);
    console.log(file);
    const fileContent = await (await file).getItem();
    console.log("fileContent", fileContent);
  }
}
