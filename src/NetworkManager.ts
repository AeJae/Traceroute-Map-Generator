// Manages all network related tasks.
export default class NetworkManager {
    private readonly allowFetch: boolean;
    private readonly useAccount: boolean;
    private readonly key: string = "";
    private testLongitude: number = -2;

    public constructor(enableFetching: boolean, ipregistryKey?: string) {
        console.log("AWAIT: Network Manager");
        this.allowFetch = enableFetching;
        // If an account key was provided...
        if (typeof ipregistryKey !== 'undefined') {
            if (!this.allowFetch) console.warn("You have provided your Ipregistry key with live data disabled.");
            this.useAccount = true;
            this.key = ipregistryKey;
        } else {
            this.useAccount = false;
        }
        console.log("READY: Network Manager");
    }

    // Returns IP addresses fetched from the server
    private async fetchData(): Promise<any> {
        console.log("Fetching...")
        const response: Response = await fetch("/get-addresses", {method: "POST"});
        return await response.json();
    }

    // Loads the IP address JSON file and adds their locations to the map.
    public async getAddresses(): Promise<any[]> {
        // Get IP addresses from server.
        const addresses = await this.fetchData().catch((): any[] => {
            console.log("Failed to reach server.");
            return [];
        });
        console.log("Complete.")
        return addresses.list;
    }

    // Returns the latitude and longitude of a passed IP address as an array.
    // Uses the ipapi API (https://ipapi.co/).            MAXIMUM OF 30,000 REQUESTS/MONTH.
    // Or the Ipregistry API (https://ipregistry.co/).    REQUIRES ACCOUNT. 100,000 FREE CREDITS.
    public async getIPLocation(ip: string): Promise<any[]> {
        if (this.allowFetch) {
            // Whether to use Ipregistry or ipapi
            // Ipregistry
            if (this.useAccount) {
                console.log("Fetching with Ipregistry...");
                const rawData: Response = await fetch(`https://api.ipregistry.co/${ip}?key=${this.key}`);
                const data = await rawData.json();
                if (data.location.latitude && data.location.longitude) {
                    console.log("Complete.");
                    return [data.location.latitude, data.location.longitude]
                } else {
                    console.error("No location data found.");
                    return [];
                }
            // ipapi
            } else {
                console.log("Fetching with Ipapi...");
                const rawData: Response = await fetch(`https://ipapi.co/${ip}/json/`);
                const data = await rawData.json();
                if (!data.error) {
                    console.log("Complete.");
                    return [data.latitude, data.longitude];
                } else {
                    console.error(`No location for this IP address. Reason: ${data.reason}`);
                    return [];
                }
            }
        // Live data disabled
        } else {
            console.warn("Live data is disabled.")
            this.testLongitude += 4;
            return [52, this.testLongitude];
        }
    }
}