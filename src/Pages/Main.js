import React, { useEffect, useState } from 'react';
import { Search, Code, BookOpen, DollarSign, MessageSquare, SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../Components/card';


const SERVER_ENDPOINT = "http://localhost:8000";

const Main = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/projects`);
        const body = await response.json();
        setProjects(body);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'backend', name: 'Backend' },
    { id: 'desktop', name: 'Desktop Apps' }
  ];

  const filteredProjects = projects.filter(project =>
    (selectedCategory === 'all' || project.category === selectedCategory) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetails = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />
      <TopBar 
        setSearchTerm={setSearchTerm} 
        searchTerm={searchTerm} 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <ProjectsGrid 
        filteredProjects={filteredProjects} 
        handleViewDetails={handleViewDetails} 
      />
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-6xl font-bold">Interfly</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Login
        </button>
      </div>
      <p className="text-gray-600 mb-16 text-lg">
        Discover and acquire software projects for your portfolio
      </p>
    </>
  );
}

function TopBar({ setSearchTerm, searchTerm, categories, selectedCategory, setSelectedCategory }) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 text-lg font-semibold">
          Post a Project
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectsGrid({ filteredProjects, handleViewDetails }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription className="text-gray-600">
                by {project.seller}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Code size={16} />
                  <span>{project.completionStatus}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{project.views} views</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="text-green-600" size={20} />
                <span className="text-xl font-bold">{project.price}</span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <MessageSquare size={20} />
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewDetails(project.id)}
                >
                  View Details
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Main;