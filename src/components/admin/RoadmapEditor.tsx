import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, GripVertical, Save, X, Eye, EyeOff } from 'lucide-react';
import { Roadmap } from './RoadmapManager';
import { toast } from 'sonner';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  resources: Array<{
    title: string;
    url: string;
    type: string;
  }>;
}

interface RoadmapEditorProps {
  roadmap?: Roadmap | null;
  onSave: (roadmapData: Partial<Roadmap>) => void;
  onCancel: () => void;
}

const iconOptions = [
  '🌐', '🗄️', '📊', '📱', '☁️', '🔒', '🎨', '🤖', '🎮', '⚛️',
  '🐍', '☕', '🔧', '📚', '💻', '🚀', '⚡', '🎯', '🔥', '💎'
];

const colorOptions = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-teal-500 to-blue-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-yellow-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500'
];

export const RoadmapEditor = ({ roadmap, onSave, onCancel }: RoadmapEditorProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Beginner' as const,
    duration: '',
    icon: '📚',
    color: 'from-blue-500 to-purple-500',
    published: false
  });

  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [prerequisites, setPrerequisites] = useState<string[]>(['']);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(['']);
  const [generalResources, setGeneralResources] = useState<Array<{title: string; url: string; type: string}>>([]);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (roadmap) {
      setFormData({
        title: roadmap.title,
        description: roadmap.description,
        category: roadmap.category,
        difficulty: roadmap.difficulty,
        duration: roadmap.duration,
        icon: roadmap.icon,
        color: roadmap.color,
        published: roadmap.published
      });
    }
  }, [roadmap]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addStep = () => {
    const newStep: RoadmapStep = {
      id: `step-${Date.now()}`,
      title: '',
      description: '',
      difficulty: 'Beginner',
      estimatedTime: '',
      resources: []
    };
    setSteps(prev => [...prev, newStep]);
  };

  const updateStep = (stepId: string, field: string, value: any) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const removeStep = (stepId: string) => {
    setSteps(prev => prev.filter(step => step.id !== stepId));
  };

  const addStepResource = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, resources: [...step.resources, { title: '', url: '', type: 'article' }] }
        : step
    ));
  };

  const updateStepResource = (stepId: string, resourceIndex: number, field: string, value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? {
            ...step,
            resources: step.resources.map((resource, index) =>
              index === resourceIndex ? { ...resource, [field]: value } : resource
            )
          }
        : step
    ));
  };

  const removeStepResource = (stepId: string, resourceIndex: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, resources: step.resources.filter((_, index) => index !== resourceIndex) }
        : step
    ));
  };

  const addPrerequisite = () => {
    setPrerequisites(prev => [...prev, '']);
  };

  const updatePrerequisite = (index: number, value: string) => {
    setPrerequisites(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removePrerequisite = (index: number) => {
    setPrerequisites(prev => prev.filter((_, i) => i !== index));
  };

  const addLearningOutcome = () => {
    setLearningOutcomes(prev => [...prev, '']);
  };

  const updateLearningOutcome = (index: number, value: string) => {
    setLearningOutcomes(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeLearningOutcome = (index: number) => {
    setLearningOutcomes(prev => prev.filter((_, i) => i !== index));
  };

  const addGeneralResource = () => {
    setGeneralResources(prev => [...prev, { title: '', url: '', type: 'article' }]);
  };

  const updateGeneralResource = (index: number, field: string, value: string) => {
    setGeneralResources(prev => prev.map((resource, i) =>
      i === index ? { ...resource, [field]: value } : resource
    ));
  };

  const removeGeneralResource = (index: number) => {
    setGeneralResources(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a roadmap title');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a roadmap description');
      return;
    }
    if (!formData.category.trim()) {
      toast.error('Please select a category');
      return;
    }

    const roadmapData = {
      ...formData,
      steps: steps.length,
      resources: steps.reduce((total, step) => total + step.resources.length, 0) + generalResources.length
    };

    onSave(roadmapData);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter roadmap title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Web Development"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what learners will achieve"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 6-8 months"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map(icon => (
                      <Button
                        key={icon}
                        variant={formData.icon === icon ? 'default' : 'outline'}
                        className="h-12 text-xl"
                        onClick={() => handleInputChange('icon', icon)}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map(color => (
                      <Button
                        key={color}
                        variant={formData.color === color ? 'default' : 'outline'}
                        className="h-12 p-2"
                        onClick={() => handleInputChange('color', color)}
                      >
                        <div className={`w-full h-6 bg-gradient-to-r ${color} rounded`}></div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label>Preview</Label>
                <Card className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${formData.color} rounded-xl flex items-center justify-center text-2xl`}>
                        {formData.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{formData.title || 'Roadmap Title'}</h3>
                        <p className="text-sm text-muted-foreground">{formData.category || 'Category'}</p>
                        <Badge className={getDifficultyColor(formData.difficulty)}>
                          {formData.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites and Learning Outcomes */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prerequisites.map((prereq, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={prereq}
                      onChange={(e) => updatePrerequisite(index, e.target.value)}
                      placeholder="Enter prerequisite"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePrerequisite(index)}
                      disabled={prerequisites.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addPrerequisite}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prerequisite
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={outcome}
                      onChange={(e) => updateLearningOutcome(index, e.target.value)}
                      placeholder="Enter learning outcome"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLearningOutcome(index)}
                      disabled={learningOutcomes.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addLearningOutcome}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Outcome
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Roadmap Steps</CardTitle>
                <Button onClick={addStep} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <Card key={step.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Step {index + 1}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStep(step.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                          placeholder="Step title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Time</Label>
                        <Input
                          value={step.estimatedTime}
                          onChange={(e) => updateStep(step.id, 'estimatedTime', e.target.value)}
                          placeholder="e.g., 2-3 weeks"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                        placeholder="Describe what learners will learn in this step"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select 
                        value={step.difficulty} 
                        onValueChange={(value) => updateStep(step.id, 'difficulty', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Step Resources */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Resources</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addStepResource(step.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Resource
                        </Button>
                      </div>
                      {step.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-5">
                            <Input
                              value={resource.title}
                              onChange={(e) => updateStepResource(step.id, resourceIndex, 'title', e.target.value)}
                              placeholder="Resource title"
                            />
                          </div>
                          <div className="col-span-4">
                            <Input
                              value={resource.url}
                              onChange={(e) => updateStepResource(step.id, resourceIndex, 'url', e.target.value)}
                              placeholder="URL"
                            />
                          </div>
                          <div className="col-span-2">
                            <Select 
                              value={resource.type} 
                              onValueChange={(value) => updateStepResource(step.id, resourceIndex, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="course">Course</SelectItem>
                                <SelectItem value="documentation">Docs</SelectItem>
                                <SelectItem value="tutorial">Tutorial</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeStepResource(step.id, resourceIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {steps.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No steps added yet. Click "Add Step" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>General Resources</CardTitle>
                <Button onClick={addGeneralResource} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {generalResources.map((resource, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label>Title</Label>
                    <Input
                      value={resource.title}
                      onChange={(e) => updateGeneralResource(index, 'title', e.target.value)}
                      placeholder="Resource title"
                    />
                  </div>
                  <div className="col-span-4">
                    <Label>URL</Label>
                    <Input
                      value={resource.url}
                      onChange={(e) => updateGeneralResource(index, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Type</Label>
                    <Select 
                      value={resource.type} 
                      onValueChange={(value) => updateGeneralResource(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="documentation">Documentation</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="book">Book</SelectItem>
                        <SelectItem value="tool">Tool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeGeneralResource(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {generalResources.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No general resources added yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium">Publication Status</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.published ? 'This roadmap is visible to all users' : 'This roadmap is saved as a draft'}
                  </p>
                </div>
                <Button
                  variant={formData.published ? 'destructive' : 'default'}
                  onClick={() => handleInputChange('published', !formData.published)}
                >
                  {formData.published ? (
                    <><EyeOff className="w-4 h-4 mr-2" />Unpublish</>
                  ) : (
                    <><Eye className="w-4 h-4 mr-2" />Publish</>
                  )}
                </Button>
              </div>

              {/* Roadmap Summary */}
              <div className="space-y-4">
                <h4 className="font-medium">Roadmap Summary</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span>{formData.title || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{formData.category || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge className={getDifficultyColor(formData.difficulty)} variant="secondary">
                        {formData.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{formData.duration || 'Not set'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Steps:</span>
                      <span>{steps.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resources:</span>
                      <span>{steps.reduce((total, step) => total + step.resources.length, 0) + generalResources.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prerequisites:</span>
                      <span>{prerequisites.filter(p => p.trim()).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Outcomes:</span>
                      <span>{learningOutcomes.filter(o => o.trim()).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleInputChange('published', false)}>
            Save as Draft
          </Button>
          <Button onClick={handleSave} variant="gradient">
            <Save className="w-4 h-4 mr-2" />
            {roadmap ? 'Update' : 'Create'} Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};