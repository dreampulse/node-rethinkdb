import r from 'rethinkdb';

export default class Database {
  connection = null;

  con() {
    if (this.connection) return Promise.resolve(this.connection);

    return r.connect(this.conOptions)
      .then(con => {
        this.connection = con;
        return con;
      });
  }

  run(cmd) {
    return this.con().then(con => cmd.run(con));
  }

  constructor(conOptions) {
    this.conOptions = conOptions;
  }
};

export r;
