import {Injectable} from '@angular/core';
import {Movie} from "../models/movie.model";
import {Review} from "../models/review.model";

declare function openDatabase(name: string,
                              version: string,
                              displayName: string,
                              size: number,
                              creationCallback: any): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() {
  }

  private static errorHandler(error: any) {
    console.error(`Error: ${error.message}`);
  }

  private createDatabase() {
    let name = "MovieDB";
    let version = "1.0";
    let displayName = "DB for Quiz app";
    let size = 2 * 1024 * 1024;

    this.db = openDatabase(name, version, displayName, size, () => {
      console.log("Success: Database created successfully");
    });
  }

  private getDatabase(): any {
    if (this.db == null) {
      this.createDatabase();
    }
    return this.db;
  }


  private createTables() {
    function txFunction(tx: any) {
      var dropMovie = "DELETE FROM movie " +
        "WHERE movie_id BETWEEN 1 AND 4;";
      let movieTable: string = "CREATE TABLE IF NOT EXISTS movie("
        + "movie_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "movie_name VARCHAR(500) NOT NULL,"
        + "movie_genre VARCHAR(300) NOT NULL,"
        + "movie_actors VARCHAR(500) NOT NULL,"
        + "movie_description VARCHAR(1000) NOT NULL);";
      let reviewTable: string = "CREATE TABLE IF NOT EXISTS review("
        + "review_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "movie_id INTEGER NOT NULL,"
        + "review_text VARCHAR(300) NOT NULL,"
        + "review_rating INTEGER NOT NULL,"
        + "FOREIGN KEY(movie_id) REFERENCES movie(movie_id));";
      var insertMovies = "INSERT INTO movie(movie_id, movie_name, movie_genre, movie_actors, movie_description) "
        + "VALUES (1, 'John Wick: Chapter 4', 'Action', 'Keanu Reeves, Laurence Fishburne, George Georgiou', 'With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.'),"
        + "(2, 'The Super Mario Bros. Movie', 'Adventure', 'Chris Pratt, Anya Taylor-Joy, Charlie Day', 'With help from Princess Peach, Mario gets ready to square off against the all-powerful Bowser to stop his plans from conquering the world.'),"
        + "(3, 'Avatar', 'Adventure', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.'),"
        + "(4, 'Avengers: Endgame', 'Action', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.');";

      var insertMovies1 = "INSERT INTO movie(movie_name, movie_genre, movie_actors, movie_description) "
        + "VALUES ('Joh', 'Action', 'Keu', 'Wickto Japan to Berlin.'),"
        + "('Te', 'Adventure', 'Ch Day', 'WitPeach, Marid.'),"
        + "('Aar', 'Adventure', 'Saer', 'A pome.'),"
        + "('Ave', 'Action', 'Ro o', 'After the devastating.');";
      let options: any[] = [];

      tx.executeSql(dropMovie, options, () => {
        console.log("Success: movie table dropped successfully")
      }, DatabaseService.errorHandler);
      tx.executeSql(movieTable, options, () => {
        console.log("Success: movie table created successfully")
      }, DatabaseService.errorHandler);
      tx.executeSql(reviewTable, options, () => {
        console.log("Success: review table created successfully")
      }, DatabaseService.errorHandler);
      tx.executeSql(insertMovies, options, () => {
        console.log("Success: Movies inserted successfully")
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Create tables transaction successful");
    });
  }

  private dropTables() {
    function txFunction(tx: any) {
      let dropMovie: string = "DROP TABLE IF EXISTS movie;";
      let dropReview: string = "DROP TABLE IF EXISTS review;";
      let options: any[] = [];
      tx.executeSql(dropMovie, options, () => {
        console.log("Success: table dropped successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(dropReview, options, () => {
        console.log("Success: table dropped successfully");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Drop tables transaction successful");
    });
  }

  public initDB() {
    try {
      this.createDatabase();
      this.createTables();
    } catch (err: any) {
      console.error("Error in initDB: " + err.message);
    }
  }

  public clearDB() {
    let result = confirm("Really want to clear database?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
    }
  }

  //crud operations

  public insertMovie(movie: Movie): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let quizInsert = "INSERT INTO movie(movie_name, movie_genre, movie_actors, movie_description) VALUES(?,?,?,?);";
        let options: any[] = [movie.name, movie.genre, movie.actors, movie.description]
        tx.executeSql(quizInsert, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: movie insert transaction successful");
      });
    });
  }



  public insertReview(review: Review, mId: number): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let questionsInsert = "INSERT INTO review(movie_id, review_text, review_rating) VALUES(?,?,?);";
        let options: any[] = [mId, review.reviewText, review.reviewRating]
        tx.executeSql(questionsInsert, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: review insert transaction successful");
      });
    });
  }

  public selectAllMovies(): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM movie;";
        let options: any[] = [];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          let movie: Movie[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let m = new Movie(row['movie_name'], row['movie_genre'], row['movie_actors'], row['movie_description']);
            m.id = row['movie_id'];
            movie.push(m);
          }
          resolve(movie);


        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: SelectAll movies transaction successful");
      });
    });
  }

  public selectAllReviews(): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM review;";
        let options: any[] = [];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          let review: Review[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let r = new Review(row['movie_id'], row['review_text'], row['review_rating']);
            r.id = row['review_id'];
            review.push(r);
          }
          resolve(review);


        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: SelectAll movies transaction successful");
      });
    });
  }

  public selectMovie(id: number): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM movie WHERE movie_id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          let row = results.rows[0];
          let movie = new Movie(row['movie_name'], row['movie_genre'], row['movie_actors'], row['movie_description']);
          movie.id = row['movie_id'];
          resolve(movie);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select movie transaction successful");
      });
    });
  }

  public selectReview(id: number): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM reviews WHERE review_id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          let row = results.rows[0];
          let review = new Review(row['movie_id'], row['review_text'], row['review_rating']);
          review.id = row['review_id'];
          resolve(review);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select review transaction successful");
      });
    });
  }

  public deleteMovie(movie: Movie): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "DELETE FROM movie WHERE movie_id=?;";

        let options: any[] = [movie.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete movie transaction successful");
      });
    });
  }

  public deleteReview(review: Review): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "DELETE FROM review WHERE review_id=?;";

        let options: any[] = [review.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete review transaction successful");
      });
    });
  }

  public updateMovie(movie: Movie): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "UPDATE movie SET movie_name=?, movie_genre=?, movie_actors=?, movie_description=? WHERE movie_id=?;";

        let options: any[] = [movie.name, movie.genre, movie.actors, movie.description, movie.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update movie transaction successful");
      });
    });
  }

  public updateReviews(review: Review): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "UPDATE review SET review_text=?, review_rating=?, WHERE review_id=?;";

        let options: any[] = [review.reviewText, review.reviewRating, review.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          resolve(results);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update review transaction successful");
      });
    });
  }
}
