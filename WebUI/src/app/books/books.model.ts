export interface ResponseBooks {
    id: string;
    title: string;
    description:string;
    authorID:string;
    categoryID:string;
  }

  export interface ResponseAuthors {
    id: string;
    name: string;
    surname:string;
  }
  export interface ResponseCategories {
    id: string;
    name: string;
  }