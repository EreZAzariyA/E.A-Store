import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";
import { useSelector } from "react-redux";

export const DashboardWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const [ pathOptions, setPathOptions] = useState([]);
  const [ current, setCurrent ] = useState('');

  const { category_id } = useParams();
  const [activeBreadcrumb, setActiveBreadcrumb] = useState(category_id);

  useEffect(() => {
    setActiveBreadcrumb(category_id);
  }, [category_id]);

  useEffect(() => {
    let locationArray = location.pathname.split('/');
    const current = [...locationArray].pop();
    setCurrent(current);
    const toUnIncudes = ['', 'home'];
    locationArray = locationArray.filter((path) => !toUnIncudes.includes(path));

    const options = [];
    for (let i = 0; i < locationArray.length; i++) {
      const parentPath = locationArray[i - 1];
      const path = locationArray[i];

      options.push({
        title: (
          <Link to={`${parentPath ? ('/' + parentPath) : ''}/${path}`}>
            {path}
          </Link>
        )
      });
    }

    setPathOptions(options);
    // setCurrent([...locationArray].pop());
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
          items={[
            {title: <Link to={'/'}>Home</Link>}
          ].concat(pathOptions)}
        />
      }
    </>
  );
};