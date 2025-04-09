import { Card as AntCard } from 'antd';
import { Link } from 'react-router-dom';
import type { CardProps } from 'antd/es/card';

interface ICardProps extends CardProps {
  title: string;
  description: string;
  url: string;
  icon?: string;
  category?: string;
}

export default function Card({ title, description, url, icon, ...props }: ICardProps) {
  return (
    <AntCard
      hoverable
      className="w-full h-full shadow-sm hover:shadow-md transition-shadow"
      {...props}
    >
      <div className="flex flex-col h-full">
        {icon && (
          <div className="flex justify-center mb-2">
            <img src={icon} alt={title} className="h-12 w-12 object-contain" />
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
        <Link 
          to={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          访问网站
        </Link>
      </div>
    </AntCard>
  );
}