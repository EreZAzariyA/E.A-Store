import { useEffect, useState } from "react";
import { productsServices } from "../../../services/productsServices";
import { Form, Input, InputNumber, Popconfirm, Select, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProductsList = () => {
  const products = useSelector((state) => (state.productsReducer?.products));
  const categories = useSelector((state) => (state.categoriesReducer?.categories));
  const subCategories = useSelector((state) => (state.categoriesReducer?.subCategories));
  // const [ subCategories, setSubCategories ] = useState([]);
  const [ editingKey, setEditingKey ] = useState('');
  const [ form ] = Form.useForm();
  const isEditing = (record) => record._id === editingKey;

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

  const columns = [
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
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      editable: true,
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
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

  if (products?.length) {
    return (
      <Form form={form} component={false}>
        <Table
          loading={!products.length}
          bordered
          rowKey={'_id'}
          dataSource={products}
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
        />
      </Form>
    );
  } return <Spin />
};