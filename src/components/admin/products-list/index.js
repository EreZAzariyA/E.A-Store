import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Select, Space, Table, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminServices } from "../../../services/admin-services";

export const ProductsList = () => {
  const [ form ] = Form.useForm();
  const products = useSelector((state) => (state.productsReducer?.products));
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const subCategories = useSelector((state) => (state.categoriesReducer?.subCategories));
  const [ filteredProducts, setFilteredProducts] = useState([]);
  const [ editingKey, setEditingKey ] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const isEditing = (record) => record._id === editingKey;

  const [ filterState, setFilterState ] = useState({
    name: '',
    category_id: '',
    subCategory_id: ''
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filtering = () => {

    let filteredProducts = products;

    if (filterState.name) {
      filteredProducts = filteredProducts?.filter((p) => p.name.startsWith(filterState.name))
    };
    if (filterState.category_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.category_id === filterState.category_id))
    }
    if (filterState.subCategory_id) {
      filteredProducts = filteredProducts?.filter((p) => (p.subCategory_id === filterState.subCategory_id))
    };

    return filteredProducts;
  };
  
  useEffect(() => {
    const f = filtering();
    setFilteredProducts(f);
  }, [filterState, products]);

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...products];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.info(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        console.info(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const removeProduct = async (product_id) => {
    try {
      await adminServices.removeProduct(product_id);
      message.success('Removed');
    } catch (err) {
      message.error(err.message);
    };
  };

  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      editable: true,
      width: 150,
      sorter: (a, b) => (a.name.localeCompare(b.name))
    },
    {
      title: 'Category',
      key: 'category_id',
      dataIndex: 'category_id',
      editable: true,
      render: (value, record) => {
        const category = categories?.find((c) => (c._id === value));
        return (
          <Link to={`/admin/all-categories/${category?._id}`}>{category?.category}</Link>
        )
      },
      sorter: (a, b) => (a.category_id > b.category_id)
    },
    {
      title: 'Sub-Category',
      key: 'subCategory_id',
      dataIndex: 'subCategory_id',
      editable: true,
      render: (value, record) => {
        const subCategory = subCategories?.find((subC) => (subC._id === value));
        return (
          <p>{subCategory?.subCategory}</p>
        )
      },
      sorter: (a, b) => (a.subCategory_id.localeCompare(b.subCategory_id))
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      editable: true,
      sorter: (a, b) => (a.price > b.price)
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>
                Cancel
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => removeProduct(record._id)}
            >
              <Typography.Link disabled={editingKey !== ''}>
                Delete
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {

    const inputNode = inputType === 'number'
    ? <InputNumber />
    : dataIndex === 'category_id'
    ? <Select options={[{label: "a", value:'a'}]} />
    : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === 'price' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }
      },
    };
  });

  return (
    <Space direction="vertical" style={{width: '99%'}}>
      <Space className="mt-10" align="center" wrap>
        <Input
          allowClear
          type="text"
          placeholder="Search product"
          onChange={(val) => setFilterState({...filterState, name: val.target.value})}
        />

        <Select
          allowClear
          onClear={() => setFilterState({...filterState, category_id: ''})}
          style={{width: '200px'}}
          value={filterState.category_id}
          onSelect={(val) => setFilterState({...filterState, category_id: val })}
        >
          <Select.Option key={''} disabled>Select category</Select.Option>
          {categories?.map((category) => (
            <Select.Option key={category._id}>{category.category}</Select.Option>
          ))}
        </Select>
  
        <Select
          allowClear
          onClear={() => setFilterState({...filterState, subCategory_id: ''})}
          style={{width: '200px'}}
          value={filterState.subCategory_id}
          onSelect={(val) => setFilterState({...filterState, subCategory_id: val })}
        >
          <Select.Option key={''} disabled>Select sub-category</Select.Option>
          {subCategories?.map((subCategory) => (
            <Select.Option key={subCategory._id}>{subCategory.subCategory}</Select.Option>
          ))}
        </Select>
      </Space>

      <Table
        loading={!products}
        bordered
        rowKey={'_id'}
        dataSource={filteredProducts}
        columns={mergedColumns}
        rowClassName="editable-row"
        scroll={{x: 'auto'}}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        pagination={{
          onChange: cancel,
        }}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          }
        }}
      />
    </Space>
  );
};