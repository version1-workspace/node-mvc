
class User {
  static create(params) {
    if (!params?.name || !params?.email) {
      return null;
    }

    const user = new User(params)
    user.save();
    return user;
  }

  static findAll() {
    return datasource.map((data) => new User(data));
  }

  static find(id) {
    const data = datasource.find((data) => String(data.id) === String(id));
    if (!data) {
      return null;
    }
    return new User(data);
  }


  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  get attributes() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  save() {
    const target = User.find(this.id);
    if (target) {
      target.name = this.name;
      target.email = this.email;
      target.updatedAt = new Date();

      const index = datasource.findIndex((data) => String(data.id) === String(this.id));
      if (index !== -1) {
        datasource[index] = target.attributes;
      }
    } else {
      this.id = datasource.length + 1;
      datasource.push(this.attributes);
    }
  }

  destroy() {
    const index = datasource.findIndex((data) => String(data.id) === String(this.id));
    if (index !== -1) {
      datasource.splice(index, 1);
    }
  }
}

const datasource = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Mary Doe',
    email: 'mary@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Andy Doe',
    email: 'andy@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

module.exports = User;
