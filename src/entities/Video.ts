type TVideoConstructor = {
    id: string;
    title: string;
    description: string | null;
    url: string;
    uploadedBy: string;
    uploadedOn: string;
};

export default class Video {
    public readonly id: string;
    public readonly title: string;
    public readonly description: string | null;
    public readonly url: string;
    public readonly uploadedBy: string;
    public readonly uploadedOn: string;

    public constructor(props: TVideoConstructor) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.url = props.url;
        this.uploadedBy = props.uploadedBy;
        this.uploadedOn = props.uploadedOn;
    }
}
