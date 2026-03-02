export interface DeviceRow {
  id: string;
  name: string;
  requisiteId: string;
  requisiteDisplay: string;
  traderId: string;
  traderName: string;
  battery: number;
  operator: string;
  isActive: boolean;
  healthcheck: string;
}
