export class Movie {
  id: number = -1;
  name: string = "";
  genre: string = "";
  actors: string = "";
  description: string = "";

  constructor(name: string, genre: string, actors: string, description: string) {
    this.name = name;
    this.genre = genre;
    this.actors = actors;
    this.description = description;
  }
}
