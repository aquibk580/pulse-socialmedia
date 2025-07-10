import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbNav } from '@/components/Admin/breadcrumb-nav';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { TrendingUp, TrendingDown, Target, Zap, Brain, Eye } from 'lucide-react';

const performanceData = [
  { name: 'Jan', performance: 85, target: 80, efficiency: 78 },
  { name: 'Feb', performance: 88, target: 82, efficiency: 82 },
  { name: 'Mar', performance: 92, target: 85, efficiency: 85 },
  { name: 'Apr', performance: 89, target: 87, efficiency: 88 },
  { name: 'May', performance: 94, target: 90, efficiency: 91 },
  { name: 'Jun', performance: 96, target: 92, efficiency: 94 },
];

const radarData = [
  { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
  { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Development', A: 86, B: 130, fullMark: 150 },
  { subject: 'Support', A: 99, B: 100, fullMark: 150 },
  { subject: 'HR', A: 85, B: 90, fullMark: 150 },
  { subject: 'Finance', A: 65, B: 85, fullMark: 150 },
];

const insights = [
  {
    title: 'Performance Trend',
    value: '+12.5%',
    description: 'Performance has improved consistently over the last 6 months',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'Efficiency Score',
    value: '94%',
    description: 'Current efficiency is above target by 4 percentage points',
    trend: 'up',
    icon: Zap,
    color: 'text-blue-600',
  },
  {
    title: 'Goal Achievement',
    value: '8/10',
    description: 'Successfully achieved 80% of quarterly goals',
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
  },
  {
    title: 'Risk Assessment',
    value: 'Low',
    description: 'Current risk level is within acceptable parameters',
    trend: 'down',
    icon: Brain,
    color: 'text-orange-600',
  },
];

const keyMetrics = [
  { metric: 'Customer Satisfaction', current: 4.8, previous: 4.6, change: '+4.3%' },
  { metric: 'Response Time', current: 2.1, previous: 2.8, change: '-25%' },
  { metric: 'Conversion Rate', current: 3.2, previous: 2.9, change: '+10.3%' },
  { metric: 'Retention Rate', current: 94, previous: 91, change: '+3.3%' },
];

export function Insights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
          <BreadcrumbNav items={[{ title: 'Insights' }]} />
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight) => (
          <Card key={insight.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 150]} />
                <Radar
                  name="Current"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Target"
                  dataKey="B"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Efficiency Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{metric.metric}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-2xl font-bold">{metric.current}</span>
                    <span className="text-sm text-muted-foreground">
                      Previous: {metric.previous}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </div>
                  <div className="flex items-center mt-1">
                    {metric.change.startsWith('+') ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Optimize Marketing Spend
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Based on current conversion rates, consider reallocating 15% of budget from social media to search ads for better ROI.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100">
                Improve Response Time
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Implementing automated responses for common queries could reduce average response time by 30%.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100">
                Scale High-Performing Products
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                Products in the Electronics category show 40% higher margins. Consider expanding this category.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}