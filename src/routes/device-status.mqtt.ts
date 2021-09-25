import { MQTTQoS, MQTTRouter, MQTTSubscriptionOptions } from "../mqtt";
import { DeviceClassService } from "../services";
import { DeviceClass } from "../types";

export const DeviceClassMQTTRouter = (router: MQTTRouter, deviceClassSvc: DeviceClassService): void => {
    const prefix = `[DeviceClassMQTT]`;

    router.onReceive('spotify/device-class-heartbeat', 
                    <MQTTSubscriptionOptions>{ qos: MQTTQoS.AT_MOST_ONCE, nl: true }, 
                    (payload) => {
        // Use Heartbeat to log device tick on the service
        console.log(`${prefix} Topic 'spotify/device-class-heartbeat' called with payload ${payload}`);
        const deviceClass = <DeviceClass>JSON.parse(payload);
        deviceClassSvc.UpdateDeviceClassHeartbeat(deviceClass);
    })

}