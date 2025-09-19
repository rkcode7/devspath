import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Filter, Grid, List, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RoadmapEditor } from './RoadmapEditor';
import { toast } from 'sonner';

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  icon: string;
  color: string;
  published: boolean;
  learners: string;
  rating: number;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
  steps: number;
  resources: number;
}

const mockRoadmaps: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript, React, and modern frontend tools',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '6-8 months',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-500',
    published: true,
    learners: '2.5M',
    rating: 4.9,
    completionRate: 78,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-28',
    steps: 8,
    resources: 45
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Learn server-side programming, databases, and APIs',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '7-9 months',
    icon: '🗄️',
    color: 'from-green-500 to-emerald-500',
    published: true,
    learners: '1.8M',
    rating: 4.8,
    completionRate: 72,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
    steps: 8,
    resources: 38
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Analytics, machine learning, and data visualization',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '9-12 months',
    icon: '📊',
    color: 'from-teal-500 to-blue-500',
    published: true,
    learners: '1.1M',
    rating: 4.8,
    completionRate: 58,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20',
    steps: 9,
    resources: 52
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications',
    category: 'Mobile Development',
    difficulty: 'Intermediate',
    duration: '8-10 months',
    icon: '📱',
    color: 'from-purple-500 to-pink-500',
    published: true,
    learners: '940K',
    rating: 4.7,
    completionRate: 68,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
    steps: 7,
    resources: 35
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Master containerization, CI/CD, and cloud platforms',
    category: 'DevOps & Cloud',
    difficulty: 'Advanced',
    duration: '6-8 months',
    icon: '☁️',
    color: 'from-orange-500 to-red-500',
    published: false,
    learners: '670K',
    rating: 4.8,
    completionRate: 61,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-29',
    steps: 8,
    resources: 42
  }
];

export const RoadmapManager = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(mockRoadmaps);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState<Roadmap[]>(mockRoadmaps);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const categories = ['all', ...Array.from(new Set(roadmaps.map(r => r.category)))];

  useEffect(() => {
    let filtered = roadmaps;

    if (searchQuery) {
      filtered = filtered.filter(roadmap =>
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(roadmap => roadmap.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(roadmap => 
        statusFilter === 'published' ? roadmap.published : !roadmap.published
      );
    }

    setFilteredRoadmaps(filtered);
  }, [roadmaps, searchQuery, categoryFilter, statusFilter]);

  const handleCreateNew = () => {
    setEditingRoadmap(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (roadmap: Roadmap) => {
    setEditingRoadmap(roadmap);
    setIsEditorOpen(true);
  };

  const handleDelete = (roadmapId: string) => {
    setRoadmaps(prev => prev.filter(r => r.id !== roadmapId));
    toast.success('Roadmap deleted successfully');
  };

  const handleTogglePublish = (roadmapId: string) => {
    setRoadmaps(prev => prev.map(r => 
      r.id === roadmapId 
        ? { ...r, published: !r.published, updatedAt: new Date().toISOString().split('T')[0] }
        : r
    ));
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    toast.success(`Roadmap ${roadmap?.published ? 'unpublished' : 'published'} successfully`);
  };

  const handleSaveRoadmap = (roadmapData: Partial<Roadmap>) => {
    if (editingRoadmap) {
      // Update existing roadmap
      setRoadmaps(prev => prev.map(r => 
        r.id === editingRoadmap.id 
          ? { ...r, ...roadmapData, updatedAt: new Date().toISOString().split('T')[0] }
          : r
      ));
      toast.success('Roadmap updated successfully');
    } else {
      // Create new roadmap
      const newRoadmap: Roadmap = {
        id: `roadmap-${Date.now()}`,
        title: roadmapData.title || 'New Roadmap',
        description: roadmapData.description || '',
        category: roadmapData.category || 'General',
        difficulty: roadmapData.difficulty || 'Beginner',
        duration: roadmapData.duration || '4-6 weeks',
        icon: roadmapData.icon || '📚',
        color: roadmapData.color || 'from-blue-500 to-purple-500',
        published: false,
        learners: '0',
        rating: 0,
        completionRate: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        steps: 0,
        resources: 0
      };
      setRoadmaps(prev => [newRoadmap, ...prev]);
      toast.success('Roadmap created successfully');
    }
    setIsEditorOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Expert': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const RoadmapCard = ({ roadmap }: { roadmap: Roadmap }) => (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all duration-300 ${!roadmap.published ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${roadmap.color} rounded-xl flex items-center justify-center text-2xl`}>
              {roadmap.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{roadmap.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{roadmap.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={roadmap.published ? "default" : "secondary"}>
              {roadmap.published ? (
                <><Eye className="w-3 h-3 mr-1" />Published</>
              ) : (
                <><EyeOff className="w-3 h-3 mr-1" />Draft</>
              )}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(roadmap)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTogglePublish(roadmap.id)}>
                  {roadmap.published ? (
                    <><EyeOff className="w-4 h-4 mr-2" />Unpublish</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-2" />Publish</>
                  )}
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Roadmap</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{roadmap.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(roadmap.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {roadmap.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(roadmap.difficulty)}>
            {roadmap.difficulty}
          </Badge>
          <Badge variant="outline">{roadmap.duration}</Badge>
          <Badge variant="outline">{roadmap.steps} steps</Badge>
          <Badge variant="outline">{roadmap.resources} resources</Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold">{roadmap.learners}</div>
            <div className="text-muted-foreground">Learners</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{roadmap.rating}</div>
            <div className="text-muted-foreground">Rating</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">{roadmap.completionRate}%</div>
            <div className="text-muted-foreground">Completion</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Updated: {roadmap.updatedAt}
        </div>
      </CardContent>
    </Card>
  );

  const RoadmapListItem = ({ roadmap }: { roadmap: Roadmap }) => (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all duration-300 ${!roadmap.published ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`w-10 h-10 bg-gradient-to-r ${roadmap.color} rounded-lg flex items-center justify-center text-lg`}>
              {roadmap.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{roadmap.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{roadmap.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">{roadmap.category}</Badge>
                <Badge className={getDifficultyColor(roadmap.difficulty)} variant="secondary">
                  {roadmap.difficulty}
                </Badge>
                <Badge variant={roadmap.published ? "default" : "secondary"} className="text-xs">
                  {roadmap.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right text-sm">
              <div className="font-medium">{roadmap.learners}</div>
              <div className="text-muted-foreground">learners</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(roadmap)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTogglePublish(roadmap.id)}>
                  {roadmap.published ? (
                    <><EyeOff className="w-4 h-4 mr-2" />Unpublish</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-2" />Publish</>
                  )}
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Roadmap</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{roadmap.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(roadmap.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Roadmap Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage learning roadmaps</p>
        </div>
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Roadmap
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRoadmap ? 'Edit Roadmap' : 'Create New Roadmap'}
              </DialogTitle>
            </DialogHeader>
            <RoadmapEditor
              roadmap={editingRoadmap}
              onSave={handleSaveRoadmap}
              onCancel={() => setIsEditorOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
        </span>
        <span>
          {roadmaps.filter(r => r.published).length} published, {roadmaps.filter(r => !r.published).length} drafts
        </span>
      </div>

      {/* Roadmaps Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map(roadmap => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRoadmaps.map(roadmap => (
            <RoadmapListItem key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}

      {filteredRoadmaps.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No roadmaps found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first roadmap to get started'
            }
          </p>
          {!searchQuery && categoryFilter === 'all' && statusFilter === 'all' && (
            <Button onClick={handleCreateNew} variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create First Roadmap
            </Button>
          )}
        </div>
      )}
    </div>
  );
};