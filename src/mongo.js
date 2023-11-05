const {MongoClient} = require('mongodb');
async function main() {
	const uri = "mongodb+srv://ana:sasa@anap.mongodb.net/selectEDU?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    await listDatabases(client);
    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);