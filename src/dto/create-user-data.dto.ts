export class CreateUserDataDto {
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly description?: string;
  readonly photo?: string;
  readonly thumbnail?: string;
}
