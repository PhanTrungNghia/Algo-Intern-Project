import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { createAdminFunction, deleteAdminFunction, readAllAdminFunctions, updateAdminFunction } from '../_store/store';
import {
  Table,
  TableProps,
  Popconfirm,
  Button,
  Space,
  Form,
  Input,
  Modal,
  Row,
  Col
} from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type ColumnTypes = Exclude<TableProps<IAdminFunctionWithKey>['columns'], undefined>;

const DataTable = () => {
  const navigate: NavigateFunction = useNavigate();
  const adminFunctions: IAdminFunction[] = useSelector(
    (state: any) => state.adminFunctionReducer.adminFunctions,
    shallowEqual
  )
  const [gridData, setGridData] = useState<IAdminFunction[]>([]);
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editRowKey, setEditRowKey] = useState<number | undefined>(undefined);
  const [form] = Form.useForm();
  const [sortedInfo, setSortedInfo] = useState<any>({ columnKey: "", order: "" });
  const [searchText, setSearchText] = useState<string | "">("");
  // define state varibale without setter method 
  const [filteredData, setFilteredData] = useState<IAdminFunctionWithKey[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(readAllAdminFunctions())
      .then(() => {
        setIsLoading(false); // Set loading to false after the API call is complete
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [dispatch]);

  const handleDelete = (record:IAdminFunctionWithKey): void => {
    dispatch(deleteAdminFunction(record.ID));
    dispatch(readAllAdminFunctions());
  };

  const isEditing = (record: IAdminFunctionWithKey) => {
    return record.KEY === editRowKey;
  };

  const cancel = () => {
    setEditRowKey(undefined);
  };
  const save = async (recordKey: number | undefined) => {
    try {
      const row = await form.validateFields();
      const adminFunction: IUpdateAdminFunction = {
        ID: recordKey?.toString() || "",
        NAME: row.NAME || "",
        STATUS: row.STATUS || "",
      };
      dispatch(updateAdminFunction(adminFunction));
      dispatch(readAllAdminFunctions());
      setEditRowKey(undefined);
      navigate('/home');

    } catch (error: any) {
      console.log(error);
    }
  };

  const edit = (record: IAdminFunctionWithKey) => {
    form.setFieldsValue({
      ID: "",
      NAME: "",
      STATUS: "",
      ...record
    });
    setEditRowKey(record.KEY);
  };

  // useEffect được gọi để thêm key cho data sau khi láy từ CSDL
  useEffect(() => {
    const adminFunctionsWithKey: IAdminFunctionWithKey[] = adminFunctions.map((item) => ({
      ...item,
      KEY: item.ID,
    }));
    setGridData(adminFunctionsWithKey);
  }, [adminFunctions, sortedInfo]);

  const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: "ID",
      dataIndex: "ID",

    },
    {
      title: "Name",
      dataIndex: "NAME",
      align: "center",
      editable: true,
      sorter: (a, b) => a.NAME!.length - b.NAME!.length, // Xắp xếp theo NAME length
      sortOrder: sortedInfo.columnKey === "NAME" && sortedInfo.order
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      align: "center",
      editable: true,
      sorter: (a, b) => a.STATUS!.length - b.STATUS!.length,
      sortOrder: sortedInfo.columnKey === "STATUS" && sortedInfo.order
    },
    {
      title: "Action",
      dataIndex: "ACTION",
      align: "center",
      render: (_, record) => {
        const editable: boolean = isEditing(record);
        return adminFunctions.length >= 1 ? (
          <Space>
            <Popconfirm title="Bạn có muốn xóa không ?" onConfirm={() => handleDelete(record)}>
              <Button danger type="primary" disabled={editable}>Xóa</Button>
            </Popconfirm>
            {editable
              ? (
                <span>
                  <Space size="middle">
                    <Button
                      onClick={() => save(record.KEY)}
                      type="primary"
                      style={{ marginRight: 8 }}>Lưu</Button>
                    <Popconfirm title="Bạn có muốn hủy không ?" onConfirm={cancel}>
                      <Button>Hủy</Button>
                    </Popconfirm>
                  </Space>
                </span>
              )
              : (
                <Button type="primary" onClick={() => edit(record)}>Sửa</Button>
              )
            }
          </Space>
        ) : null
      }
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IAdminFunctionWithKey) => ({
        record,
        editable: col.editable && isEditing(record),
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  }) as ColumnTypes;

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editable,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const handleChangeColumnTable = (...sorter: any[]) => {
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  }

  const reset = () => {
    setSortedInfo({});
    setSearchText("");
    dispatch(readAllAdminFunctions());
    setFilteredData(gridData);
  }

  const handleChangeTextInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    if (e.currentTarget.value === "") {
      setFilteredData(gridData);
    }
  }

  const globalSearch = () => {
    const filtered = gridData!.filter((value) => {
      return (
        value.NAME?.toLowerCase().includes(searchText.toLowerCase()) ||
        value.STATUS?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }

  const saveAdminFunction = () => {
    setIsAddDialogOpen(true)
  }

  const submitAdminFunction = (values: any) => {
    console.log(values);
    const randomID = generateRandomID(9);
    // Tạo ID ngẫu nhiên
    // Tạo đối tượng adminFunction
    const adminFunction: ICreateAdminFunction = {
      ID: randomID,
      NAME: values.NAME,
      STATUS: values.STATUS,
    };

    //Gọi dispatch với createAdminFunction
    dispatch(createAdminFunction(adminFunction));
    dispatch(readAllAdminFunctions());
    navigate("/readAllAdminFunction");
  }

  function generateRandomID(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const addPopupForm = () => {
    return (
      <Form onFinish={submitAdminFunction}>
        <Form.Item name={"NAME"} label="Tên chức năng">
          <Input placeholder='nhập tên chức năng'></Input>
        </Form.Item>
        <Form.Item name={"STATUS"} label="Trạng thái">
          <Input placeholder='nhập trạng thái'></Input>
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder='Nhập từ khóa cần tìm'
          onChange={handleChangeTextInput}
          type="text"
          allowClear
          value={searchText}
        >
        </Input>
        <Modal
          title="Thêm Chức Năng"
          open={isAddDialogOpen}
          onCancel={() => setIsAddDialogOpen(false)}
          footer={null}
          centered
        >
          {addPopupForm()}
        </Modal>
        <Button onClick={saveAdminFunction} type="primary">Thêm mới</Button>
        <Button onClick={globalSearch} type="primary">Tìm kiếm</Button>
        <Button onClick={reset}>Reset</Button>
      </Space>
      <Form form={form} component={false}>
        <Table<IAdminFunctionWithKey>
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={filteredData && filteredData.length ? filteredData : gridData}
          columns={mergedColumns}
          loading={isLoading}
          onChange={handleChangeColumnTable}
        />
      </Form>
    </div>
  );
}

export default DataTable;


