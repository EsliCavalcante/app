export type Monitoring = {
	id: string;
	position: string;
	temperature: number | null;
	supply: number | null;
	return: number | null;
	remarks?: string;
};

export type MonitoringStoreState = {
	monitorings: Monitoring[];
};

export type MonitoringStoreActions = {
	addMonitoring: (monitoring: Monitoring) => void;
	updateMonitoring: (monitoring: Monitoring) => void;
	removeMonitoring: (id: string) => void;
	setMonitorings: (monitorings: Monitoring[]) => void;
	mergeMonitorings: (monitorings: Monitoring[]) => void;
	clearMonitorings: () => void;
};

export type MonitoringStore = MonitoringStoreState & MonitoringStoreActions;
