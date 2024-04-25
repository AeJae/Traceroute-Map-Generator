export default class NetworkManager {
    constructor() {
        console.log("READY: Network Manager");
    }
    // Returns IP addresses fetched from the server
    async fetchData() {
        console.log("Fetching...");
        const response = await fetch("/get-addresses", { method: "POST" });
        console.log("Parsing...");
        return await response.json();
    }
    // Loads the IP address JSON file and adds their locations to the map.
    async getAddresses() {
        // Get IP addresses from server.
        const addresses = await this.fetchData().catch(() => {
            console.log("Failed to reach server.");
            return [];
        });
        return addresses.list;
    }
}
