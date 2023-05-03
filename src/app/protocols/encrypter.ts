export interface Encrypter {
  encrypt: (value: string) => Promise<string>;
  compare: (value: string, hashValue: string) => Promise<boolean>;
}
