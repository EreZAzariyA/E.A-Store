import { useEffect, useState } from "react";
import { adminProductsServices } from "../../../services/admin/products-services";
import { adminCategoriesServices } from "../../../services/admin/categories-services";
import { adminSubCategoriesServices } from "../../../services/admin/subCategories-services";
import { Form, Input, InputNumber, Select, Table, Typography, Popconfirm, message, Row, Col, Divider, Button } from "antd";

export const EditTable = ({columns, dataSource, component, handleAdd, onEditMode, ...rest}) => {
  const [ form ] = Form.useForm();
  const [ editingKey, setEditingKey ] = useState('');
  const [ data, setData ] = useState([]);
  const isEditing = (record) => record?._id === editingKey;
  // const isProductsList = component === 'products';
  const isCategoriesList = component === 'categories';
  const isSubCategoriesList = component === 'sub-categories';
  const componentName = isCategoriesList ? 'category' : isSubCategoriesList ? 'sub-category' : 'product';

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const edit = (record) => {
    if (onEditMode) {
      onEditMode(record);
      return
    }
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record) => {
    try {
      const row = await form.validateFields();
      let updatedValue;
      if (isCategoriesList) {
        updatedValue = await adminCategoriesServices.updateCategory({...row, _id: record._id });
      } else if (isSubCategoriesList) {
        updatedValue = await adminSubCategoriesServices.updateSubCategory({...row, _id: record._id });
      } else {
        updatedValue = await adminProductsServices({...row, _id: record._id});
      }
      const newData = [...dataSource];
      const index = newData.findIndex((item) => record._id === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...updatedValue,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(updatedValue);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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

  const remove = async (record) => {
    try {
      if (isCategoriesList) {
        await adminCategoriesServices.removeCategory(record._id)
        message.success('Removed');
      } else if (isSubCategoriesList) {
        await adminSubCategoriesServices.removeSubCategory(record._id);
        message.success('Removed');
      } else {
        await adminProductsServices.removeProduct(record._id);
        message.success('Removed');
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.inputType || 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }
      },
    };
  });
  columns.push({
    title: 'Actions',
    key: 'action',
    width: 100,
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <Row align={'middle'}>
          <Col>
            <Popconfirm title="Are you sure?" onCancel={cancel} onConfirm={() => save(record)}>
              <Typography.Link>
                Save
              </Typography.Link>
            </Popconfirm>
          </Col>
          <Divider type="vertical" />
          <Col>
            <Typography.Link onClick={cancel}>
              Cancel
            </Typography.Link>
          </Col>
        </Row>
      ) : (
        <Row align={'middle'}>
          <Col>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          </Col>
          <Divider type="vertical" />
          <Col>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => remove(record)}
            >
              <Typography.Link disabled={editingKey !== ''}>
                Delete
              </Typography.Link>
            </Popconfirm>
          </Col>
        </Row>
      );
    },
  });

  return (
    <Form form={form}>
      <Table
        {...rest}
        bordered
        columns={columns}
        dataSource={data}
        rootClassName="editable-row"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        pagination={{
          onChange: cancel,
        }}
        scroll={{ x: 1200 }}
      />
      <Form.Item>
        <Button onClick={handleAdd}>Add {componentName}</Button>
      </Form.Item>
    </Form>
  );
};