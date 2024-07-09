export interface ResponseAuthors {
    id: string;
    name: string;
    surname:string;
  }

  export interface ResponseBooks {
    id: string;
    title: string;
    description:string;
    authorID:string;
    categoryID:string;
  }