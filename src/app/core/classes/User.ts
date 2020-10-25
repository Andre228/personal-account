export class User {

  private id: number = 0;
  private name: string = '';
  private age: number = 0;
  private job: string = '';
  private login: string = '';
  private password: string = '';


  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.age = user.age;
    this.job = user.job;
    this.login = user.login;
    this.password = user.password;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number) {
    this.age = age;
  }

  getJob(): string {
    return this.job;
  }

  setJob(job: string) {
    this.job = job;
  }

  getLogin(): string {
    return this.login;
  }

  setLogin(login: string) {
    this.login = login;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

}
