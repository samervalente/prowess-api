export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  createdAt: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = { ...props };
  }

  getName(): string {
    return this.props.name;
  }

  setName(name: string): void {
    this.props.name = name;
  }

  getEmail(): string {
    return this.props.email;
  }

  setEmail(email: string): void {
    this.props.email = email;
  }

  getPassword(): string {
    return this.props.password;
  }

  setPassword(password: string): void {
    this.props.password = password;
  }

  getBirthDate(): string {
    return this.props.birthDate;
  }

  setBirthDate(birthDate: string): void {
    this.props.birthDate = birthDate;
  }

  getCreatedAt(): string {
    return this.props.createdAt;
  }
}
