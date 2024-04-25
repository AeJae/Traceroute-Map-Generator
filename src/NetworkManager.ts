export default class NetworkManager {
    public constructor() {
        console.log("READY: Network Manager");
    }

    // Returns IP addresses fetched from the server
    private async fetchData(): Promise<any> {
        console.log("Fetching...")
        const response: Response = await fetch("/get-addresses", {method: "POST"});
        console.log("Parsing...")
        return await response.json();
    }

    // Loads the IP address JSON file and adds their locations to the map.
    public async getAddresses(): Promise<any[]> {
        // Get IP addresses from server.
        const addresses = await this.fetchData().catch((): any[] => {
            console.log("Failed to reach server.");
            return [];
        });
        return addresses.list;
    }
}