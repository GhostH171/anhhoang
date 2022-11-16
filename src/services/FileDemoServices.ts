import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/webs";
import {
  fileFromAbsolutePath,
  fileFromPath,
  IFile,
  IFileAddResult,
} from "@pnp/sp/files";

export default class FileServices {
  private sp: SPFI;
  public constructor(context: WebPartContext) {
    this.sp = spfi().using(SPFx({ pageContext: context.pageContext }));
  }

  public async create(folderName: string, file: File) {
    let input = <HTMLInputElement>document.getElementById("thefileinput");
    const fileNamePath = encodeURI(file.lastModified.toString() + file.name);
    let result: IFileAddResult;
    if (file.size <= 10485760) {
      result = await this.sp.web
        .getFolderByServerRelativePath(folderName)
        .files.addUsingPath(fileNamePath, file, { Overwrite: true });
    } else {
      // large upload
      result = await this.sp.web
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
    return "demo";
  }

  public async getFile(fileName: string): Promise<IFile> {
    const res = await this.sp.web.getFileByUrl(fileName);
    console.log(await res.getBlob());
    console.log(await res.getItem());

    return this.sp.web.getFileByUrl(fileName);
  }
}
