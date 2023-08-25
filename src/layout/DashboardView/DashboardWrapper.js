import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [ pathOptions, setPathOptions] = useState([]);
  const [ current, setCurrent ] = useState('');

  useEffect(() => {
    const locationArray = location.pathname.split('/').filter((path) => path !== '' && path !== 'home');
    const [,, categoryIdPath] = locationArray;
    setCurrent(categoryIdPath);

    const options = [];
    for (let i = 0; i < locationArray.length; i++) {
      const parentPath = locationArray.slice(0, i).join('/');
      const path = locationArray[i];

      options.push({
        title: (
          <Link to={`${parentPath}/${path}`}>
            {path}
          </Link>
        )
      });
    }

    setPathOptions(options);
  }, [location.pathname, navigate]);

  const defaultItems = [
    {
      label: 'Home',
      key: 'home',
      onClick: () => navigate('/home')
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        style={{background: 'transparent', justifyContent: 'center'}}
        items={defaultItems.concat(categories?.map((category) => {
          return {
            key: category._id,
            label: category.category,
            onClick: () => navigate(`/categories/${category._id}`)
          };
        }))}
      />

      {pathOptions.length > 0 &&
        <Breadcrumb
          items={[{title: <Link to={'/'}>Home</Link>}, ...pathOptions]}
        />
      }
    </>
  );
};