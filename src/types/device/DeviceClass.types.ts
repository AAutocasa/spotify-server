
export enum CapabilityRoleCode {
    RGB_STRIPE = 0,
    RGB_MATRIX = 1,
}

export type DeviceClass = {
    roleCode: CapabilityRoleCode,
    ledCount: number,
}

export type DeviceClassHeartbeat = DeviceClass & {
    lastUpdateTimestamp: number // ms, utc
}
