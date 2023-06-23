import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Table, Typography, Popconfirm } from "antd";


export const EditTable = ({columns, dataSource, ...rest}) => {
  const [ form ] = Form.useForm();
  // const [ editingKey, setEditingKey ] = useState('');
  // const [ data, setData ] = useState([...dataSource]);
  // const isEditing = (record) => record._id === editingKey;

  // useEffect(() => {
  //   setData([...dataSource]);
  // }, [dataSource]);
  
  // columns.push({
  //   title: 'Action',
  //   key: 'action',
  //   width: 150,
  //   fixed: 'right',
  //   render: (_, record) => {
  //     const editable = isEditing(record);
  //     return editable ? (
  //       <span>
  //         <Typography.Link
  //           onClick={() => save(record._id)}
  //           style={{
  //             marginRight: 8,
  //           }}
  //         >
  //           Save
  //         </Typography.Link>
  //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //           <Typography.Link>
  //             Cancel
  //           </Typography.Link>
  //         </Popconfirm>
  //       </span>
  //     ) : (
  //       <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
  //         Edit
  //       </Typography.Link>
  //     );
  //   },
  // });

  // const edit = (record) => {
  //   form.setFieldsValue({
  //     ...record,
  //   });
  //   setEditingKey(record._id);
  // };

  // const cancel = () => {
  //   setEditingKey('');
  // };

  // const save = async (key) => {
  //   try {
  //     const row = await form.validateFields();
  //     const newData = [...dataSource];
  //     const index = newData.findIndex((item) => key === item._id);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       setData(newData);
  //       setEditingKey('');
  //     } else {
  //       newData.push(row);
  //       setData(newData);
  //       setEditingKey('');
  //     }
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };


  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType,
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {

  //   const inputNode = inputType === 'number'
  //   ? <InputNumber />
  //   : dataIndex === 'category_id'
  //   ? <Select options={[{label: "a", value:'a'}]} />
  //   : <Input />;
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           rules={[
  //             {
  //               required: true,
  //               message: `Please Input ${title}!`,
  //             },
  //           ]}
  //         >
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };



  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }

  //   return {
  //     ...col,
  //     onCell: (record) => {
  //       return {
  //         record,
  //         inputType: col.dataIndex === 'price' ? 'number' : 'text',
  //         dataIndex: col.dataIndex,
  //         title: col.title,
  //         editing: isEditing(record),
  //       }
  //     },
  //   };
  // });

  return (
    <Form form={form}>
      <Table
        {...rest}
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    </Form>
  );
};