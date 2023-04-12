import { Encrypter } from "src/app/protocols/encrypter";
import * as bcrypt from 'bcrypt'
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptAdapter implements Encrypter{
    private saltRounds: number;
    constructor(saltRounds: number){
        this.saltRounds = saltRounds
    }

    async encrypt (value: string): Promise<string> {
        const hashedValue = await bcrypt.hash(value, this.saltRounds)

        return hashedValue;
    }

    async compare(value: string, hashValue: string): Promise<boolean>{
        return await bcrypt.compare(value, hashValue)
    }
}