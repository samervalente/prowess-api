import { randomUUID } from "crypto"

export interface PostProps {
    authorId: string
    partners: string
    contribution?: number
    sharedCosts?: string
    about: string
    city: string;
    state: string;
    createdAt: Date
}


export class Post {
    private _id: string;
    private props: PostProps;

    constructor(props: PostProps, id?: string){
        this._id = id ?? randomUUID();
        this.props = props
    }


    public get id(): string {
        return this._id
    }

    public get authorId(): string {
        return this.authorId
    }

    public get partners(): string {
        return this.authorId
    }

    public set partners(partners: string) {
        this.partners = partners
    }

    public get constribution(): number {
        return this.constribution
    }

    public set constribution(constribution: number) {
        this.constribution = constribution
    }

    public get sharedCosts(): string {
        return this.authorId
    }

    public set sharedCosts(sharedCosts: string) {
        this.sharedCosts = sharedCosts
    }

    public get about(): string {
        return this.authorId
    }

    public set about(about: string) {
        this.about = about
    }

    public get city(): string {
        return this.city
    }

    public set city(city: string) {
        this.city = city
    }

    public get state(): string {
        return this.state
    }

    public set state(state: string) {
        this.city = state
    }

    public get createdAt(): string {
        return this.authorId
    }

}