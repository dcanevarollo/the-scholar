export class Archive {

  constructor(
    public id: string,
    public name: string,
    public path: string,
    public type: string,
    public createdAt: number,
    public userId: string,
    public formattedDate?: string,
  ) { }

}
