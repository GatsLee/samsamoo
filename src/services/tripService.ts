import { MOCK_TRIPS } from "@/mocks/trips";
import { MOCK_ROLE_GROUPS } from "@/mocks/roles";
import type { RoleGroup } from "@/types/role";
import type { Trip, TripCreateRequest } from "@/types/trip";
import { mockDelay, request, USE_MOCK } from "./apiClient";

export async function getTrips(): Promise<Trip[]> {
  if (USE_MOCK) {
    return mockDelay(MOCK_TRIPS);
  }
  return request<Trip[]>("/trips");
}

export async function getRoleGroups(): Promise<RoleGroup[]> {
  if (USE_MOCK) {
    return mockDelay(MOCK_ROLE_GROUPS, 200);
  }
  return request<RoleGroup[]>("/roles");
}

export async function createTrip(payload: TripCreateRequest): Promise<Trip> {
  if (USE_MOCK) {
    return mockDelay({
      id: `t_${Date.now()}`,
      name: payload.name,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: "UPCOMING",
      dDay: 0,
      memberCount: payload.roleCodes.length,
      confirmedCount: 0,
      totalCount: 0,
    });
  }
  return request<Trip>("/trips", { method: "POST", body: payload });
}
