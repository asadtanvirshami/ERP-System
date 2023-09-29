
export type Tasks = {
    id:string,
    title:string,
    description:string,
    start_date:number,
    start_time:number,
    end_date:string,
    end_time:string,
    priority:string,
    code:string,
    asignees:Array<[{id:string, email:string}]>,
    status:string
  }
  