import { randomUUID } from "crypto";

export interface PostProps {
    authorId: string;
    partners: string
    contribution?: number
    sharedCosts?: string
    about: string
    city: string;
    state: string;
    createdAt?: Date
}

export class Post {
    private _id: string;
    private props: PostProps;

    constructor(props: PostProps, id?: string){
        this._id = id ?? randomUUID()
        this.props = props
    }


    public get id(): string {
        return this._id
    }

    public get authorId(): string {
        return this.props.authorId
    }

    public get partners(): string {
        return this.props.partners
    }

    public set partners(partners: string) {
        this.props.partners = partners
    }

    public get contribution(): number {
        return this.props.contribution
    }

    public set contribution(contribution: number) {
        this.props.contribution = contribution
    }

    public get sharedCosts(): string {
        return this.props.sharedCosts
    }

    public set sharedCosts(sharedCosts: string) {
        this.props.sharedCosts = sharedCosts
    }

    public get about(): string {
        return this.props.about
    }

    public set about(about: string) {
        this.props.about = about
    }

    public get city(): string {
        return this.props.city
    }

    public set city(city: string) {
        this.props.city = city
    }

    public get state(): string {
        return this.props.state
    }

    public set state(state: string) {
        this.props.state = state
    }

    public get createdAt(): Date {
        return this.props.createdAt
    }

}