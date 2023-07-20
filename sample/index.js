import grpc from '@grpc/grpc-js';
import protobuf from 'protobufjs';

const grpcServerUrl = process.env.TKRZW_HOST;
const Client = grpc.makeGenericClientConstructor({})
const client = new Client(grpcServerUrl, grpc.credentials.createInsecure())
const rpcImpl = function(method, requestData, callback) {
    const service = method.parent;
    const namespace = service.parent;
    const methodCallName = "/" + namespace.name + "." + service.name + "/" + method.name;
    client.makeUnaryRequest(
        methodCallName,
        (arg) => {
            return arg;
        },
        (arg) => {
            return arg;
        },
        requestData,
        callback
    )
};

protobuf.load("tkrzw_rpc.proto", function(err, root) {
    if (err) {
        console.error(err)
        return;
    }

    const DBMService = root.lookup("DBMService");
    const dbm = DBMService.create(rpcImpl, false, false);

    (async (dbm) => {
        try {
            let key = Buffer.from('index');
            let value = Buffer.from('Hello! TKRZW!');

            console.info("SET >> ", key, value);

            await dbm.set({ key, value })

            let result = await dbm.get({ key })

            console.info("GET >> ", result);

            console.assert(Buffer.compare(value, result.value) === 0);
        }
        catch (e) {
            console.error(e)
        }
    })(dbm)
})



