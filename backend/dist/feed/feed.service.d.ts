export declare class FeedService {
    private userRepository;
    private feedRepository;
    private readonly graph_URL;
    private readonly version;
    pullingfeed(username: string): Promise<any>;
    getFeed(username: string): Promise<any>;
    getFeedId(username: string, id: number): Promise<any>;
}
