// Manages all network related tasks.
export default class NetworkManager {
    private readonly allowFetch: boolean;
    private testLongitude: number = -2;

    public constructor(enableFetching: boolean) {
        this.allowFetch = enableFetching;
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
    // Uses the ipapi API (https://ipapi.co/). MAXIMUM OF 30,000 REQUESTS/MONTH.
    public async getIPLocation(ip: string): Promise<any[]> {
        if (this.allowFetch) {
            console.log(`Fetching...`);
            const rawData: Response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await rawData.json();
            if (!data.error) {
                console.log("Complete.");
                return [data.latitude, data.longitude];
            } else {
                console.error(`No location for this IP address. Reason: ${data.reason}`);
                return [];
            }
        } else {
            console.error("LIVE DATA FETCHING DISABLED.")
            this.testLongitude += 4;
            return [52, this.testLongitude];
        }
    }
}