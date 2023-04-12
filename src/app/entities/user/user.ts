import { randomUUID } from "crypto";
import { Replace } from "src/helpers/Replace";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  gender: string;
  imageUrl?: string;
  phone: string;
  birthDate: Date;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, {createdAt?: Date}>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public get id(): string{
    return this._id
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }


  public get gender(): string {
    return this.props.gender;
  }

  public set gender(gender: string) {
    this.props.gender = gender;
  }

  public get imageUrl(): string {
    return this.props.imageUrl;
  }

  public set imageUrl(imageUrl: string) {
    this.props.gender = imageUrl;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.gender = phone;
  }


  public get birthDate(): Date {
    return this.props.birthDate;
  }

  public set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
