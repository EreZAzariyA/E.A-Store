import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Menu, message } from "antd";
import { productsServices } from "../../services/productsServices";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ patchOptions, setPatchOptions] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ current, setCurrent ] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await productsServices.fetchAllCategories();
        setCategories(categories);
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchCategories();
  }, []);

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
        items={defaultItems.concat(categories?.map((category) => {
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