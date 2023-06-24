import { useSelector } from "react-redux";
import { Button, Col, Input, Popconfirm, Row, Space, Table, Typography, message } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminServices } from "../../../services/admin-services";

export const CategoriesList = () => {
  const { pathname } = useLocation();
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const [filteredCategories, setFilteredCategories] = useState([]);
  const products = useSelector((state) => (state.productsReducer?.products));
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const [filterState, setFilterState] = useState({
    category: ''
  });

  useEffect(() => {
    const locationArray = pathname.split('/');
    if (locationArray[3]) {
      setSelectedCategoryId(locationArray[3]);
    };
  }, [pathname]);

  useEffect(() => {
    if (filterState.category) {
      setFilteredCategories([...categories]?.filter((c) => {
        return c.category.toLowerCase().startsWith(filterState.category.toLowerCase()) || c._id.toLowerCase().startsWith(filterState.category.toLowerCase())
      }));
    } else setFilteredCategories(categories)
  }, [filterState.category, categories]);

  const columns = [
    {
      key: '_id',
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => (a.category.localeCompare(b.category)),
    },
    {
      key: 'products',
      title: 'Products',
      shouldUpdate: false,
      // sortOrder: 'descend',
      render: (_,record) => {
        const productsLength = products?.length > 0 ? [...products].filter((p) => (p.category_id === record._id)).length : null;
        return <p>{ productsLength ?? 0}</p>
      },
      sorter: (a, b) => {
        const aLength = [...products].filter((p) => (p.category_id === a._id)).length;
        const bLength = [...products].filter((p) => (p.category_id === b._id)).length;
        
        if (aLength < bLength) {
          return -1;
        } else if (aLength > bLength) {
          return 1;
        } else {
          return 0;
        }
      }

    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            onConfirm={async () => {
              try {
                await adminServices.removeCategory(record._id)
                message.success('Removed');
              } catch (err) {
                message.error(err.message);
              }
            }}
            title='Are you sure?'
          >
            <Typography.Link>Delete</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <Space direction="vertical" style={{width: '99%'}} className="mt-10">
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Input type="text" placeholder='Search category' onChange={(val) => setFilterState({...filterState, category: val.target.value})} />
        </Col>

      </Row>

      <Table
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
        bordered
        rowKey={'_id'}
        columns={columns}
        dataSource={filteredCategories}
        loading={!categories?.length}
      />
    </Space>
  );
};