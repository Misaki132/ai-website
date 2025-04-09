import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

export default function SearchComponent() {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (info?.source === 'clear') {
      window.dispatchEvent(new CustomEvent('search', { detail: '' }));
    } else {
      window.dispatchEvent(new CustomEvent('search', { detail: value }));
    }
  };

  return (
    <Search
      placeholder="搜索AI工具"
      allowClear
      enterButton="搜索"
      size="large"
      onSearch={onSearch}
      className="w-full max-w-xl"
    />
  );
}