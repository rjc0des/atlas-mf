import {
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { ChartPanel } from './chart-panel';
import { axisTick, tooltipStyle } from './chart-theme';
import { deployFrequency, incidentCount, deployDurationMinutes } from './data';

export function OpsCharts() {
  return (
    <div className="grid grid-cols-3 gap-sm">
      <ChartPanel title="Deployment frequency">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={deployFrequency}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="week" tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} />
            <YAxis tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} width={24} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="deploys" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Avg deploy duration (min)">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={deployDurationMinutes}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="week" tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} />
            <YAxis tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} width={24} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="minutes" stroke="var(--color-success)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Incident count">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={incidentCount}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="week" tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} />
            <YAxis tick={axisTick} axisLine={{ stroke: 'var(--color-border)' }} width={24} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="incidents" fill="var(--color-danger)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>
    </div>
  );
}
