import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MonitoringStore, MonitoringStoreState } from "./type";

const MONITORING_STORE_KEY = "monitoring-store";

const initialMonitoringState: MonitoringStoreState = {
	monitorings: [
		{
			id: "hlbu1234567",
			position: "",
			temperature: 10,
			supply: null,
			return: null,
			remarks: "",
		},
	],
};

export const useMonitoringStore = create<MonitoringStore>()(
	persist(
		(set) => ({
			monitorings: initialMonitoringState.monitorings,
			addMonitoring: (monitoring) =>
				set((state) => {
					const existingMonitoringIndex = state.monitorings.findIndex(
						(item) =>
							item.id.toLowerCase() ===
							monitoring.id.toLowerCase(),
					);

					if (existingMonitoringIndex === -1) {
						return {
							monitorings: [monitoring, ...state.monitorings],
						};
					}

					throw new Error("duplicate monitoring error");
				}),
			updateMonitoring: (monitoring) =>
				set((state) => {
					const existingMonitoringIndex = state.monitorings.findIndex(
						(item) =>
							item.id.toLowerCase() ===
							monitoring.id.toLowerCase(),
					);

					if (existingMonitoringIndex === -1) {
						throw new Error("monitoring not found error");
					}

					const updatedMonitorings = [...state.monitorings];
					updatedMonitorings[existingMonitoringIndex] = monitoring;

					return { monitorings: updatedMonitorings };
				}),
			removeMonitoring: (id) =>
				set((state) => ({
					monitorings: state.monitorings.filter(
						(item) => item.id.toLowerCase() !== id.toLowerCase(),
					),
				})),
			setMonitorings: (monitorings) => set({ monitorings }),
			mergeMonitorings: (monitorings) =>
				set((state) => {
					const updatedMonitorings = [...state.monitorings];
					const newMonitorings = [];

					for (const monitoring of monitorings) {
						const existingMonitoringIndex =
							updatedMonitorings.findIndex(
								(item) =>
									item.id.toLowerCase() ===
									monitoring.id.toLowerCase(),
							);

						if (existingMonitoringIndex >= 0) {
							updatedMonitorings[existingMonitoringIndex] =
								monitoring;
							continue;
						}

						newMonitorings.push(monitoring);
					}

					return {
						monitorings: [...newMonitorings, ...updatedMonitorings],
					};
				}),
			clearMonitorings: () => set({ monitorings: [] }),
		}),
		{
			name: MONITORING_STORE_KEY,
			storage: createJSONStorage(() =>
				typeof window !== "undefined"
					? localStorage
					: {
							getItem: () => null,
							setItem: () => undefined,
							removeItem: () => undefined,
						},
			),
			partialize: (state) => ({
				monitorings: state.monitorings,
			}),
		},
	),
);
