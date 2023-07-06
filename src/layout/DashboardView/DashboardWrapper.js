import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [ patchOptions, setPatchOptions] = useState([]);
  const [ current, setCurrent ] = useState('');

  useEffect(() => {
    let locationArray = location.pathname.split('/');
    const newLocationArray = locationArray.filter((path) => path !== '' && path !== 'home');
    const options = [];

    for (let i = 0; i < newLocationArray.length; i++) {
      const parentPath = newLocationArray[i - 1];
      const path = newLocationArray[i];
      options.push({ title: <Link to={`${parentPath ? '/'+parentPath : ''}/${path}`}>{path}</Link> });
    };

    setPatchOptions(options);
    setCurrent([...newLocationArray].pop());
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
        items={defaultItems.concat(!categories?.length ? [] : categories?.map((category) => {
          return {
            key: category._id,
            label: category.category,
            onClick: () => navigate(`/categories/${category._id}`)
          };
        }))}
      />

      {patchOptions.length > 0 &&
        <Breadcrumb
          items={[
            {title: <Link to={'/'}>Home</Link>}
          ].concat(patchOptions)}
        />
      }
    </>
  );
};