import { UserDto } from "../dto/UserDto";

export class User {
  public firstName: string;
  public lastName: string;
  public alias: string;
  public imageUrl: string;

  public constructor(
    firstName: string,
    lastName: string,
    alias: string,
    imageUrl: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.alias = alias;
    this.imageUrl = imageUrl;
  }

  /*
  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  

  public get alias(): string {
    return this._alias;
  }

  public set alias(value: string) {
    this._alias = value;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  public set imageUrl(value: string) {
    this._imageUrl = value;
  }
    */

  public get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  public equals(other: User): boolean {
    return this.alias === other.alias;
  }

  public static fromJson(json: string | null | undefined): User | null {
    if (!!json) {
      const jsonObject: {
        _firstName: string;
        _lastName: string;
        _alias: string;
        _imageUrl: string;
      } = JSON.parse(json);
      return new User(
        jsonObject._firstName,
        jsonObject._lastName,
        jsonObject._alias,
        jsonObject._imageUrl
      );
    } else {
      return null;
    }
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  /*
  public toJson(): object {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      alias: this._alias,
      imageUrl: this._imageUrl,
    };
  }
  */

  public get dto(): UserDto {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      alias: this.alias,
      imageUrl: this.imageUrl,
    };
  }

  public static fromDto(dto: UserDto | null): User | null {
    return dto == null
      ? null
      : new User(dto.firstName, dto.lastName, dto.alias, dto.imageUrl);
  }
}
