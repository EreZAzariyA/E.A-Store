import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const [ patchOptions, setPatchOptions] = useState([]);
  const [ current, setCurrent ] = useState('');

  useEffect(() => {
    let locationArray = location.pathname.split('/');
    const patchOptions = locationArray.filter((p) =>(p !== '')).map((p) => ({
      title: <Link to={p}>{p}</Link>, onClick: () => navigate(`/${p}`)
    }));
    setPatchOptions(patchOptions);
    setCurrent([...locationArray].pop() === '' ? '/' : [...locationArray].pop());
  }, [location.pathname]);

  const defaultItems = [
    {
      label: 'Home',
      key: '/',
      onClick: () => navigate('/')
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
            {title: <Link to={'/'}>Home</Link>, onClick: () => navigate('/')}
          ].concat(patchOptions)}
        />
      }
    </>
  );
};