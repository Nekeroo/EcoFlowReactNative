export class Event {
    id?: number;
    name: string;
    address: string;
    city: string;
    nbUsers: number;
    description?: string;
    images?: any;
  
    constructor(
      name: string,
      address: string,
      city: string,
      nbUsers: number,
      description?: string,
      images?: any
    ) {
      this.id = Math.random();
      this.name = name;
      this.address = address;
      this.city = city;
      this.nbUsers = nbUsers;
      this.description = description;
      this.images = images;
    }

}