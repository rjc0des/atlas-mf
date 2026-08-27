import type { ColumnId, IncidentCard } from './types';

export const initialBoard: Record<ColumnId, IncidentCard[]> = {
  investigating: [
    {
      id: 'inc-142',
      title: 'API gateway p99 latency spike',
      description: 'us-east-1 gateway returning 2.4s p99, likely upstream DB connection pool exhaustion.',
      severity: 'critical',
    },
    {
      id: 'inc-141',
      title: 'Elevated 5xx on checkout-service',
      description: 'Error rate at 3.1%, correlates with last deploy of checkout-service v2.8.0.',
      severity: 'warning',
    },
  ],
  mitigating: [
    {
      id: 'dep-089',
      title: 'Deploy: notifications-service v1.14.2',
      description: 'Rolling restart in staging before prod promotion, canary at 25%.',
      severity: 'minor',
    },
  ],
  resolved: [
    {
      id: 'inc-138',
      title: 'Redis cache eviction storm',
      description: 'Root cause: maxmemory-policy misconfigured after node resize. Fixed and verified.',
      severity: 'warning',
    },
    {
      id: 'dep-085',
      title: 'Deploy: auth-service v3.2.0',
      description: 'Shipped OAuth token refresh fix, no regressions across 8 environments.',
      severity: 'minor',
    },
  ],
};
