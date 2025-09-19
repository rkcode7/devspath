import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Plus, 
  Edit, 
  Eye,
  Clock,
  Award,
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface AdminOverviewProps {
  onCreateRoadmap: () => void;
  onManageRoadmaps: () => void;
}

export const AdminOverview = ({ onCreateRoadmap, onManageRoadmaps }: AdminOverviewProps) => {
  const stats = [
    {
      title: 'Total Roadmaps',
      value: '12',
      change: '+2 this month',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Published Roadmaps',
      value: '9',
      change: '+1 this week',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Total Learners',
      value: '8.2M',
      change: '+12% this month',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Avg Completion Rate',
      value: '67%',
      change: '+5% improvement',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500'
    }
  ];

  const recentRoadmaps = [
    {
      id: 'devops',
      title: 'DevOps Engineering',
      status: 'draft',
      lastModified: '2 hours ago',
      author: 'Admin',
      progress: 85
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      status: 'published',
      lastModified: '1 day ago',
      author: 'Admin',
      progress: 100
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Engineering',
      status: 'published',
      lastModified: '3 days ago',
      author: 'Admin',
      progress: 100
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist',
      status: 'published',
      lastModified: '1 week ago',
      author: 'Admin',
      progress: 100
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Published "Mobile App Development" roadmap',
      time: '2 hours ago',
      type: 'publish',
      icon: Eye
    },
    {
      id: 2,
      action: 'Updated "Data Science" roadmap content',
      time: '5 hours ago',
      type: 'edit',
      icon: Edit
    },
    {
      id: 3,
      action: 'Created new "DevOps Engineering" roadmap',
      time: '1 day ago',
      type: 'create',
      icon: Plus
    },
    {
      id: 4,
      action: 'User feedback received on "Frontend Development"',
      time: '2 days ago',
      type: 'feedback',
      icon: Activity
    },
    {
      id: 5,
      action: 'Analytics report generated',
      time: '3 days ago',
      type: 'system',
      icon: BarChart3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success border-success/20';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'publish': return Eye;
      case 'edit': return Edit;
      case 'create': return Plus;
      case 'feedback': return Activity;
      case 'system': return BarChart3;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}/20`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={onCreateRoadmap} variant="gradient" className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              <span>Create New Roadmap</span>
            </Button>
            <Button onClick={onManageRoadmaps} variant="outline" className="h-20 flex-col">
              <BookOpen className="w-6 h-6 mb-2" />
              <span>Manage Roadmaps</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Roadmaps */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Roadmaps</CardTitle>
              <Button variant="ghost" size="sm" onClick={onManageRoadmaps}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRoadmaps.map((roadmap) => (
                <div key={roadmap.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{roadmap.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(roadmap.status)} variant="secondary">
                        {roadmap.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {roadmap.author} • {roadmap.lastModified}
                      </span>
                    </div>
                    {roadmap.status === 'draft' && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Completion</span>
                          <span>{roadmap.progress}%</span>
                        </div>
                        <Progress value={roadmap.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-success">All Systems</div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">1,247</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="font-semibold">98.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Award className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold">4.8/5</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};