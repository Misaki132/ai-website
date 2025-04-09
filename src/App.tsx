import * as React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import Search from '@/components/Search';
import Card from '@/components/Card';
import './index.css';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [tools, setTools] = React.useState<any[]>([]);
  const [filteredTools, setFilteredTools] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  React.useEffect(() => {
    const fetchTools = async () => {
      try {
        const toolsData = await import('./data/tools.json');
        const data = selectedCategory 
          ? toolsData.default.filter(tool => tool.category === selectedCategory)
          : toolsData.default;
        setTools(data);
        setFilteredTools(data);
      } catch (error) {
        console.error('Error loading tools:', error);
      }
    };

    fetchTools();
  }, [selectedCategory]);

  React.useEffect(() => {
    const handleSearch = (e: CustomEvent) => {
      setSearchQuery(e.detail);
      if (e.detail) {
        setFilteredTools(tools.filter(tool => 
          tool.title.toLowerCase().includes(e.detail.toLowerCase())
        ));
      } else {
        setFilteredTools(tools);
      }
    };

    window.addEventListener('search', handleSearch as EventListener);
    return () => window.removeEventListener('search', handleSearch as EventListener);
  }, [tools]);

  const handleMenuClick = (e: any) => {
    if (e.key === '1') setSelectedCategory('');
    else if (e.key.startsWith('2-')) {
      const category = ['AI工具', '开发工具', '云服务'][parseInt(e.key.split('-')[1])];
      setSelectedCategory(category);
    }
    return null;
  };

  const renderContent = () => {
    if (!selectedCategory) {
      return (
        <div className="py-8">
          <div className="space-y-12">
            {['AI工具', '开发工具', '云服务'].map(category => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-6">{category}</h3>
                {renderTools(filteredTools.filter(tool => tool.category === category))}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-8 text-center">{selectedCategory}</h2>
        {renderTools(filteredTools)}
      </div>
    );
  };

  const renderTools = (toolsToRender = filteredTools) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsToRender.map((tool, index) => (
          <Card 
            key={index}
            title={tool.title}
            description={tool.description}
            url={tool.url}
            category={tool.category}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm flex items-center justify-between px-4 text-gray-800">
        <div className="text-xl font-bold text-blue-600">AI导航站</div>
        <div className="flex-1 max-w-xl mx-4 flex items-center">
          <Search />
        </div>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer hover:text-blue-600">登录</span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="bg-white shadow-sm">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="h-full pt-2"
            onClick={handleMenuClick}
            items={[
              { key: '1', icon: <HomeOutlined />, label: '首页' },
              { 
                key: '2', 
                icon: <AppstoreOutlined />, 
                label: '分类',
                children: [
                  { key: '2-0', label: 'AI工具' },
                  { key: '2-1', label: '开发工具' },
                  { key: '2-2', label: '云服务' }
                ]
              },
              { key: '3', icon: <StarOutlined />, label: '收藏' },
              { key: '4', icon: <SettingOutlined />, label: '设置' },
            ]}
          />
        </Sider>
        <Content className="p-4">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;