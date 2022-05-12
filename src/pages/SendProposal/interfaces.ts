export interface IProposal {}

export interface IProps {
  fs: string;
  color: string;
  mb?: string;
}


export interface IFormValue {
  Attachments?: any
  coverLetter: string
  freelancerValue?: string
  jobOwnerValue: number
}

export interface IFile {
  name: string,
  uid: string,
  thumbUrl: string
}
export interface IFileUpload {
  fileList: [IFile]
}
